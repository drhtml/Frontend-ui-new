import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { isFileImage } from 'src/app/utils/file';
import { getFileNameWithoutExtension } from 'src/app/utils/string';
import { AutoUnsubscribeComponent } from '../auto-unsubscribe/auto-unsubscribe.component';

@Component({
  selector: 'app-drag-and-drop-field',
  templateUrl: './drag-and-drop-field.component.html',
  styleUrls: ['./drag-and-drop-field.component.scss'],
})
export class DragAndDropFieldComponent
  extends AutoUnsubscribeComponent
  implements OnInit, OnChanges
{
  @Input() formControl: FormControl = new FormControl();
  @Input() isPhoto = true;
  selectedFiles: {
    file: File;
    url: string;
    name: string;
    nameWithExtension: string;
  }[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.handleFileFieldChange();
  }

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('formControl') && this.formControl) {
      this.handleFileFieldChange();
    }
  }

  handleFileFieldChange() {
    this.selectedFiles = this.formControl.value || [];
    this.addSubscriptions(
      this.formControl.valueChanges.subscribe((value) => {
        this.selectedFiles = value || [];
      }),
      'formControl.valueChanges'
    );
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.formControl.setValue(this.selectedFiles);
  }

  onSelectFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      let file = files.item(i);
      if (file && this.isPhoto && !isFileImage(file)) {
        file = null;
      }

      if (
        file &&
        !_.find(this.selectedFiles, (item) => {
          return item.nameWithExtension === file?.name || '';
        })
      ) {
        const reader = new FileReader();
        const selectedFiles = this.selectedFiles;
        const formControl = this.formControl;
        reader.onload = function (e) {
          if (file) {
            selectedFiles.push({
              url: e.target?.result as string,
              file,
              name: getFileNameWithoutExtension(file.name),
              nameWithExtension: file.name,
            });
            formControl.setValue(selectedFiles);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
}

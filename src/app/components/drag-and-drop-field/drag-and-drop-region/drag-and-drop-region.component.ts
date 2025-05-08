import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-drag-and-drop-region',
  templateUrl: './drag-and-drop-region.component.html',
  styleUrls: ['./drag-and-drop-region.component.scss'],
})
export class DragAndDropRegionComponent implements OnInit {
  @Output() onSelectFiles = new EventEmitter<FileList>();
  @Output() removeFile = new EventEmitter<number>();
  @Input() isPhoto = true;
  @Input() selectedFiles: {
    file: File;
    url: string;
  }[] = [];

  @HostBinding('style.background-color') private background = '#fafafa';
  // Dragover Event
  @HostListener('dragover', ['$event']) dragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#e2eefd';
  }
  // Dragleave Event
  @HostListener('dragleave', ['$event']) public dragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#fafafa';
  }
  // Drop Event
  @HostListener('drop', ['$event']) public drop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#fafafa';
    const files = event.dataTransfer.files;
    this.onSelectFiles.emit(files);
  }
  @ViewChild('file')
  myInputVariable?: ElementRef;

  get fileAccept(): string {
    if (this.isPhoto) {
      return 'image/*';
    }

    return '*';
  }

  constructor() {}

  ngOnInit(): void {}

  handleFileInput(files: any) {
    this.onSelectFiles.emit(files.files);

    if (this.myInputVariable) {
      this.myInputVariable.nativeElement.value = '';
    }
  }
}

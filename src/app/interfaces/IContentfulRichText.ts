import { IContentfulImage } from './IContentfulImage';

export interface IContentfulRichTextItemContent {
  nodeType: 'text' | 'list-item';
  value: string;
  content?: IContentfulRichTextItem[];
}

export interface IContentfulRichTextItem {
  nodeType:
    | 'heading-3'
    | 'heading-4'
    | 'heading-5'
    | 'paragraph'
    | 'unordered-list'
    | 'embedded-asset-block';
  content: IContentfulRichTextItemContent[];
  data?: {
    target: IContentfulImage;
  };
}

export interface IContentfulRichText {
  nodeType: 'document';
  content: IContentfulRichTextItem[];
}

export interface IResponsePhoto {
  _id: string;
  url: string;
  fileName: string;
}

export const emptyIResponsePhoto: IResponsePhoto = {
  _id: '',
  url: '',
  fileName: '',
}

export interface IResponsePhotoSuccess {
  success: boolean;
  data: IResponsePhoto[];
}

export const initialState = {
  upLoadImagesLoading: false, // 이미지 추가
  upLoadImagesDone: false,
  upLoadImagesError: null,
};

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export default function product(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_IMAGES_REQUEST:
      return {
        ...state,
        upLoadImagesLoading: true,
        upLoadImagesDone: false,
        upLoadImagesError: null,
      };
    case UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        upLoadImagesLoading: false,
        upLoadImagesDone: true,
        ...action.data,
      };
    case UPLOAD_IMAGES_FAILURE:
      return {
        ...state,
        upLoadImagesLoading: false,
        upLoadImagesError: action.error,
      };
    default:
      return state;
  }
}

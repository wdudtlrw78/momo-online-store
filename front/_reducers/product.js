export const initialState = {
  upLoadImagesLoading: false, // 이미지 추가
  upLoadImagesDone: false,
  upLoadImagesError: null,

  storageProductInfoLoading: false, // 상품 정보 저장
  storageProductInfoDone: false,
  storageProductInfoError: null,
};

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const STORAGE_PRODUCT_INFO_REQUEST = 'STORAGE_PRODUCT_INFO_REQUEST';
export const STORAGE_PRODUCT_INFO_SUCCESS = 'STORAGE_PRODUCT_INFO_SUCCESS';
export const STORAGE_PRODUCT_INFO_FAILURE = 'STORAGE_PRODUCT_INFO_FAILURE';

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
    case STORAGE_PRODUCT_INFO_REQUEST:
      return {
        ...state,
        storageProductInfoLoading: true,
        storageProductInfoDone: false,
        storageProductInfoError: null,
      };
    case STORAGE_PRODUCT_INFO_SUCCESS:
      return {
        ...state,
        storageProductInfoLoading: false,
        storageProductInfoDone: true,
        ...action.data,
      };
    default:
      return state;
  }
}

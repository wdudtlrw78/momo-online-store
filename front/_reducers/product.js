// export const initialState = {
//   upLoadImagesLoading: false, // 이미지 추가
//   upLoadImagesDone: false,
//   upLoadImagesError: null,

//   storageProductLoading: false, // 상품 정보 저장
//   storageProductDone: false,
//   storageProductError: null,

//   // getProductsLoading: false, // 상품 정보들 가져오기
//   // getProductsDone: false,
//   // getProductsError: null,
// };

// export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
// export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
// export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

// export const STORAGE_PRODUCT_REQUEST = 'STORAGE_PRODUCT_REQUEST';
// export const STORAGE_PRODUCT_SUCCESS = 'STORAGE_PRODUCT_SUCCESS';
// export const STORAGE_PRODUCT_FAILURE = 'STORAGE_PRODUCT_FAILURE';

// // export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
// // export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
// // export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';

// // export const getProducts = (data) => ({
// //   type: GET_PRODUCTS_REQUEST,
// //   data,
// // });

// export default function product(state = initialState, action) {
//   switch (action.type) {
//     case UPLOAD_IMAGES_REQUEST:
//       return {
//         ...state,
//         upLoadImagesLoading: true,
//         upLoadImagesDone: false,
//         upLoadImagesError: null,
//       };
//     case UPLOAD_IMAGES_SUCCESS:
//       return {
//         ...state,
//         upLoadImagesLoading: false,
//         upLoadImagesDone: true,
//         ...action.data,
//       };
//     case UPLOAD_IMAGES_FAILURE:
//       return {
//         ...state,
//         upLoadImagesLoading: false,
//         upLoadImagesError: action.error,
//       };
//     case STORAGE_PRODUCT_REQUEST:
//       return {
//         ...state,
//         storageProductLoading: true,
//         storageProductDone: false,
//         storageProductError: null,
//       };
//     case STORAGE_PRODUCT_SUCCESS:
//       return {
//         ...state,
//         storageProductLoading: false,
//         storageProductDone: true,
//         ...action.data,
//       };
//     case STORAGE_PRODUCT_FAILURE:
//       return {
//         ...state,
//         storageProductLoading: false,
//         storageProductError: action.error,
//       };
//     // case GET_PRODUCTS_REQUEST:
//     //   return {
//     //     ...state,
//     //     getProductsLoading: true,
//     //     getProductsDone: false,
//     //     getProductsError: null,
//     //   };
//     // case GET_PRODUCTS_SUCCESS:
//     //   return {
//     //     ...state,
//     //     getProductsLoading: false,
//     //     getProductsDone: true,
//     //     ...action.data,
//     //   };
//     // case GET_PRODUCTS_FAILURE:
//     //   return {
//     //     ...state,
//     //     getProductsLoading: false,
//     //     getProductsError: action.error,
//     //   };

//     default:
//       return state;
//   }
// }

export const initialState = {
  authLoading: false, // 인증
  authDone: false,
  authError: null,

  registerLoading: false, // 회원가입
  registerDone: false,
  registerError: null,

  logInLoading: false, // 로그인
  logInDone: false,
  logInError: null,

  logOutLoading: false, // 로그아웃
  logOutDone: false,
  logOutError: null,

  addToCartLoading: false, // 카트
  addToCartDone: false,
  addToCartError: null,

  successBuyLoading: false, // 결제
  successBuyDone: false,
  successBuyError: null,

  userData: null,
};

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';

export const SUCCESS_BUY_REQUEST = 'SUCCESS_BUY_REQUEST';
export const SUCCESS_BUY_SUCCESS = 'SUCCESS_BUY_SUCCESS';
export const SUCCESS_BUY_FAILURE = 'SUCCESS_BUY_FAILURE';

// action creator
export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logOutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

export default function user(state = initialState, action) {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        authLoading: true,
        authDone: false,
        authError: null,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        authLoading: false,
        authDone: true,
        logOutDone: false,
        userData: action.data,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        loadUserLoading: false,
        loadUserError: action.error,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        registerLoading: true,
        registerDone: false,
        registerError: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerLoading: false,
        registerDone: true,
        register: action.data,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registerLoading: false,
        registerError: action.error,
      };
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
        logInDone: false,
        logInError: null,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        ...action.data,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        logOutError: action.error,
        logInDone: false,
        userData: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        addToCartLoading: true,
        addToCartDone: false,
        addToCartError: null,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        addToCartLoading: false,
        addToCartDone: true,
        userData: {
          ...state.userData,
          cart: action.data,
        },
      };
    case ADD_TO_CART_FAILURE:
      return {
        ...state,
        addToCartLoading: false,
        addToCartError: action.error,
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.data,
        },
      };
    case SUCCESS_BUY_REQUEST:
      return {
        ...state,
        successBuyLoading: true,
        successBuyDone: false,
        successBuyError: null,
      };
    case SUCCESS_BUY_SUCCESS:
      return {
        ...state,
        successBuyLoading: false,
        successBuyDone: true,

        userData: {
          ...state.userData,
          cart: action.data.cart,
          history: {
            ...state.history,
            ...action.data.history,
          },
        },
      };
    case SUCCESS_BUY_FAILURE:
      return {
        ...state,
        successBuyLoading: false,
        successBuyError: action.error,
      };
    default:
      return state;
  }
}

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
        loginSucces: action.data,
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
        loginSucces: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    default:
      return state;
  }
}

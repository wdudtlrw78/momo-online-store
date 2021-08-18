export const initialState = {
  registerLoading: false, // 회원가입
  registerDone: false,
  registerError: null,

  logInLoading: false, // 로그인
  logInDone: false,
  logInError: null,

  userInfo: null,
};

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

// action creator
export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export default function user(state = initialState, action) {
  switch (action.type) {
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
        userInfo: action.data,
        logInDone: true,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    default:
      return state;
  }
}

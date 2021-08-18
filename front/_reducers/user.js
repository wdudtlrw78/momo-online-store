export const initialState = {
  registerLoading: false,
  registerDone: false,
  registerError: null,

  userInfo: null,
};

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

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
    default:
      return state;
  }
}

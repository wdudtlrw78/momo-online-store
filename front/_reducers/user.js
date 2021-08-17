export const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,

  logOutLoading: false,
  logOutDone: false,
  logOutError: null,

  userInfo: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

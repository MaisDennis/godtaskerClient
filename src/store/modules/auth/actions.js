export function signInRequest( phonenumber, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { phonenumber, password },
  };
}
export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {token, user },
  };
};
export function signFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  }
}
export function signUpRequest(name, email, password, phonenumber, gender) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, password, phonenumber, gender },
  }
}
export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  }
}

import { takeLatest, call, put, all} from 'redux-saga/effects';
import { toast } from 'react-toastify';
// -----------------------------------------------------------------------------
import history from '~/services/history';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

// -----------------------------------------------------------------------------
export function* signIn({ payload }) {
  try {
    const { phonenumber, password } = payload;


    const response = yield call(api.post, 'sessions', {
      phonenumber,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    history.push('/dashboard');

  } catch (err) {
    yield put(signFailure());
    toast.error('Falha na autenticação, verifique seus dados');
  }
}
// -----------------------------------------------------------------------------
export function setToken({payload }) {
  if(!payload) return;
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}
// -----------------------------------------------------------------------------
export function* signUp({ payload }) {
  try {
    const {
      first_name, last_name, user_name,
      password, phonenumber, email,
      birth_date, gender, instagram, linkedin,
    } = payload;

    console.log(payload)

    yield call(api.post, 'users', {
      first_name, last_name, user_name,
      password, phonenumber, email,
      birth_date, gender,
      instagram, linkedin, subscriber: false
    })

    toast.success('Usuário cadastrado com sucesso!');

    yield call(api.post, 'workers', {
      first_name, last_name,
      worker_name: user_name,
      worker_password: password,
      phonenumber, email, birth_date, gender,
      instagram, linkedin,
      subscriber: false
    })

    toast.success('Funcionário cadastrado com sucesso!');
    history.push('/login');

  } catch (error) {
    toast.error(error.response.data.error);
  }
}
// -----------------------------------------------------------------------------
export function signOnOut() {
  history.push('/');
}
// -----------------------------------------------------------------------------
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOnOut),
]);

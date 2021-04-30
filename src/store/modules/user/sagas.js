import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import history from '~/services/history';
import { updateProfileSuccess } from './actions';
// -----------------------------------------------------------------------------
export function* updateProfile({ payload }) {
  try {
    const {
      first_name, last_name, user_name,
      oldPassword, password, confirmPassword,
      phonenumber, email, birth_date, gender, image
    } = payload;

    let response = null;
    let responseWorker= null;

    if (!image) {
      response = yield call(api.put, 'users/no-photo', {
        first_name,
        last_name,
        user_name,
        oldPassword,
        password,
        confirmPassword,
        phonenumber,
        email,
        birth_date,
        gender,
        // avatar_id
      });
      responseWorker = yield call(api.put, 'workers/no-photo', {
        first_name,
        last_name,
        worker_name: user_name,
        oldPassword,
        password,
        confirmPassword,
        phonenumber,
        email,
        birth_date,
        gender,
        // avatar_id
      });

    } else {
      console.log('Heya!')
      const imageResponse = yield call(api.get, 'files', {
        params: { image },
      })
      const avatar_id = imageResponse.data[0].id

      response = yield call(api.put, 'users', {
        first_name,
        last_name,
        user_name,
        oldPassword,
        password,
        confirmPassword,
        phonenumber,
        email,
        birth_date,
        gender,
        avatar_id
      });

      responseWorker = yield call(api.put, 'workers', {
        first_name,
        last_name,
        worker_name: user_name,
        phonenumber,
        birth_date,
        gender,
        avatar_id,
      });
    }
    toast.success('Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
    history.push('/');

  } catch (error) {
    toast.error(error.response.data.error);
    toast.error(error.responseWorker.data.error);
    // yield put(updateProfileFailure());
  }
}
// -----------------------------------------------------------------------------
export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)
]);

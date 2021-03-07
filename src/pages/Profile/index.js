import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
// import * as Yup from 'yup';
// -----------------------------------------------------------------------------
import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';
import AvatarInput from './AvatarInput';
import { signOutUser } from '~/store/modules/user/actions';
import { signOutPhonenumber } from '~/store/modules/phonenumber/actions';
import { signOut } from '~/store/modules/auth/actions';
// -----------------------------------------------------------------------------
export default function UpdateProfile() {
  const profile = useSelector(state => state.user.profile);
  const image = useSelector(state => state.image.image);
  const dispatch = useDispatch();
  const genderOptions = [ 'feminino', 'masculino', 'alien', 'outro']

  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [userName, setUserName] = useState(profile.user_name);
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [email, setEmail] = useState(profile.email);
  const [birthDate, setBirthDate] = useState(profile.birth_date);
  const [gender, setGender] = useState(profile.gender);

  async function handleSignOut() {
    await dispatch(signOutUser(null))
    await dispatch(signOutPhonenumber(null, false))
    await dispatch(signOut());
  }

  const { register, handleSubmit } = useForm();

  const onSubmit = ({
    first_name, last_name, user_name,
    oldPassword, password, confirmPassword,
    email, birth_date, gender, preview
  }) => {
    const phonenumber = profile.phonenumber

    dispatch(updateProfileRequest({
      first_name, last_name, user_name,
      oldPassword, password, confirmPassword,
      phonenumber, email, birth_date, gender, image, preview
    }));
  }
  // ---------------------------------------------------------------------------
  return (

    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AvatarInput name="avatarInput"/>
        <input name="first_name" placeholder="Nome" ref={register} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        <input name="last_name" placeholder="Sobrenome" ref={register} value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        <input name="user_name" placeholder="Nome de usuário" ref={register} value={userName} onChange={(e) => setUserName(e.target.value)}/>
        <input name="birth_date" placeholder="Data de nascimento" ref={register} value={birthDate} onChange={(e) => setBirthDate(e.target.value)}/>
        <select name="gender" placeholder="Gênero" ref={register} value={gender} onChange={(e) => setGender(e.target.value)}>
          {genderOptions.map(g =>
            <option key={g} value={g}>{g}</option>
          )}
        </select>
        <input name="email" placeholder="e-mail" ref={register} value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input
          name="oldPassword"
          type="password"
          placeholder="Senha atual"
          ref={register}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input name="password" type="password" placeholder="Sua senha nova" ref={register} value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input name="confirmPassword" type="password" placeholder="Confirmar a senha nova" ref={register} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>


        <button type="submit">Salvar</button>
        <button className="exit-button" type="button" onClick={handleSignOut}>Sair do godtasker</button>
      </form>
    </Container>
  );
}

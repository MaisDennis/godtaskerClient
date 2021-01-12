import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Form, Input } from '@rocketseat/unform';
import { useForm } from 'react-hook-form';
// import InputMask from 'react-input-mask';
// import { Select } from '@rocketseat/unform';
// import * as Yup from 'yup';
// -----------------------------------------------------------------------------
import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';
import AvatarInput from './AvatarInput';
import { signOut } from '~/store/modules/auth/actions';
// -----------------------------------------------------------------------------
export default function UpdateProfile() {
  const profile = useSelector(state => state.user.profile);
  const image = useSelector(state => state.image.image);
  const dispatch = useDispatch();
  const genderOptions = [ 'feminino', 'masculino', 'alien', 'outro']

  function handleSignOut() {
    dispatch(signOut());
  }

  const { register, handleSubmit } = useForm();

  const onSubmit = ({ first_name, last_name, user_name, oldPassword, password, confirmPassword, birth_date, gender, preview }) => {
    const phonenumber = profile.phonenumber
    // console.log(image)

    dispatch(updateProfileRequest({
      first_name,
      last_name,
      user_name,
      oldPassword,
      password,
      confirmPassword,
      phonenumber,
      birth_date,
      gender,
      image,
      preview
    }));
  }
  // ---------------------------------------------------------------------------
  return (

    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AvatarInput name="avatarInput" />
        <input name= "first_name" placeholder="Primeiro Nome" ref={register} value="one more time"/>
        <input name= "last_name" placeholder="Sobrenome" ref={register} value="123"/>
        <input name= "user_name" placeholder="Nome de usuário" ref={register} value="123"/>
        <input name="birth_date" placeholder="Data de nascimento" ref={register} value="123"/>
        <select name="gender" placeholder="Gênero" ref={register}>
          {genderOptions.map(g =>
            <option key={g} value={g}>{g}</option>
          )}
        </select>
        <input
          name="oldPassword"
          placeholder="Senha atual"
          ref={register}
          value="123456"
        />
        <input name="password" type="password" placeholder="Sua senha nova" ref={register} value="123123"/>
        <input name="confirmPassword" type="password" placeholder="Confirmar a senha nova" ref={register} value="123123"/>


        <button type="submit">Salvar</button>
        <button type="button" onClick={handleSignOut}>Sair do godtasker</button>
      </form>
    </Container>

    // <Container>
    //    <Form initialData={profile} onSubmit={handleSubmit}>

    //     <br></br>
    //     <Input name="name" placeholder="Nome completo" />
    //     <Input name="email" placeholder="Seu email" />
    //     <InputMask name ="phoneNumberMask" type="text" mask="(99)99999-9999" placeholder="Seu número de Whatsapp" maskChar="_"
    //       onChange={e => {
    //         setMasked(e.target.value);
    //       }}
    //     />
    //     <Select name="gender" options={genderOptions} placeholder="Gênero"/>
    //     <hr />
    //     <Input type="password" name="oldPassword" placeholder="Sua senha atual" />
    //     <Input type="password" name="password" placeholder="Nova senha" />
    //     <Input type="password" name="confirmPassword" placeholder="Confirmação de senha" />
    //     <button type="submit">Atualizar perfil</button>
    //   </Form>
    //   <button type="button" onClick={handleSignOut}>Sair do godtasker</button>
    // </Container>
  );
}

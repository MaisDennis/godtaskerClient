import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';
import { Select } from '@rocketseat/unform';
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
  const [ masked, setMasked ] = useState(' ');
  const gender = [ {"id": "masculino" }, {"id": "feminino" }, {"id": "alien"}];
  const genderOptions = gender.map(g => ({ id: g.id, title: g.id }))

  function handleSubmit({name, email, gender, preview, password }) {
    const phonenumber = masked.replace(/\D/gim, '');
    const data = {name, email, phonenumber, gender, image, preview, password }

    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }
  // ---------------------------------------------------------------------------
  return (
    <Container>
       <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatarInput" />
        <br></br>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" placeholder="Seu email" />
        <InputMask name ="phoneNumberMask" type="text" mask="(99)99999-9999" placeholder="Seu número de Whatsapp" maskChar="_"
          onChange={e => {
            setMasked(e.target.value);
          }}
        />
        <Select name="gender" options={genderOptions} placeholder="Gênero"/>
        <hr />
        <Input type="password" name="oldPassword" placeholder="Sua senha atual" />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input type="password" name="confirmPassword" placeholder="Confirmação de senha" />
        <button type="submit">Atualizar perfil</button>
      </Form>
      <button type="button" onClick={handleSignOut}>Sair do godtasker</button>
    </Container>
  );
}

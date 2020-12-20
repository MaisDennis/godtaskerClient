import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { Form, Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
import { Select } from '@rocketseat/unform';
// -----------------------------------------------------------------------------
import logo from '~/assets/detective/detective.svg';
import godtaskerFont from '~/assets/godtaskerFont/godtaskerFontPlainGrey.png';
import { signUpRequest } from '~/store/modules/auth/actions';
// -----------------------------------------------------------------------------
export default function SignUp() {
  const dispatch = useDispatch();
  const [ masked, setMasked ] = useState(' ');
  const gender = [ {"id": "masculino" }, {"id": "feminino" }, {"id": "alien"}];
  const genderOptions = gender.map(g => ({ id: g.id, title: g.id }))

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
    gender: Yup.string().required('Escolha o gênero'),
    password: Yup.string().min(6,'No mínimo 6 caracteres.').required('A senha é obrigatorória'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'A senha confirmada não é igual')
  });

  function handleSubmit({name, email, password, gender }) {
    const phonenumber = masked.replace(/\D/gim, '');
    dispatch(signUpRequest(name, email, password, phonenumber, gender ));
  }
  // ---------------------------------------------------------------------------
  return (
  <>
    <img className="logo" src={logo} alt="detective"/>
    <img className="godtasker" src={godtaskerFont} alt="godtaskerFont"/>

    <Form schema={schema} onSubmit={handleSubmit}>
      <Input name= "name" placeholder="Nome completo" />
      <Input name= "email" type="email" placeholder="Seu e-mail" />
      <InputMask name ="phoneNumberMask" type="text" mask="(99)99999-9999" placeholder="Seu número de Whatsapp" maskChar="_"
        onChange={e => {
          setMasked(e.target.value);
        }}
      />
      {/* <select name="gender">
        {gender.map(g =>
          <option key={g} value={g}>{g}</option>
        )}
      </select> */}
      <Select name="gender" options={genderOptions} placeholder="Gênero"/>
      <Input name="password" type="password" placeholder="Sua senha secreta" />
      <Input name="confirmPassword" type="password" placeholder="Confirmar a senha" />
      <button type="submit">Criar conta</button>
      <Link to="/">Já tenho login</ Link>
    </Form>
  </>
  );
}

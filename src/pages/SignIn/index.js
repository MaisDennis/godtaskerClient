import React, { useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
// import { Form, Input} from '@rocketseat/unform';
// -----------------------------------------------------------------------------
import logo from '~/assets/detective/detective.svg';
import godtaskerFont from '~/assets/godtaskerFont/godtaskerFontPlainGrey.png';
import { signInRequest } from '~/store/modules/auth/actions';
// -----------------------------------------------------------------------------
export default function SignIn() {
  const schema = Yup.object().shape({
    phonenumber: Yup.string()
    .required()
    .min(11),
    password: Yup.string().min(6,'No mínimo 6 caracteres.').required('A senha é obrigatorória'),
  });

  const [ masked, setMasked ] = useState(' ');
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const { register, handleSubmit } = useForm();

  const onSubmit = ({ password }) => {
    const phonenumber = masked.replace(/\D/gim, '');
    dispatch(signInRequest(phonenumber, password));
  }

  // -----------------------------------------------------------------------------
  return (
  <>
    <img className="logo" src={logo} alt="detective"/>
    <img className="godtasker" src={godtaskerFont} alt="godtaskerFont"/>
    <p>Delegue tarefas como um poderoso.</p>
    <form schema={schema} onSubmit={handleSubmit(onSubmit)}>
      <InputMask
        name ="phoneNumberMask"
        type="text"
        mask="(99) 99999-9999"
        placeholder="(99) 91234-1234"
        maskChar="_"
        onChange={e => {setMasked(e.target.value);}}
      />
      <input
        name="password"
        type="password"
        placeholder="Sua senha secreta"
        ref={register}/>
      <button type="submit">{ loading ? 'Carregando...' : 'Acessar'}</button>
      <Link to="/register"> Criar conta gratuita</ Link>
    </form>
  </>
  );
}

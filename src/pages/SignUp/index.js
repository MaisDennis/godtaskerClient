import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
// -----------------------------------------------------------------------------
import logo from '~/assets/detective/detective.svg';
import godtaskerFont from '~/assets/godtaskerFont/godtaskerFontPlainGrey.png';
import { signUpRequest } from '~/store/modules/auth/actions';
// -----------------------------------------------------------------------------
export default function SignUp({ match }) {
  const dispatch = useDispatch();
  const phonenumber = useSelector(state => state.phonenumber.profile.phonenumber);
  const [ masked, setMasked ] = useState(' ');
  const genderOptions = [ 'feminino', 'masculino', 'alien', 'outro']

  const schema = Yup.object().shape({
    first_name: Yup.string().required('O nome é obrigatório'),
    last_name: Yup.string().required('O sobrenome é obrigatório'),
    user_name: Yup.string().required('O nome de usuário é obrigatório'),
    password: Yup.string().min(6,'No mínimo 6 caracteres.').required('A senha é obrigatorória'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'A senha confirmada não é igual'),
    email: Yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
    birth_date: Yup.string(),
    gender: Yup.string().required('Escolha o gênero'),

  });
  const { register, handleSubmit } = useForm();

  const onSubmit = ({
    first_name, last_name, user_name, password, email, birth_date, gender
  }) => {
    // const phonenumber = masked.replace(/\D/gim, '');
    dispatch(signUpRequest(
      first_name, last_name, user_name, password, phonenumber, email, birth_date, gender
    ));
  }
  // ---------------------------------------------------------------------------
  return (
  <>
    <div className="logo-div">
      <img className="logo-sign-up" src={logo} alt="detective"/>
      <img className="godtasker-sign-up" src={godtaskerFont} alt="godtaskerFont"/>
    </div>
    <form schema={schema} onSubmit={handleSubmit(onSubmit)}>
      <input name= "first_name" placeholder="Primeiro Nome" ref={register}/>
      <input name= "last_name" placeholder="Sobrenome" ref={register}/>
      <input name= "user_name" placeholder="Nome de usuário" ref={register}/>
      {/* <InputMask
        name ="phoneNumberMask"
        type="text"
        mask="(99) 99999-9999"
        placeholder="(99) 91234-1234"
        maskChar="_"
        onChange={e => {setMasked(e.target.value);}}
      /> */}
      <input name= "email" type="email" placeholder="Seu e-mail" ref={register}/>
      <input name="birth_date" placeholder="Data de nascimento" ref={register}/>
      <select name="gender" placeholder="Gênero" ref={register}>
        {genderOptions.map(g =>
          <option key={g} value={g}>{g}</option>
        )}
      </select>
      <input name="password" type="password" placeholder="Sua senha secreta" ref={register}/>
      <input name="confirmPassword" type="password" placeholder="Confirmar a senha" />
      <button type="submit">Criar conta</button>
      <Link to="/">Já tenho login</ Link>
    </form>
  </>
  );
}

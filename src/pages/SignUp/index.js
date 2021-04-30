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
import phonenumber from '../../store/modules/phonenumber/reducer';
// -----------------------------------------------------------------------------
export default function SignUp({ match }) {
  const dispatch = useDispatch();
  // const phonenumber = useSelector(state => state.phonenumber.profile.phonenumber);
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
    instagram: Yup.string(),
    linkedin: Yup.string(),

  });
  const { register, handleSubmit } = useForm();

  const onSubmit = ({
    first_name, last_name, user_name, password,
    email, birth_date, gender, instagram, linkedin,
  }) => {
    const countryCode = '+'+'55'
    const phonenumber = countryCode+masked.replace(/\D/gim, '');
    console.log(phonenumber)
    dispatch(signUpRequest(
      first_name, last_name, user_name, password,
      phonenumber, email, birth_date, gender, instagram, linkedin,
    ));
  }
  // ---------------------------------------------------------------------------
  return (
    <div className="sign-in-wrapper">
      <div className="sign-up-div">
        <div className="logo-div">
          {/* <img className="logo-sign-up" src={logo} alt="detective"/> */}
          <img className="godtasker-sign-up" src={godtaskerFont} alt="godtaskerFont"/>
        </div>
        <form schema={schema} onSubmit={handleSubmit(onSubmit)}>
          <div className="line-div">
            <input name= "first_name" placeholder="Primeiro Nome" ref={register}/>
            <input name= "last_name" placeholder="Sobrenome" ref={register}/>
          </div>
          <div className="line-div">
            <input name= "user_name" placeholder="Nome de usuário" ref={register}/>
          </div>
          <div className="line-div">
            <InputMask
              name ="phoneNumberMask"
              type="text"
              mask="(99) 99999-9999"
              placeholder="(99) 91234-1234"
              maskChar="_"
              onChange={e => {setMasked(e.target.value);}}
            />
          </div>

          <div className="line-div">
            <input name= "email" type="email" placeholder="Seu e-mail" ref={register}/>
          </div>
          <div className="line-div">
            <input name="birth_date" placeholder="Data de nascimento" ref={register}/>
            <select name="gender" placeholder="Gênero" ref={register}>
              {genderOptions.map(g =>
                <option key={g} value={g}>{g}</option>
              )}
            </select>
          </div>
          <div className="line-div">
            <input name="instagram" placeholder="Instagram (opcional)" ref={register}/>
            <input name="linkedin" placeholder="LinkedIn (opcional)" ref={register}/>
          </div>
          <div className="line-div">
            <input name="password" type="password" placeholder="Sua senha secreta" ref={register}/>
          </div>
          <div className="line-div">
            <input name="confirmPassword" type="password" placeholder="Confirmar a senha" />
          </div>
          <div className="line-div">
            <button
              className="sign-up-button"
              type="submit"
            >
              Criar conta
            </button>
          </div>
          <Link to="/login" style={{color: '#4433ee'}}>Voltar</ Link>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
// import { auth } from '~/services/firebase'
import firebase from '../../services/firebase'

// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
// -----------------------------------------------------------------------------
import logo from '~/assets/detective/detective.svg';
import godtaskerFont from '~/assets/godtaskerFont/godtaskerFontPlainGrey.png';
import { signInRequest } from '~/store/modules/auth/actions';
import { signInPhonenumber } from '~/store/modules/phonenumber/actions';

import { StyledPhoneInput } from '../_layouts/auth/styles';
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

  const [value, setValue] = useState()
  const [phoneNumber, setPhoneNumber] = useState()

  const { register, handleSubmit } = useForm();

  const onSubmit = ({ password }) => {
    // const phonenumber = masked.replace(/\D/gim, '');
    // dispatch(signInRequest(phoneNumber, password));
  }
  console.log(phoneNumber)
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  // const [code, setCode] = useState('');


  const setupRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // this.onSignInSubmit();
          console.log('captcha OK')
          setConfirm(true)
        }
    });
  }

  const onSignInSubmit = (e) => {
    e.preventDefault()
    setupRecaptcha();
    const parsedPhonenumber = '01912341234';
    // const parsedPhonenumber = JSON.stringify('+'+phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(parsedPhonenumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // const code = getCodeFromUserInput();
      var code = window.prompt("Enter OTP")
      confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user)
        setConfirm(true)
      }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      });
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });
  }



  // -----------------------------------------------------------------------------
  return (
  <div className="sign-in-div">
    <img className="logo" src={logo} alt="detective"/>
    <img className="godtasker" src={godtaskerFont} alt="godtaskerFont"/>
    <p>Delegue tarefas como um poderoso.</p>
    <div id="recaptcha-container"></div>

    <form schema={schema}
    // onSubmit={handleSubmit(onSubmit)}
    >
      { !confirm
        ? (
          <>
            {/* <PhoneInput
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={setPhoneNumber}/>
            /> */}
            <PhoneInput
              country="br"
              placeholder="+999..."
              inputStyle={{
                border: 0,
                borderRadius: '4px',
                height: '44px',
                width: '100%',
                color: '#fff',
                backgroundColor: 'rgba(0,0,0,0.3)',
              }}
              buttonStyle={{
                backgroundColor: 'rgba(0,0,0,0.1)',
              }}
              dropdownStyle={{
                height: '160px',
                width: '320px',
                textAlign: 'left',
                textDecoration: 'none',
                color: '#111',
              }}
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
            {/* <InputMask
              name ="phoneNumberMask"
              type="text"
              mask="(9999) 99999-9999"
              placeholder="(9999) 91234-1234"
              maskChar="_"
              onChange={e => {setMasked(e.target.value);}}
            /> */}
            <button onClick={onSignInSubmit}>Entrar</button>
          </>
        )
        : (
          <>
          {/* <input
            name="code"
            placeholder="code"
            onChange={e => setCode(e.target.value)}
            ></input> */}

          <input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
          ref={register}/>
        <button type="submit">{ loading ? 'Carregando...' : 'Acessar'}</button>
        <Link to="/register" data={phoneNumber}> Criar conta gratuita</ Link>
        </>
        )
      }
    </form>
  </div>
  );
}

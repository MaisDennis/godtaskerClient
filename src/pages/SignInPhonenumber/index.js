import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
// import { auth } from '~/services/firebase'
import firebase from '../../services/firebase'
// import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { toast } from 'react-toastify';
// -----------------------------------------------------------------------------
import logo from '~/assets/detective/detective.svg';
import godtaskerFont from '~/assets/godtaskerFont/godtaskerFontPlainGrey.png';
import { signInRequest } from '~/store/modules/auth/actions';
import { signInPhonenumber } from '~/store/modules/phonenumber/actions';
// -----------------------------------------------------------------------------
export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const currentConfirm = useSelector(state => state.phonenumber.profile.confirm);
  const currentPhonenumber = useSelector(state => state.phonenumber.profile.phonenumber);

const [ masked, setMasked ] = useState(' ');
  // const [value, setValue] = useState()
  const [otpPhoneNumber, setOtpPhoneNumber] = useState()
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    setConfirm(currentConfirm)
  }, [currentConfirm])

  const schema = Yup.object().shape({
    phonenumber: Yup.string()
    .required()
    .min(11),
    password: Yup.string().min(6,'No mínimo 6 caracteres.').required('A senha é obrigatorória'),
  });

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          console.log('captcha OK')
        }
    });
  }

  const onSignInSubmit = (e) => {
    e.preventDefault()
    const countryCode = '+'+'55'
    const phonenumber = countryCode+masked.replace(/\D/gim, '');
    setOtpPhoneNumber(phonenumber)
    // console.log(phonenumber)
    setupRecaptcha();
    // const phonenumber = '+5511983495853';
    // const phonenumber = '+'+phoneNumber;

    const appVerifier = window.recaptchaVerifier;
    // console.log(appVerifier)
    firebase.auth().signInWithPhoneNumber(phonenumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // const code = getCodeFromUserInput();
        var code = window.prompt("Insira o código:")
        confirmationResult.confirm(code).then((result) => {
          // User signed in successfully.
          // const user = result.user;
          setConfirm(true)
          dispatch(signInPhonenumber(phonenumber, true))
        }).catch(() => {
          console.log('bad verification code')
          toast.error('Código inválido');

        // User couldn't sign in (bad verification code?)
        // ...
        });
      }).catch(() => {
        // Error; SMS not sent
        console.log('SMS not sent')
        toast.error('SMS não enviado. Tente atualizar a página');
        // ...
      });
  }

  const { register, handleSubmit } = useForm();

  const onSubmit = ({ password }) => {
    // let testPhonenumber = '+5501912341234'
    const countryCode = '+'+'55'
    const loginPhonenumber = countryCode+masked.replace(/\D/gim, '');
    // console.log(loginPhonenumber)
    dispatch(signInRequest(loginPhonenumber, password));
    // dispatch(signInRequest(testPhonenumber, password));
  }
  // -----------------------------------------------------------------------------
  return (
    <div className="sign-in-wrapper">


      <div className="sign-in-div">
      <div className="logo-div">
          <img className="logo" src={logo} alt="detective"/>
          <img className="godtasker" src={godtaskerFont} alt="godtaskerFont"/>
        </div>
        {/* <p>Delegue tarefas como um poderoso.</p> */}
        <div id="recaptcha-container"></div>

        <form
          schema={schema}
          onSubmit={handleSubmit(onSubmit)}
        >
              { confirm
            ? (
              <>
                <p>Bem-vindo!</p>
                <InputMask
                  name ="phoneNumberMask"
                  type="text"
                  mask="(99) 99999-9999"
                  placeholder="(99) 91234-1234"
                  maskChar="_"
                  onChange={e => {setMasked(e.target.value);}}
                />
                <button
                  className="captcha-button"
                  onClick={onSignInSubmit}
                >
                  Entrar
                </button>
              </>
            )
            : (
              <>
                <p>Login</p>
                <InputMask
                  name ="signinPhoneNumberMask"
                  type="text"
                  mask="(99) 99999-9999"
                  placeholder="(99) 91234-1234"
                  maskChar="_"
                  onChange={e => {setMasked(e.target.value);}}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Sua senha"
                  ref={register}
                />
                <button
                  className="login-button"
                  type="submit"
                >
                  { loading ? 'Carregando...' : 'Acessar'}
                </button>
                <Link
                  to="/register"
                  data={otpPhoneNumber}
                  style={{color: '#4433ee'}}
                >
                  Criar conta gratuita
                </Link>
              </>
            )
          }
        </form>
      </div>
    </div>
  );
}

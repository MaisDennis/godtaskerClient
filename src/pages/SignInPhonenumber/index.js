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
// -----------------------------------------------------------------------------
import logo from '~/assets/detective/detective.svg';
import godtaskerFont from '~/assets/godtaskerFont/godtaskerFontPlainGrey.png';
import { signInRequest } from '~/store/modules/auth/actions';
import { signInPhonenumber } from '~/store/modules/phonenumber/actions';
// -----------------------------------------------------------------------------
export default function SignIn() {
  const schema = Yup.object().shape({
    phonenumber: Yup.string()
    .required()
    .min(11),
    password: Yup.string().min(6,'No mínimo 6 caracteres.').required('A senha é obrigatorória'),
  });

  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const currentConfirm = useSelector(state => state.phonenumber.profile.confirm);
  const currentPhonenumber = useSelector(state => state.phonenumber.profile.phonenumber);

const [ masked, setMasked ] = useState(' ');
  // const [value, setValue] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    setConfirm(currentConfirm)
  }, [currentConfirm])

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
    const phonenumber = countryCode+`${masked.replace(/\D/gim, '')}`;
    // console.log(phonenumber)
    setupRecaptcha();
    // const phonenumber = '+5511983495853';
    // const phonenumber = '+'+phoneNumber;

    const appVerifier = window.recaptchaVerifier;
    console.log(appVerifier)
    firebase.auth().signInWithPhoneNumber(phonenumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // const code = getCodeFromUserInput();
        var code = window.prompt("Enter OTP")
        confirmationResult.confirm(code).then((result) => {
          // User signed in successfully.
          const user = result.user;
          // console.log(user)
          setConfirm(true)
          dispatch(signInPhonenumber(phonenumber, true))
        }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        });
      }).catch((error) => {
        // Error; SMS not sent
        // ...
      });
  }

  const { register, handleSubmit } = useForm();

  const onSubmit = ({ password }) => {
    dispatch(signInRequest(currentPhonenumber, password));
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
              { !confirm
            ? (
              <>
                {/* <PhoneInput
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
                /> */}
                <p>Login</p>
                <InputMask
                  name ="phoneNumberMask"
                  type="text"
                  mask="(99) 99999-9999"
                  placeholder="(99) 91234-1234"
                  maskChar="_"
                  onChange={e => {setMasked(e.target.value);}}
                />
                <button onClick={onSignInSubmit}>Entrar</button>
              </>
            )
            : (
              <>
                <p>Senha</p>
                <input
                  name="password"
                  type="password"
                  placeholder="Sua senha secreta"
                  ref={register}
                />
                <button type="submit">
                  { loading ? 'Carregando...' : 'Acessar'}
                </button>
                <Link to="/register" data={phoneNumber}>
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

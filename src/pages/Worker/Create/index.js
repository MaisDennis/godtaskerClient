import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { RiSkipBackFill, RiCheckLine } from 'react-icons/ri';
// -----------------------------------------------------------------------------
import { Container } from '~/pages/_layouts/create/styles';
import api from '~/services/api';
import history from '~/services/history';
// -----------------------------------------------------------------------------
export default function CreateWorker() {
    const [masked, setMasked] = useState(' ');
  const user_id = useSelector(state => state.user.profile.id);

  async function handleSubmit({ first_name, last_name, worker_name, department }) {
    const countryCode = '+'+'55'
    const phonenumber = countryCode+`${masked.replace(/\D/gim, '')}`;
    console.log(phonenumber)
    const id = Math.floor(Math.random() * 1000000)

    try {
      await api.post(`users/${user_id}/contact-list`, {
        worker_id: id,
        first_name,
        last_name,
        worker_name,
        department,
        phonenumber,
      })
      toast.success('Funcionário cadastrado com sucesso!');
      // history.push('/contact-list/list');
    } catch(error) {
      toast.error(error.response.data.error);
    }
  }
  // -----------------------------------------------------------------------------
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <header>
          <strong className='header-title-strong'>Cadastro de Funcionários</strong>
          <div className='header-bottom-div'>
          <input className='header-input'name="filter" placeholder='Busca por tarefas' />
            <div className='header-button-div'>
              <Link to='/contact-list/list'>
                <button className="back-button" type="button">
                  <RiSkipBackFill size={18} color='#FFF' /> Voltar
                </button>
              </Link>
              <button className="save-button" type="submit">
                <RiCheckLine size={18} color='#FFF' /> Salvar
              </button>
            </div>
          </div>
        </header>

        <div className="form-body-div">
          <div className="sub-content-line-div">
            <label>Nome<sup>*</sup></label>
            <Input name="first_name"  type="text" placeholder="Rita"/>
          </div>
          <div className="sub-content-line-div">
            <label>Sobrenome<sup>*</sup></label>
            <Input name="last_name"  type="text" placeholder="Lee Jones de Carvalho"/>
          </div>
          <div className="sub-content-line-div">
            <label>Conhecido como (nome ou apelido para delegar tarefas)<sup>*</sup>:</label>
            <Input name="worker_name"  type="text" placeholder="Rita Lee"/>
          </div>
          <div className="sub-content-line-div">
            <label>Departamento</label>
            <Input name="department"  type="text" placeholder="Compras" />
          </div>
          <div className="sub-content-line-div">
            <label>Número de celular<sup>*</sup></label>
            <InputMask name ="phoneNumberMask" type="phoneNumberMask" mask="(99)99999-9999" placeholder="Ex.: (00)00000-0000" maskChar="_"
              onChange={e => {
              setMasked(e.target.value);
              }}
            />
          </div>
        </div>
      </Form>
    </Container>
  );
}

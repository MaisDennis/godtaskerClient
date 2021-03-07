import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { Rewind, CheckCircle } from 'react-feather'
import { Select } from '@rocketseat/unform';
// -----------------------------------------------------------------------------
import { Container } from '~/pages/_layouts/create/styles';
import api from '~/services/api';
import history from '~/services/history';
// -----------------------------------------------------------------------------
export default function CreateWorker() {
    const [masked, setMasked] = useState(' ');
  const user_id = useSelector(state => state.user.profile.id);

  // const gender = [ {"id": "masculino" }, {"id": "feminino" }, {"id": "alien"}];
  // const genderOptions = gender.map(g => ({ id: g.id, title: g.id }))

  async function handleSubmit({ first_name, last_name, worker_name, department }) {
    const phonenumber = masked.replace(/\D/gim, '');
    try {
      // await api.post('workers', {
      //   first_name,
      //   last_name,
      //   worker_name,
      //   dept,
      //   phonenumber,
      //   worker_password,
      //   gender,
      //   user_id,
      // });
      // history.push('/workers/list');
      // toast.success('Funcionário cadastrado com sucesso!');

      await api.post(`users/${user_id}/contact-list`, {
        first_name,
        last_name,
        worker_name,
        department,
        phonenumber,
      })
      // history.push('/workers/list');
      toast.success('Funcionário cadastrado com sucesso!');

    } catch {
      toast.error('Por favor preencher os campos com (*)');
    }

  }
  // -----------------------------------------------------------------------------
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <header>
          <strong>Cadastro de Funcionários</strong>
          <div className='header-bottom-div'>
          <input className='header-input'name="filter" placeholder='Busca por tarefas' />
            <div className='header-button-div'>
              <Link to='/'>
                <button className="back-button" type="button">
                  <Rewind size={11} color='#FFF' /> Voltar
                </button>
              </Link>
              <button className="save-button" type="submit">
                <CheckCircle size={11} color='#FFF' /> Salvar
              </button>
            </div>
          </div>
        </header>

        <div className="form-body-div">
          <div className="sub-content-line-div">
            <label>Nome<sup>*</sup></label>
            <Input name="first_name"  type="text" placeholder="Nome"/>
          </div>
          <div className="sub-content-line-div">
            <label>Sobrenome<sup>*</sup></label>
            <Input name="last_name"  type="text" placeholder="Nome"/>
          </div>
          <div className="sub-content-line-div">
            <label>Conhecido como (nome ou apelido para delegar tarefas)<sup>*</sup>:</label>
            <Input name="worker_name"  type="text" placeholder="Nome"/>
          </div>
          <div className="sub-content-line-div">
            <label>Departamento</label>
            <Input name="department"  type="text" placeholder="Dept" />
          </div>
          <div className="sub-content-line-div">
            <label>Número de celular<sup>*</sup></label>
            <InputMask name ="phoneNumberMask" type="phoneNumberMask" mask="(99)99999-9999" placeholder="Ex.: (00)00000-0000" maskChar="_"
              onChange={e => {
              setMasked(e.target.value);
              }}
            />
          </div>
          {/* <div className="sub-content-line-div">
              <label>Gênero<sup>*</sup></label>
              <Select className='gender-select' name="gender" options={genderOptions} placeholder="Gênero"/>
          </div> */}
        </div>
      </Form>
    </Container>
  );
}

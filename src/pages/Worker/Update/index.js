import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { Rewind, CheckCircle } from 'react-feather'
// -----------------------------------------------------------------------------
import { Container } from '~/pages/_layouts/create/styles';
import api from '~/services/api';
import history from '~/services/history';
// -----------------------------------------------------------------------------
export default function UpdateWorker({ match }) {
  // const [masked, setMasked] = useState(' ');
  const [workerInitialData, setWorkerInitialData] = useState([]);
  const user_id = useSelector(state => state.user.profile.id);
  const { id } = match.params;

  useEffect(() => {
    loadWorkerInitialData('', user_id);
  },[ user_id ]);

  async function loadWorkerInitialData( nameFilter, userID ) {
    const response = await api.get('workers', {
      params: { nameFilter, userID },
    })
    const workerData = response.data.find(
      w => w.id === id
    )
    setWorkerInitialData(workerData);
  }

  async function handleSubmit({ name, dept, gender, worker_password }) {
    // const phonenumber = masked.replace(/\D/gim, '');
    const phonenumber = workerInitialData.phonenumber
    const workerProfile = Object.assign(
      { name, dept, phonenumber, gender, worker_password });

    if(!name) {
      toast.error('Por favor, colocar um nome.');
    } else {
      try {
        await api.put(`workers/${id}`, workerProfile);
        history.push('/workers/list');
        toast.success('Funcionário atualizado com sucesso!');
      } catch {
        toast.error('Por favor, verificar se o número de telefone é válido.');
      }
    }
  }
  // -----------------------------------------------------------------------------
  return (
    <Container>
      <Form initialData={workerInitialData} onSubmit={handleSubmit}>
        <header>
          <strong>Atualizar o funcionários</strong>
          <div>
            <input name="cssSpaceFiller"/>
            <div>
              <Link to='/workers/list'>
                <button className="back" type="button"><Rewind size={11} color='#FFF' /> Voltar</button>
              </Link>
              <button className="standard" type="submit" ><CheckCircle size={11} color='#FFF'/> Salvar</button>
            </div>
          </div>
        </header>

        <div className="formBody">
          <div className="line">
            <div className="subContent">
              <label>Funcionário</label>
              <Input name="name"  type="text" placeholder="Nome"/>
            </div>
          </div>
          <div className="line">
            <div className="subContent">
              <label>Departamento</label>
              <Input name="dept"  type="text" placeholder="Dept" />
            </div>
          </div>

          <div className="line" title="Número de celular não pode ser alterado.">
            <div className="subContent">
            <label>Número de celular</label>
              <InputMask
                name="phoneNumberMask"
                value={workerInitialData.phonenumber}
                type="text"
                mask="(99)99999-9999"
                placeholder="Ex.: (00)00000-0000"
                style={{background:'#F5F5F5'}}
                readOnly
                maskChar="_"
                // onChange={e => {
                //   setMasked(e.target.value);
                // }}
              />
              {/* <InputMask name ="cpfMask" type="text" mask="999.999.999-99" placeholder="Ex.: 000.000.000-00" maskChar="_"
                onChange={e => {
                  setMasked(e.target.value);
                }}
              /> */}
            </div>
          </div>
          <div className="line">
            <div className="subContent">
              <label>Gênero</label>
              <Input name="gender"  type="text" placeholder="gênero" />
            </div>
          </div>
          <div className="line">
            <div className="subContent">
              <label>Senha do funcionário (Você vai passar ao funcionário para entrar no app)</label>
              <Input name="worker_password"  type="text" placeholder="senha" />
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}

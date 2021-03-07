import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { Form, Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { RiSkipBackFill, RiCheckLine } from 'react-icons/ri';
// import { Select } from '@rocketseat/unform';
// -----------------------------------------------------------------------------
import { Container } from '~/pages/_layouts/create/styles';
import api from '~/services/api';
import history from '~/services/history';
// -----------------------------------------------------------------------------
export default function UpdateWorker({ match }) {
  const [initialWorkerData, setInitialWorkerData] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [workerName, setWorkerName] = useState();
  const [department, setDepartment] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [masked,  setMasked] = useState(' ');
  const user_id = useSelector(state => state.user.profile.id);
  const default_worker_name = match.params.worker_name;

  useEffect(() => {
    loadWorkerInitialData()
  }, [ match ])

  async function loadWorkerInitialData() {
    const userResponse = await api.get(`users/${user_id}/contact-list`, {
    })

    const defaultWorkerData = userResponse.data.find(
      c => c.worker_name === default_worker_name
    )
    setInitialWorkerData(defaultWorkerData);
    setFirstName(defaultWorkerData.first_name);
    setLastName(defaultWorkerData.last_name);
    setWorkerName(defaultWorkerData.worker_name);
    setDepartment(defaultWorkerData.department);
    setPhonenumber(defaultWorkerData.phonenumber);
  }

  const { register, handleSubmit } = useForm();

  const onSubmit = ({ first_name, last_name, worker_name, department }) => {
    try {
      api.put(`users/${user_id}/contact-list`, {
        worker_id: initialWorkerData.worker_id,
        first_name,
        last_name,
        worker_name,
        department,
        phonenumber: phonenumber,
      })
      history.push('/contact-list/list');
      toast.success('Funcionário cadastrado com sucesso!');
    } catch(error) {
      toast.error(error.response.data.error);
    }
  }
  // -----------------------------------------------------------------------------
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header>
          <strong className='header-title-strong'>Atualizar dados do Funcionários</strong>
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
            <input
              name="first_name"
              type="text"
              placeholder="Nome"
              ref={register}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="sub-content-line-div">
            <label>Sobrenome<sup>*</sup></label>
            <input
              name="last_name"
              type="text"
              placeholder="Nome"
              ref={register}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="sub-content-line-div">
            <label>Conhecido como (nome ou apelido para delegar tarefas)<sup>*</sup>:</label>
            <input
              name="worker_name"
              type="text"
              placeholder="Nome"
              ref={register}
              value={workerName}
              onChange={(e) => setWorkerName(e.target.value)}
            />
          </div>
          <div className="sub-content-line-div">
            <label>Departamento</label>
            <input
              name="department"
              type="text"
              placeholder="Dept"
              ref={register}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div className="sub-content-line-div">
            <label>Número de celular</label>
            <InputMask
              name ="phoneNumberMask"
              type="phoneNumberMask"
              mask="(99) 99999-9999"
              placeholder="Ex.: (00)00000-0000"
              maskChar="_"
              onChange={e => {
              setMasked(e.target.value);
              }}
              value={phonenumber}
              style={{ backgroundColor: '#f5f5f5'}}
            />
          </div>
        </div>
      </form>
    </Container>
  );
}

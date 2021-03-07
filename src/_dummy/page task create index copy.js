import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Rewind, CheckCircle } from 'react-feather'
import { Link } from 'react-router-dom';
import { startOfHour, endOfHour, parseISO, isBefore, subDays } from 'date-fns';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import { Container } from '~/pages/_layouts/create/styles';
// import history from '~/services/history';
// -----------------------------------------------------------------------------
export default function CreateTask() {
  const [ worker, setWorker ] = useState([]);
  const user_id = useSelector(state => state.user.profile.id);

  useEffect(() =>{
    loadWorkerOptionsList('', user_id);
  }, [ user_id ])

  async function loadWorkerOptionsList(nameFilter, userID) {
    const response = await api.get('workers', {
      params: { nameFilter, userID },
    })
    setWorker(response.data);
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    const hourStart = startOfHour(parseISO(data.start_date));
    const parsedDueDateByEndingHour = endOfHour(parseISO(data.due_date)); // This solves: start_date === end_date issue for now (2020.07.22)

    if(!data.worker_id) {
      toast.error('Por favor, escolher um funcionário.');
    } else if (!data.name) {
        toast.error('Por favor, dar um nome à tarefa.');
    } else if (!data.start_date) {
        toast.error('Por favor, colocar uma data de início.');
    } else if (isBefore(hourStart, subDays(new Date(), 1))) {
        toast.error('O início está no passado.');
    } else if (!data.due_date) {
      toast.error('Por favor, colocar um prazo.');
    } else if (isBefore(parsedDueDateByEndingHour , hourStart)) {
      toast.error('O prazo está antes do início.');
    } else {
      api.post('tasks', [
        data, user_id
      ],
      );
      // history.push('/');
      toast.success('Tarefa cadastrada com sucesso!');
    }
  }
  // -----------------------------------------------------------------------------
  return (
   <Container>
     <form onSubmit={handleSubmit(onSubmit)}>
       <header>
          <strong>Cadastro de Tarefas</strong>
          <div>
            <input name="filter" placeholder='Busca por tarefas'/>
            <div>
              <Link to='/'>
                <button className="back" type="button"><Rewind size={11} color='#FFF' /> Voltar</button>
              </Link>
              <button className="standard" type="submit"><CheckCircle size={11} color='#FFF'/> Salvar</button>
            </div>
          </div>
        </header>

        <div className="formBody">
          <div className="line">
            <div className="subContent">
              <label>Funcionário<sup>*</sup></label>
              <select name="worker_id" ref={register}>
                {worker.map(w =>
                  <option key={w.id} value={w.id}>{w.name}</option>
                )}
              </select>
            </div>
            <div className="subContent">
              <label>Tarefa<sup>*</sup></label>
              <input name="name" type="string" placeholder="Lavar o carro" ref={register}/>
            </div>
          </div>
          <div className="line">
            <div className="subContent">
              <label>Descrição</label>
              <textarea id="test" className="descriptionInput" name="description" type="string" placeholder="1. Molhar 2. Passar sabão 3. Enxaguar..." ref={register} />
            </div>
          </div>
          <div className="line">
            <div className="subContent">
              <label>Início<sup>*</sup></label>
              <input name="start_date" type="date" ref={register}/>
            </div>
            <div className="subContent">
              <label>Prazo<sup>*</sup></label>
              <input name="due_date" type="date" ref={register}/>
            </div>
          </div>
        </div>
     </form>
   </Container>
  );
}

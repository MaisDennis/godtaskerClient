import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Rewind, CheckCircle } from 'react-feather'
import { Link } from 'react-router-dom';
import { startOfHour, endOfHour, parseISO, isBefore, format  } from 'date-fns';
import { TiEdit } from 'react-icons/ti';
import { RiCloseCircleFill } from 'react-icons/ri';
import { ptBR } from 'date-fns/locale';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import { Container } from '~/pages/_layouts/create/styles';
import history from '~/services/history';
// -----------------------------------------------------------------------------
export default function UpdateTask({ match }) {
  const [ worker, setWorker ] = useState([]);
  const [subTasks, setSubTasks] = useState([]);
  const [taskInitialData, setTaskInitialData] = useState([]);
  // const user_id = useSelector(state => state.user.profile.id);
  const user_id = 1;
  const task_id = match.params.id;
  const formattedDate = fdate =>
    fdate == null
      ? ''
      : format(parseISO(fdate), "yyyy'-'MM'-'dd", { locale: ptBR });

  useEffect(() =>{

    loadTaskInitialData('', user_id);
    loadWorkerOptionsList('', user_id);
  },[ user_id ])

  async function loadWorkerOptionsList(nameFilter, userID) {
    const workerResponse = await api.get('workers', {
      params: { nameFilter, userID },
    })
    setWorker(workerResponse.data);
  }

  async function loadTaskInitialData( workerNameFilter, userID ) {
    const taskResponse = await api.get('tasks', {
      params: { workerNameFilter, userID },
    })
    const taskData = taskResponse.data.find(
      t => t.id == task_id
    )
    setTaskInitialData(taskData);

  }
  console.log(taskInitialData)
  const { register, handleSubmit } = useForm(
  );

  const onSubmit = data => {
    const hourStart = startOfHour(parseISO(data.start_date));
    // const userID = user_id;
    const parsedDueDateByEndingHour = endOfHour(parseISO(data.due_date)); // This solves: start_date === end_date issue for now (2020.07.22)

    if(!data.worker_id) {
      toast.error('Por favor, escolher um funcionário.');
    } else if (!data.name) {
        toast.error('Por favor, dar um nome à tarefa.');
    } else if (!data.start_date) {
        toast.error('Por favor, colocar uma data de início.');
    } else if (!data.due_date) {
      toast.error('Por favor, colocar um prazo.');
    } else if (isBefore(parseISO(data.due_date) , new Date())) {
      toast.error('O prazo não pode ser no passado.');
    } else if (isBefore(parsedDueDateByEndingHour , hourStart)) {
      toast.error('O prazo está antes do início.');
    } else {
      const { worker_id, name, description, start_date, due_date } = data
      console.log(worker_id)
      api.put(`tasks/${task_id}`, {
        name,
        description,
        start_date,
        due_date,
        worker_id,
      }
      );
      history.push('/');
      toast.success('Tarefa cadastrada com sucesso!');
    }
  }


  // -----------------------------------------------------------------------------
  return (
   <Container>
     <form onSubmit={handleSubmit(onSubmit)}>
       <header>
          <strong>Atualizar a tarefa</strong>
          <div className='header-bottom-div'>
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
              <label>Funcionário</label>
              <select name="worker_id" ref={register} value={taskInitialData.worker_id}>
                {worker.map(w =>
                  <option key={w.id} value={w.id}>{w.name}</option>
                )}
              </select>
            </div>
            <div className="subContent">
              <label>Tarefa</label>
              <input
                name="name"
                type="string"
                ref={register}
                placeholder="Lavar o carro"
                defaultValue={taskInitialData.name}
              />
            </div>
          </div>
          <div className="line">
            <div className="subContent">
              <label>Descrição</label>
              <textarea
                id="test"
                className="descriptionInput"
                name="description"
                type="string"
                placeholder="1. Molhar 2. Passar sabão 3. Enxaguar..."
                ref={register}
                defaultValue={taskInitialData.description}/>
            </div>
          </div>
          <div className="line">
            <div className="subContent">
              <label>Início</label>
              {
                isBefore(parseISO(taskInitialData.start_date), new Date())
                ? <input
                    name="start_date"
                    type="date"
                    ref={register}
                    defaultValue={formattedDate(taskInitialData.start_date)}
                    style={{background: '#F5F5F5'}}
                    title="Inícios no passado não podem ser alterados."
                    readOnly
                    // defaultValue='2020-09-14'
                  />
                : <input
                    name="start_date"
                    type="date"
                    ref={register}
                    defaultValue={formattedDate(taskInitialData.start_date)}
                    // defaultValue='2020-09-14'
                  />
              }

            </div>
            <div className="subContent">
              <label>Prazo</label>
              <input
                name="due_date"
                type="date"
                ref={register}
                defaultValue={formattedDate(taskInitialData.due_date)}
              />
            </div>
          </div>
        </div>
     </form>
   </Container>
  );
}

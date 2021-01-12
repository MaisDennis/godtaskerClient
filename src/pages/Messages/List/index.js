import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Plus } from 'react-feather'
import { Link } from 'react-router-dom';
import { format, parseISO, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import { Container, Line } from '~/pages/_layouts/list/styles';
import insert from '~/assets/insert_photo-24px.svg';
// -----------------------------------------------------------------------------
export default function ListMessages() {
  const [tasks, setTasks] = useState([]);
  const [ message, setMessage ] = useState([]);
  const [ queryInput, setQueryInput ] = useState([]);
  const [taskDetailsId, setTaskDetailsId] = useState();
  // const user_id = useSelector(state => state.user.profile.id)
  const user_id = 1;

  const formattedDate = fdate =>
    fdate == null
      ? ''
      : format(parseISO(fdate), "dd '/' MMM '/' yyyy", { locale: ptBR });

  useEffect(() => {
    load('', user_id);
  }, [ user_id ])

  async function load(workerNameFilter, userID) {

    const response = await api.get('tasks', {
      params: { workerNameFilter, userID }
    })
    setTasks(response.data);
    console.log(response.data)
  }

  function handleInputChange(e) {
    setQueryInput(e.target.value)
  }

  function handleQueryInput(e) {
    if ( e.key === 'Enter' )
      load(queryInput);
  }

  const [tempId, setTempId] = useState();
  const [taskDetailsToggle, setTaskDetailsToggle] = useState(false);

  function handleTaskDetails(id) {
    setTaskDetailsToggle(!taskDetailsToggle)
    if (tempId !== id) setTaskDetailsToggle(true)
    setTaskDetailsId(id)
    setTempId(id);
  }
  // -----------------------------------------------------------------------------
  return (
    <Container>
      <header>
        <strong>Tarefas</strong>
        <div className='list-header-div'>
          <input placeholder='Busca por Nome de Funcionário'
            onChange={handleInputChange} onKeyDown={handleQueryInput}
          />
          <Link className='create-link' to='/tasks'>
            <Plus size={11} color='#FFF' /> Nova Tarefa
          </Link>
        </div>
      </header>

      <div className='title-bar'>
        <strong>Tarefa</strong>
        <strong>Funcionários</strong>
        <strong className='short-tag'>Prazo</strong>
        <strong className='long-tag'>Coversas</strong>
      </div>

      <ul className='item-list'>
        {tasks.map((t) =>
          <Line key={t.id} className='item-list-row'>
            <div className="line-div" onClick={() => handleTaskDetails(t.id)}>
              <label>{t.name}</label>
              <label className="name-label">{t.worker.worker_name}</label>
                {
                  isBefore(parseISO(t.due_date), new Date())
                    ? <label className="duedate" style={{ background: '#d87678' }}>{formattedDate(t.due_date)}</label>
                    : <label className="duedate" style={{ background: '#daf1e0' }}>{formattedDate(t.due_date)}</label>
                }
                <label className='long-label'>The Eagle has landed.</label>

            </div>
            {
              taskDetailsToggle && taskDetailsId === t.id
              ? (
                <div className="task-details-div">



                  <div className="task-details-aside">

                    <div className="task-details-button-div">
                      <button className="task-details-button">Alterar Tarefa</button>
                      <button className="task-details-button">Cancelar Tarefa</button>
                    </div>
                    <div className="task-details-bottom-div">
                      <strong className='task-details-strong'>Avaliação de tarefa</strong>
                      <label className='task-details-label'><Link to={`/tasks/details/${t.id}`} style={{ color: 'blue' }}>entrar</Link></label>
                    </div>

                  </div>

                  <div className="messages-div">
                    <div className="messages-list-div">
                      {
                        (t.messages !== null) && (typeof(t.messages[0]) === 'object')
                        ? (
                          t.sub_task_list.map(s => (
                            <label key={s.description}class="container">{s.description}
                              <input type="checkbox"/>
                              <span class="checkmark"></span>
                            </label>
                          ))
                        )
                        : null
                      }
                    </div>
                  </div>
                </div>
              )
              : null
            }
          </Line>
        )}
      </ul>
    </Container>
  );
};

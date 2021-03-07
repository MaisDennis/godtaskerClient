import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Plus } from 'react-feather'
import { Link } from 'react-router-dom';
import { format, parseISO, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import { Container, Line } from '~/pages/_layouts/list/styles';
// import insert from '~/assets/insert_photo-24px.svg';
// import whatsapplogo from '~/assets/whatsapplogo5.png'
// -----------------------------------------------------------------------------
export default function ListTasks() {
  const [tasks, setTasks] = useState([]);
  const [queryInput, setQueryInput] = useState([]);
  const [taskDetailsId, setTaskDetailsId] = useState(1);

  // const user_id = useSelector(state => state.user.profile.id)
  const user_id = 1;

  const formattedDate = fdate =>
    fdate == null
      ? ''
      : format(parseISO(fdate), "dd'/'MMM'/'yyyy", { locale: ptBR });

  useEffect(() => {
    load('', user_id);
  }, [user_id]);

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
    if (e.key === 'Enter')
      load(queryInput);
  }

  const [tempId, setTempId] = useState();
  const [taskDetailsToggle, setTaskDetailsToggle] = useState(true); // temporary true, change to false

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
          <input className="header-input" placeholder='Busca por Nome de Funcionário'
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
        <strong className='short-tag'>Sub-tarefas</strong>
        <strong className='short-tag'>Prioridade</strong>
        <strong className='short-tag'>Status</strong>
        <strong className='short-tag'>Início</strong>
        <strong className='short-tag'>Prazo</strong>
        <strong className='short-tag'>Entregue</strong>
      </div>

      <ul className='item-list'>
        {tasks.map((t) =>
          <Line key={t.id} className='item-list-row'>
            <div className="line-div" onClick={() => handleTaskDetails(t.id)}>
              <label className="item-label">{t.name}</label>
              <label className="item-label">{t.worker.worker_name}</label>
              <label className="short-tag">Sim</label>
              <label className="short-tag">Alta!</label>
              <label className="short-tag">Em aberto</label>

                <label className="startdate">{formattedDate(t.start_date)}</label>
                {
                  isBefore(parseISO(t.due_date), new Date())
                    ? <label className="duedate" style={{ background: '#d87678' }}>{formattedDate(t.due_date)}</label>
                    : <label className="duedate" style={{ background: '#daf1e0' }}>{formattedDate(t.due_date)}</label>
                }
                <label className="startdate">{formattedDate(t.end_date) || '-'}</label>

            </div>
            {
              taskDetailsToggle && taskDetailsId === t.id
              ? (
// *****************************************************************************
                <div className="task-details-div">
                  <div className="sub-tasks-div">
                    <label className="task-details-label">Sub-tarefas</label>
                    <div className="sub-tasks-list-div">
                      {
                        (t.sub_task_list !== null) && (typeof(t.sub_task_list[0]) === 'object')
                        ? (
                          t.sub_task_list.map(s => (
                            <label className="sub-task-checkbox-label" key={s.description}>
                              <input classname="sub-tasks-checkbox-input" type="checkbox"/>
                              <span className="sub-tasks-checkbox-span">{s.description}</span>
                            </label>
                          ))
                        )
                        : null
                      }
                    </div>
                  </div>

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

                  <div className="message-details-div">
                  <label className="task-details-label">Conversa</label>
                    <div className="message-conversation-div">
                      {t.messages.map(m => (
                        <div className={`message-div ${m.sender}`}>
                          <label className={`message-span ${m.sender}`}>{m.message}</label>
                        </div>
                      ))}
                    </div>
                    <form>
                    <textarea type="text" className="message-input"/>
                    </form>


                  </div>

                  {/* <label>
                    <a href={`https://api.whatsapp.com/send?phone=55${t.workerphonenumber}`} title={`${t.workerphonenumber}`} target="_blank" rel="noopener noreferrer">
                      <button className="whatsappbutton" type="button">
                        <img src={whatsapplogo} alt="whatsapplogo" style={{ height: 16 }} color={'green'} />
                      </button>
                    </a>
                  </label> */}
                </div>
              )
              : null
            }


          </Line>
        )}
      </ul>
    </Container>
  );
}

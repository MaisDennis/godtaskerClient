import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { Plus } from 'react-feather'
import { Link } from 'react-router-dom';
import { format, parseISO, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import Searchbar from '../../../utils/Searchbar';
import { Container, TaskListDiv, TaskDetailsDiv, MessageDiv, Line } from '~/pages/_layouts/list/styles';
// import insert from '~/assets/insert_photo-24px.svg';
// import whatsapplogo from '~/assets/whatsapplogo5.png'
// -----------------------------------------------------------------------------
export default function ListTasks() {
  const [inputState, setInputState] = useState('');
  const [tasks, setTasks] = useState([]);
  const [defaultTasks, setDefaultTasks] = useState([]);
  const [task, setTask] = useState(tasks[0]);
  const [chatMessage, setChatMessage] = useState();
  const [queryInput, setQueryInput] = useState([]);

  const messageRef = useRef();

  // const user_id = useSelector(state => state.user.profile.id)
  const user_id = 1;

  const formattedDate = fdate =>
    fdate == null
      ? ''
      : format(parseISO(fdate), "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

  const formattedMessageDate = fdate =>
  fdate == null
    ? ''
    : format(fdate, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

  const handleUpdateInput = async (input) => {
    const filteredList = defaultTasks.filter(t => {
      let workerName = t.worker.worker_name

      return workerName.toLowerCase().includes(input.toLowerCase())
    })
    setTasks(filteredList)
    setInputState(input)
  }

  useEffect(() => {
    load('', user_id);
  }, [user_id]);

  async function load(workerNameFilter, userID) {
    const response = await api.get('tasks', {
      params: { workerNameFilter, userID }
    })
    setTasks(response.data);
    setDefaultTasks(response.data)
    setTask(response.data[0])
    // console.log(response.data)
  }

  function handleInputChange(e) {
    setQueryInput(e.target.value)
  }

  function handleQueryInput(e) {
    if (e.key === 'Enter')
      load(queryInput);
  }

  function handleTaskDetails(t) {
    setTask(t);
  }

  async function handleRemoveTask(task) {
    await api.delete(`tasks/${task.id}`);
    load('', user_id);
  }

  async function handleMessageSubmit(e) {
    e.preventDefault()
    let pushMessage = task.messages
    let formattedTimeStamp = formattedMessageDate(new Date())
    const id = task.id

    pushMessage.push({
      "message": chatMessage,
      "sender": "user",
      "user_read": false,
      "worker_read": false,
      "timestamp": formattedTimeStamp
    })

    await api.put(`tasks/messages/${id}`,
      pushMessage
    );
    setChatMessage()
    // load('', user_id);
    messageRef.current.value = '';
  }
  // -----------------------------------------------------------------------------
  return (
    <Container>
      <div className="container-left">
        <TaskListDiv>
          <header className='list-header'>
            <strong>Tarefas</strong>
            <div className='list-header-div'>
              <Searchbar className="header-input" input={inputState} onChange={handleUpdateInput}/>
              {/* <input
                className="header-input"

                // onChange={handleInputChange}
                onChange={handleUpdateInput}
                onKeyDown={handleQueryInput}
              /> */}
              <Link className='create-link' to='/tasks'>
                <Plus size={11} color='#FFF' /> Nova Tarefa
              </Link>
            </div>
          </header>

          <div className='title-bar'>
            <strong className='title-strong'>Tarefa</strong>
            <strong className='title-strong'>Funcionários</strong>
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
                <div className="line-div" onClick={() => handleTaskDetails(t)}>
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
              </Line>
            )}
          </ul>
        </TaskListDiv>

        <TaskDetailsDiv>
          <label className="task-details-label">Tarefa: {task && task.name}</label>
          <label className="task-details-label">Descrição</label>
          <div className="task-details-description-div">{task && task.description}</div>
          <div className="sub-tasks-div">
            <label className="task-details-label">Sub-tarefas</label>
            <div className="sub-tasks-list-div">
              { task ? (
                task.sub_task_list.map(s => (
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
          <div className="buttons-div">
            <Link className='create-link' to={task ? (`/tasks/update/${task.id}`) : null}>
              <Plus size={11} color='#FFF' /> Editar Tarefa
            </Link>
            <button className="remove-task-button" onClick={() => handleRemoveTask(task)}>Cancelar a tarefa</button>
          </div>

        </TaskDetailsDiv>
      </div>

    <div className="container-right">
      <MessageDiv>
        <strong>Conversa</strong>
          <div className="message-conversation-div">
            { task && (
              task.messages.map(m => (
                <div className={`message-div ${m.sender}`}>
                  {m.sender === 'user'
                    ? (
                      <>
                        <span className={`message-time-span ${m.sender}`}>{m.timestamp}</span>
                        <span className={`message-span ${m.sender}`}>{m.message}</span>
                      </>
                    )
                    : (
                      <>
                        <span className={`message-span ${m.sender}`}>{m.message}</span>
                    <span className={`message-time-span ${m.sender}`}>{m.timestamp}</span>
                      </>
                    )
                  }

                </div>
              ))
            )}
          </div>
          <form onSubmit={handleMessageSubmit}>
            <textarea
              type="text"
              className="message-input"
              ref={messageRef}
              onChange={e => setChatMessage(e.target.value)}/>
            <button type='submit'>Submit</button>
          </form>
      </MessageDiv>
    </div>
    </Container>
  );
}

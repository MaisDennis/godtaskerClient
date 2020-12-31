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
  const [priority, setPriority] = useState([]);
  const [chatMessage, setChatMessage] = useState();
  const [queryInput, setQueryInput] = useState([]);
  const user_id = useSelector(state => state.user.profile.id)
  const messageRef = useRef();

  const formattedDate = fdate =>
    fdate == null
      ? ''
      : format(parseISO(fdate), "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

  const formattedMessageDate = fdate =>
  fdate == null
    ? ''
    : format(fdate, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

  const selectArray = ['alta', 'média', 'baixa', '']

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

  async function handlePrior(e, id, taskAttributes, radioType) {
    let editedTaskAttributes = []
    if(radioType === 'Prior') {
      editedTaskAttributes = [
        e.target.value,
        taskAttributes[1],
        taskAttributes[2],
      ]
    } else {
      editedTaskAttributes = [
        taskAttributes[0],
        e.target.value,
        taskAttributes[2],
      ]
    }

    console.log(id)
    await api.put(`tasks/${id}`, {
      task_attributes: editedTaskAttributes
    }
    );
    load('', user_id);
  }

  async function handleRemoveTask(task) {
    await api.delete(`tasks/${task.id}`);
    load('', user_id);
  }

  async function handleMessageSubmit(e) {
    if ( e.key === 'Enter' ) {

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
  }
  // -----------------------------------------------------------------------------
  return (
    <Container>
      <div className="container-div left">
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
            <strong className='title-strong'>Funcionário</strong>

              <strong className='short-tag'>Prioridade</strong>
              <strong className='short-tag'>Urgência</strong>


            {/* <strong className='short-tag'>Status</strong> */}
            <strong className='short-tag'>Início</strong>
            <strong className='short-tag'>Prazo</strong>
            <strong className='short-tag-last'>Entregue</strong>
          </div>

          <ul className='item-list'>
            {tasks.map((t) =>
              <Line key={t.id} className='item-list-row'>
                <div className="line-div" onClick={() => handleTaskDetails(t)}>
                  <label className="item-label">{t.name}</label>
                  <label className="item-label">{t.worker.worker_name}</label>
                  <div className="select-div">
                  <select
                    className={`list-select ${t.task_attributes[0]}`}
                    onChange={e => handlePrior(e, t.id, t.task_attributes, 'Prior')}
                    value={t.task_attributes[0]}>
                    {selectArray.map(s =>
                      <option key={s} className="list-option" value={s}>{s}</option>
                    )}
                  </select>
                  </div>
                  <div className="select-div">
                  <select
                    className={`list-select ${t.task_attributes[1]}`}
                    onChange={e => handlePrior(e, t.id, t.task_attributes, 'Urgent')}
                    value={t.task_attributes[1]}>
                    {selectArray.map(s =>
                      <option key={s} className="list-option" value={s}>{s}</option>
                    )}
                  </select>
                  </div>


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
          <div className="test">
          <strong className="task-details-label">Detalhes da tarefa: {task && task.name}</strong>
          <label className="task-details-label">Descrição</label>
          <div className="task-details-description-div">{task && task.description}</div>
          <div className="sub-tasks-div">
            <label className="task-details-label">Sub-tarefas</label>
            <div className="sub-tasks-list-div">
              { task ? (
                task.sub_task_list.map(s => (
                  <label className="sub-task-checkbox-label" key={s.description}>
                    <input classname="sub-tasks-checkbox-input" type="checkbox" checked="true"/>
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
            <button className="remove-task-button" onClick={() => handleRemoveTask(task)}>Avaliar a tarefa</button>
          </div>
        </div>
        </TaskDetailsDiv>
      </div>

    <div className="container-div right">
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
          {/* <form onSubmit={handleMessageSubmit}> */}
            <textarea
              type="text"
              className="message-input"
              ref={messageRef}
              onChange={e => setChatMessage(e.target.value)}
              onKeyDown={handleMessageSubmit}
            />
          {/* </form> */}
      </MessageDiv>
    </div>
    </Container>
  );
}

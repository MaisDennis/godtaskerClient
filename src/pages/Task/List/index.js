import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { Plus } from 'react-feather'
import { Link } from 'react-router-dom';
import { format, parseISO, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { MdNotifications } from 'react-icons/md';
import { GrTask } from 'react-icons/gr';
// import { BiMessageDetail } from 'react-icons/bi';
import { FiMessageSquare } from 'react-icons/fi';
import { BsThreeDotsVertical, BsSearch } from 'react-icons/bs'
import insert from '~/assets/insert_photo-24px.svg';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import Searchbar from '../../../utils/Searchbar';
import { Container, TaskListDiv, TaskDetailsDiv, MessageDiv, Line, Badge } from '~/pages/_layouts/list/styles';
// import insert from '~/assets/insert_photo-24px.svg';
// import whatsapplogo from '~/assets/whatsapplogo5.png'
// -----------------------------------------------------------------------------
export default function ListTasks() {
  const [inputState, setInputState] = useState('');
  const [tasks, setTasks] = useState([]);
  const [defaultTasks, setDefaultTasks] = useState([]);
  const [task, setTask] = useState(tasks[0]);
  const [ bellVisible, setBellVisible] = useState();
  const [chatMessage, setChatMessage] = useState();
  const user_id = useSelector(state => state.user.profile.id)
  const messageRef = useRef();
  const lastMessageRef = useRef();


  const scrollIntoLastMessage = () => {lastMessageRef.current.scrollIntoView(false)}

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
      let workerName = t.name + t.worker.worker_name
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
    scrollIntoLastMessage()
    // console.log(response.data)
  }

  async function handleTaskDetails(t) {
    let S = t.sub_task_list;
    let editedMessages = t.messages;
    await S.map((s) => {
      if(s.user_read === false) {
        s.user_read = true;
      }
    })

    await editedMessages.map((m) => {
      if(m.user_read === false) {
        m.user_read = true;
      }
    })

    await api.put(`tasks/${t.id}`, {
      sub_task_list: S,
      messages: editedMessages,
    })
    setTask(t);
  }

  async function handleSelect(e, id, taskAttributes, radioType) {
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

    await api.put(`tasks/${id}`, {
      task_attributes: editedTaskAttributes
    }
    );
    load('', user_id);
  }

  function handleStatus(sub_task_list) {
    let weigeSum = 0;
    for(let i = 0; i < sub_task_list.length; i++) {
      if(sub_task_list[i].complete === true) {
        weigeSum += (sub_task_list[i].weige_percentage)
      }
    }
    return Math.round(weigeSum)
  }

  function hasUnread(array) {
    let sum = 0;
    for(let i = 0; i < array.length; i++) {
      if(array[i].user_read === false) {
        sum += 1
      }
    }
    return sum
  }

  async function handleRemoveTask(task) {
    await api.delete(`tasks/${task.id}`);
    load('', user_id);
  }

  async function handleMessageSubmit(e) {
    // if ( e.key === 'Enter' ) {
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

      setChatMessage(); // adds latest message to chat.
      if(pushMessage.length > 3) scrollIntoLastMessage()
      messageRef.current.value = '';
      messageRef.current.focus()
    // }
  }


  // -----------------------------------------------------------------------------
  return (
    <Container>
      <div className="container-div left">
        <TaskListDiv>
          <header className='list-header'>
            <strong>Tarefas</strong>
            <div className='list-header-div'>
              <Link className='create-link' to='/tasks'>
                <button className="task-button search">
                  <Plus size={11} color='#FFF' /> Nova Tarefa
                </button>
              </Link>
              <Searchbar className="header-input" input={inputState} onChange={handleUpdateInput}/>

            </div>
          </header>

          <div className='title-bar'>
            <strong className='title-strong'>Tarefa</strong>
            <strong className='title-strong'>Funcionário</strong>
            <strong className='short-tag'>Prioridade</strong>
            <strong className='short-tag'>Urgência</strong>
            <strong className='short-tag'>Início</strong>
            <strong className='short-tag'>Prazo</strong>
            <strong className='short-tag'>Status</strong>
            <div className='bell-tag'><GrTask size={18}/></div>
            <div className='bell-tag last'><FiMessageSquare size={18}/></div>
          </div>

          <ul className='item-list'>
            {tasks.map((t) =>
              <Line key={t.id} className='item-list-row'>
                <div className="line-div" onClick={() => handleTaskDetails(t)}>
                  <label className="item-label">{t.name}</label>
                  <label className="item-label">{t.worker.worker_name}</label>
                  <select
                    className={`list-select ${t.task_attributes[0]}`}
                    onChange={e => handleSelect(e, t.id, t.task_attributes, 'Prior')}
                    value={t.task_attributes[0]}>
                    {selectArray.map(s =>
                      <option key={s} className="list-option" value={s}>{s}</option>
                    )}
                  </select>
                  <select
                    className={`list-select ${t.task_attributes[1]}`}
                    onChange={e => handleSelect(e, t.id, t.task_attributes, 'Urgent')}
                    value={t.task_attributes[1]}>
                    {selectArray.map(s =>
                      <option key={s} className="list-option" value={s}>{s}</option>
                    )}
                  </select>
                  <label className="startdate">{formattedDate(t.start_date)}</label>
                  {
                    isBefore(parseISO(t.due_date), new Date())
                      ? <label className="duedate red">{formattedDate(t.due_date)}</label>
                      : <label className="duedate green">{formattedDate(t.due_date)}</label>
                  }
                  <label className="status-label">
                    <div className="status-complete-div">
                      <div
                        className="status-incomplete-div"
                        style={{"width": `${handleStatus(t.sub_task_list)}%`}}
                      ></div>
                    </div>
                    <span className="status-span">
                      {handleStatus(t.sub_task_list)}%
                    </span>
                  </label>
                  <div className="bell-label">
                    {
                      (hasUnread(t.sub_task_list) === 0)
                      ? (
                        <Badge style={{visibility: 'hidden'}}>
                          <MdNotifications color="#ccc" size={28} />
                        </Badge>

                      )
                      : (
                        <Badge hasUnread={hasUnread(t.sub_task_list)}>
                          <MdNotifications color="#ccc" size={28} />
                        </Badge>
                      )
                    }
                  </div>
                  <div className="bell-label last">
                    {
                      (hasUnread(t.messages) === 0)
                      ? (
                        <Badge style={{visibility: 'hidden'}}>
                          <MdNotifications color="#ccc" size={28} />
                        </Badge>

                      )
                      : (
                        <Badge hasUnread={hasUnread(t.messages)}>
                          <MdNotifications color="#ccc" size={28} />
                        </Badge>
                      )
                    }
                  </div>
                </div>
              </Line>
            )}
          </ul>
        </TaskListDiv>

        <TaskDetailsDiv>
          <div className="task-details-div">
            <strong className="task-details-strong">Detalhes da tarefa: {task && task.name}</strong>
            <label className="task-details-label">Descrição</label>
            <div className="task-details-description-div">{task && task.description}</div>
            <div className="sub-tasks-div">
              <label className="task-details-label">Sub-tarefas</label>
              <div className="sub-tasks-list-div">
                { task ? (
                  task.sub_task_list.map((s, index) => (
                    <div className="sub-tasks-checkbox-div" key={index}>
                      <label className="sub-tasks-checkbox-label" key={s.description}>
                        <input className="sub-tasks-checkbox-input" type="checkbox" defaultChecked={s.complete}/>
                        <span className="sub-tasks-checkbox-span">{s.description}</span>
                      </label>
                      <span className="#">Peso:
                        {
                          s.weige_percentage
                            ? ` ${JSON.stringify(s.weige_percentage).replace(".",",")}%`
                            : ' n/a'
                        }
                      </span>
                    </div>
                  ))
                )
                : null
                }
              </div>
            </div>
            <div className="sub-tasks-buttons-div">
              <Link className='create-link' to={task && (`/tasks/update/${task.id}`)}>
                <button className="task-button edit">Editar</button>
              </Link>
              <button className="task-button remove" onClick={() => handleRemoveTask(task)}>Cancelar</button>
              <button className="task-button score" onClick={() => handleRemoveTask(task)}>Avaliar</button>
            </div>
          </div>
        </TaskDetailsDiv>
      </div>

    <div className="container-div right">
      <MessageDiv>
        <header className='message-header'>
          <strong>Conversa</strong>
          <div className="list-header">
            <div className="worker-profile-div">
                <img src={insert} alt="Worker"/>
              <label className="worker-profile-label">Worker 1</label>
            </div>
            <div className="message-menu-div">
              <button className="message-menu-button"><BsSearch size={16}/></button>
              <button className="message-menu-button"><BsThreeDotsVertical size={16}/></button>
            </div>
        </div>
        </header>
          <div className="message-conversation-div">
            { task && task.messages && (
              task.messages.map((m, index) => (
                <div className={`message-div ${m.sender}`} key={index}>
                  {m.sender === 'user'
                    ? (
                      <>
                        <span className={`message-time-span ${m.sender}`}>{m.timestamp}</span>
                        { index
                          ? (
                            <span
                              className={`message-span ${m.sender}`}
                              ref={lastMessageRef}
                            >{m.message}</span>
                          ) : (
                            <span
                              className={`message-span ${m.sender}`}
                              id={index}
                            >{m.message}</span>
                          )
                        }
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
              onChange={e => setChatMessage(e.target.value)}
              // onKeyDown={handleMessageSubmit}
            />
            <button className='message-button' type='submit'>Enviar</button>
          </form>
      </MessageDiv>
    </div>
    </Container>
  );
}

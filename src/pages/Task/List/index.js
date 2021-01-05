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
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { RiArrowDownSLine } from 'react-icons/ri'
import insert from '~/assets/insert_photo-24px.svg';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import Searchbar from '../../../utils/Searchbar';
// import sort from '../../../utils/sort';
import { Container, TaskListDiv, TaskDetailsDiv, MessageDiv, Line, Badge } from '~/pages/_layouts/list/styles';
// import insert from '~/assets/insert_photo-24px.svg';
// import whatsapplogo from '~/assets/whatsapplogo5.png'
// -----------------------------------------------------------------------------
export default function ListTasks() {
  const [inputState, setInputState] = useState('');
  const [tasks, setTasks] = useState([]);
  const [defaultTasks, setDefaultTasks] = useState([]);
  const [task, setTask] = useState(tasks[0]);
  const [chatMessage, setChatMessage] = useState();
  // title item sort toggles
  const [toggleName, setToggleName] = useState();
  const [togglePrior, setTogglePrior] = useState();
  const [toggleWorker, setToggleWorker] = useState();
  const [toggleUrgent, setToggleUrgent] = useState();
  const [toggleStartDate, setToggleStartDate] = useState();
  const [toggleDueDate, setToggleDueDate] = useState();
  const [messageDropMenu, setMessageDropMenu] = useState();
  const [toggleDropMenu, setToggleDropMenu] = useState(false);
  const [replyValue, setReplyValue] = useState();
  const [forwardValue, setForwardValue] = useState();

  const user_id = useSelector(state => state.user.profile.id)
  const messageRef = useRef();
  const lastMessageRef = useRef();
  const messageInputRef = useRef();

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

  const handleStatus = (sub_task_list) => {
    let weigeSum = 0;
    for(let i = 0; i < sub_task_list.length; i++) {
      if(sub_task_list[i].complete === true) {
        weigeSum += (sub_task_list[i].weige_percentage)
      }
    }
    return Math.round(weigeSum)
  }

  const hasUnread = (array) => {
    let sum = 0;
    for(let i = 0; i < array.length; i++) {
      if(array[i].user_read === false) {
        sum += 1
      }
    }
    return sum
  }

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

  function handleMessageDropMenu(position) {
    setMessageDropMenu(position)
    setToggleDropMenu(!toggleDropMenu)
  }

  function handleReply(message) {
    setReplyValue(message)
  }

  function sortName() {
    if (!toggleName) {
      tasks.sort(compare)
      setToggleName(!toggleName)
    }
    if (toggleName) {
      tasks.sort(reversedCompare)
      setToggleName(!toggleName)
    }
    setToggleWorker(false);
    setTogglePrior(false);
    setToggleUrgent(false);
    setToggleStartDate(false);
    setToggleDueDate(false);
    setTask()

    function compare(a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    }

    function reversedCompare(a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    }
  }

  function sortWorker() {
    if (!toggleWorker) {
      tasks.sort(compare)
      setToggleWorker(!toggleWorker)
    }
    if (toggleWorker) {
      tasks.sort(reversedCompare)
      setToggleWorker(!toggleWorker)
    }
    setToggleName(false);
    setTogglePrior(false);
    setToggleUrgent(false);
    setToggleStartDate(false);
    setToggleDueDate(false);
    setTask()

    function compare(a, b) {
      if (a.worker_name > b.worker_name) {
        return 1;
      }
      if (a.worker_name < b.worker_name) {
        return -1;
      }
      return 0;
    }

    function reversedCompare(a, b) {
      if (a.worker_name > b.worker_name) {
        return -1;
      }
      if (a.worker_name < b.worker_name) {
        return 1;
      }
      return 0;
    }
  }

  function sortPrior() {
    if (!togglePrior) {
      tasks.sort(compare)
      setTogglePrior(!togglePrior)
    }
    if (togglePrior) {
      tasks.sort(reversedCompare)
      setTogglePrior(!togglePrior)
    }
    setToggleName(false);
    setToggleWorker(false);
    setToggleUrgent(false);
    setToggleStartDate(false);
    setToggleDueDate(false);
    setTask()

    function compare(a, b) {
      if (a.task_attributes[0] > b.task_attributes[0]) {
        return 1;
      }
      if (a.task_attributes[0] < b.task_attributes[0]) {
        return -1;
      }
      return 0;
    }

    function reversedCompare(a, b) {
      if (a.task_attributes[0] > b.task_attributes[0]) {
        return -1;
      }
      if (a.task_attributes[0] < b.task_attributes[0]) {
        return 1;
      }
      return 0;
    }
  }

  function sortUrgent() {
    if (!toggleUrgent) {
      tasks.sort(compare)
      setToggleUrgent(!toggleUrgent)
    }
    if (toggleUrgent) {
      tasks.sort(reversedCompare)
      setToggleUrgent(!toggleUrgent)
    }
    setToggleName(false);
    setToggleWorker(false);
    setTogglePrior(false);
    setToggleStartDate(false);
    setToggleDueDate(false);
    setTask()

    function compare(a, b) {
      if (a.task_attributes[1] > b.task_attributes[1]) {
        return 1;
      }
      if (a.task_attributes[1] < b.task_attributes[1]) {
        return -1;
      }
      return 0;
    }

    function reversedCompare(a, b) {
      if (a.task_attributes[1] > b.task_attributes[1]) {
        return -1;
      }
      if (a.task_attributes[1] < b.task_attributes[1]) {
        return 1;
      }
      return 0;
    }
  }

  function sortStartDate() {
    if (!toggleStartDate) {
      tasks.sort(compare)
      setToggleStartDate(!toggleStartDate)
    }
    if (toggleStartDate) {
      tasks.sort(reversedCompare)
      setToggleStartDate(!toggleStartDate)
    }
    setToggleName(false);
    setToggleWorker(false);
    setTogglePrior(false);
    setToggleUrgent(false);
    setToggleDueDate(false);
    setTask()

    function compare(a, b) {
      if (a.start_date > b.start_date) {
        return 1;
      }
      if (a.start_date < b.start_date) {
        return -1;
      }
      return 0;
    }

    function reversedCompare(a, b) {
      if (a.start_date > b.start_date) {
        return -1;
      }
      if (a.start_date < b.start_date) {
        return 1;
      }
      return 0;
    }
  }

  function sortDueDate() {
    if (!toggleDueDate) {
      tasks.sort(compare)
      setToggleDueDate(!toggleDueDate)
    }
    if (toggleDueDate) {
      tasks.sort(reversedCompare)
      setToggleDueDate(!toggleDueDate)
    }
    setToggleName(false);
    setToggleWorker(false);
    setTogglePrior(false);
    setToggleUrgent(false);
    setToggleStartDate(false);
    setTask()

    function compare(a, b) {
      if (a.due_date > b.due_date) {
        return 1;
      }
      if (a.due_date < b.due_date) {
        return -1;
      }
      return 0;
    }

    function reversedCompare(a, b) {
      if (a.due_date > b.due_date) {
        return -1;
      }
      if (a.due_date < b.due_date) {
        return 1;
      }
      return 0;
    }
  }

  function sortMessages() {
    if (!toggleDueDate) {
      tasks.sort(compare)
      setToggleDueDate(!toggleDueDate)
    }
    if (toggleDueDate) {
      tasks.sort(reversedCompare)
      setToggleDueDate(!toggleDueDate)
    }
    setToggleName(false);
    setToggleWorker(false);
    setTogglePrior(false);
    setToggleUrgent(false);
    setToggleStartDate(false);
    setTask()

    function compare(a, b) {
      if (hasUnread(a) > hasUnread(b)) {
        return 1;
      }
      if (hasUnread(a) < hasUnread(a)) {
        return -1;
      }
      return 0;
    }

    function reversedCompare(a, b) {
      if (hasUnread(a) > hasUnread(b)) {
        return -1;
      }
      if (hasUnread(a) < hasUnread(b)) {
        return 1;
      }
      return 0;
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
              <Link className='create-link' to='/tasks'>
                <button className="task-button search">
                  <Plus size={11} color='#FFF' /> Nova Tarefa
                </button>
              </Link>
              <Searchbar className="header-input" input={inputState} onChange={handleUpdateInput}/>
            </div>
          </header>

          <div className='title-bar'>
            <strong className='title-strong' onClick={() => sortName()} style={{cursor:'pointer'}}>Tarefa
              { toggleName
                ? <TiArrowSortedUp style={{marginLeft: '8px'}}/>
                : <TiArrowSortedDown style={{marginLeft: '8px', alignSelf: 'center'}}/>
              }
            </strong>
            <strong className='title-strong' onClick={() => sortWorker()} style={{cursor:'pointer'}}>Funcionário
              { toggleWorker
                ? <TiArrowSortedUp style={{marginLeft: '8px'}}/>
                : <TiArrowSortedDown style={{marginLeft: '8px', alignSelf: 'center'}}/>
              }
            </strong>
            <strong className='short-tag' onClick={() => sortPrior()}>Prioridade
            { togglePrior
                ? <TiArrowSortedUp style={{marginLeft: '8px'}}/>
                : <TiArrowSortedDown style={{marginLeft: '8px', alignSelf: 'center'}}/>
              }
            </strong>
            <strong className='short-tag' onClick={() => sortUrgent()} style={{cursor:'pointer'}}>Urgência
              { toggleUrgent
                ? <TiArrowSortedUp style={{marginLeft: '8px'}}/>
                : <TiArrowSortedDown style={{marginLeft: '8px', alignSelf: 'center'}}/>
              }
            </strong>
            <strong className='short-tag'onClick={() => sortStartDate()} style={{cursor:'pointer'}}>Início
              { toggleStartDate
                ? <TiArrowSortedUp style={{marginLeft: '8px'}}/>
                : <TiArrowSortedDown style={{marginLeft: '8px', alignSelf: 'center'}}/>
              }
            </strong>
            <strong className='short-tag' onClick={() => sortDueDate()} style={{cursor:'pointer'}}>Prazo
              { toggleDueDate
                ? <TiArrowSortedUp style={{marginLeft: '8px'}}/>
                : <TiArrowSortedDown style={{marginLeft: '8px', alignSelf: 'center'}}/>
              }
            </strong>
            <strong className='short-tag'>Status</strong>
            <div className='bell-tag'><GrTask size={18}/></div>
            <div className='bell-tag last' onClick={() => sortMessages()} style={{cursor:'pointer'}}><FiMessageSquare size={18}/></div>
          </div>
          {/* Task List */}
          <ul className='item-list'>
            {tasks.map((t) =>
              <Line key={t.id} className='item-list-row'>
                <div className="line-div" onClick={() => handleTaskDetails(t)}>
                  <label className="item-label">{t.name}</label>
                  <label className="item-label">{t.worker.worker_name}</label>
                  {/* Task selects */}
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
                  {/* Task Dates */}
                  <label className="startdate">{formattedDate(t.start_date)}</label>
                  { isBefore(parseISO(t.due_date), new Date())
                    ? <label className="duedate red">{formattedDate(t.due_date)}</label>
                    : <label className="duedate green">{formattedDate(t.due_date)}</label>
                  }
                  {/* Task Status */}
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
                  {/* Task Bells */}
                  <div className="bell-label">
                    { (hasUnread(t.sub_task_list) === 0)
                      ? (
                        <Badge style={{visibility: 'hidden'}} value={hasUnread(t.sub_task_list)} ref={messageInputRef}>
                          <MdNotifications color="#ccc" size={28} />
                        </Badge>
                      )
                      : (
                        <Badge hasUnread={hasUnread(t.sub_task_list)} value={hasUnread(t.sub_task_list)} ref={messageInputRef}>
                          <MdNotifications color="#ccc" size={28} />
                        </Badge>
                      )
                    }
                  </div>
                  <div className="bell-label last">
                    { (hasUnread(t.messages) === 0)
                      ? (
                        <Badge style={{visibility: 'hidden'}} value={hasUnread(t.sub_task_list)} ref={messageInputRef}>
                          <MdNotifications color="#ccc" size={28} />
                        </Badge>
                      )
                      : (
                        <Badge hasUnread={hasUnread(t.messages)} value={hasUnread(t.sub_task_list)} ref={messageInputRef}>
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
        {/* Task Detail */}
        <TaskDetailsDiv>
          <div className="task-details-div">
            <strong className="task-details-strong">Detalhes da tarefa: {task && task.name}</strong>
            <label className="task-details-label">Descrição</label>
            <div className="task-details-description-div">{task && task.description}</div>
            <div className="sub-tasks-div">
              <label className="task-details-label">Sub-tarefas</label>
              <div className="sub-tasks-list-div">
                { task
                  ? ( task.sub_task_list.map((s, index) => (
                    <div className="sub-tasks-checkbox-div" key={index}>
                      <label className="sub-tasks-checkbox-label" key={s.description}>
                        <input className="sub-tasks-checkbox-input" type="checkbox" defaultChecked={s.complete}/>
                        <span className="sub-tasks-checkbox-span">{s.description}</span>
                      </label>
                      <span className="#">Peso:
                        { s.weige_percentage
                            ? ` ${JSON.stringify(s.weige_percentage).replace(".",",")}%`
                            : ' n/a'
                        }
                      </span>
                    </div>
                  )))
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
    {/* Chat */}
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
                <div className={`message-container-div ${m.sender}`} key={index}>
                  { m.sender === 'user'
                    ? (
                      <div className={`time-message-div ${m.sender}`}>
                        <span className={`message-time-span`}>{m.timestamp}</span>

                        { index // View goes to last message
                          ? (
                            <div className={`message-line-div ${m.sender}`} >
                              <span
                                className={`message-span ${m.sender}`}
                                ref={lastMessageRef}
                              >{m.message}</span>
                              <RiArrowDownSLine
                                onClick={() => handleMessageDropMenu(index)}
                                style={{cursor:'pointer'}}
                              />
                            </div>
                          ) : (
                            <div className={`message-line-div ${m.sender}`}>
                              <span
                                className={`message-span ${m.sender}`}
                              >{m.message}</span>
                              <RiArrowDownSLine/>
                            </div>
                          )
                        }
                      </div>
                    )
                    : (
                      <div className={`time-message-div ${m.sender}`}>
                        <div className={`message-line-div ${m.sender}`}>
                          <span className={`message-span ${m.sender}`}>{m.message}</span>
                          <RiArrowDownSLine
                            onClick={() => handleMessageDropMenu(index)}
                            style={{cursor:'pointer'}}
                          />
                        </div>
                        <span className={`message-time-span`}>{m.timestamp}</span>
                      </div>
                    )
                  }
                  { (messageDropMenu === index) && (toggleDropMenu === true) && (
                    <ul classname="message-dropMenu-ul">
                      <li className="message-dropMenu-li">
                        <button
                          className="message-dropMenu-button"
                          onClick={() => handleReply(m.message)}
                        >Responder</button>
                      </li>
                      <li className="message-dropMenu-li">
                        <button className="message-dropMenu-button">Encaminhar</button>
                      </li>
                      { m.sender === 'user' && (
                        <li className="message-dropMenu-li">
                          <button className="message-dropMenu-button">Deletar</button>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleMessageSubmit}>
            {
              replyValue && (
                <div className="temporary-message-div">
                  {replyValue}
                </div>
              )
            }

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

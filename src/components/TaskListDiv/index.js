import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { Plus } from 'react-feather'
// -----------------------------------------------------------------------------
import { Container } from './styles';
import Searchbar from '../../utils/Searchbar';
import { format, parseISO, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MdNotifications } from 'react-icons/md';
import { GrTask } from 'react-icons/gr';
import { FiMessageSquare } from 'react-icons/fi';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import api from '~/services/api';
import { Line, Badge } from '~/pages/_layouts/list/styles';

function TaskListDiv({
  user_id,
  load,
  tasks,
  setTasks,
  defaultTasks,
  setTask,
  handleTaskDetails,

}) {
  const [inputState, setInputState] = useState('');
  const [toggleName, setToggleName] = useState();
  const [toggleWorker, setToggleWorker] = useState();
  const [togglePrior, setTogglePrior] = useState();
  const [toggleUrgent, setToggleUrgent] = useState();
  const [toggleStartDate, setToggleStartDate] = useState();
  const [toggleDueDate, setToggleDueDate] = useState();

  const messageInputRef = useRef();

  const selectArray = ['alta', 'média', 'baixa', '']

  async function handleListState(number) {
    // await setListState(number)
    console.log(number)
    await load('', user_id, number);
  }

  const formattedDate = fdate =>
  fdate == null
    ? ''
    : format(parseISO(fdate), "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

  const hasUnread = (array) => {
    let sum = 0;
    for(let i = 0; i < array.length; i++) {
      if(array[i].user_read === false) {
        sum += 1
      }
    }
    return sum
  }

  const handleUpdateInput = async (input) => {
    const filteredList = defaultTasks.filter(t => {
      let workerName = t.name + t.worker.worker_name
      return workerName.toLowerCase().includes(input.toLowerCase())
    })
    setTasks(filteredList)
    setInputState(input)
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

  const handleStatus = (sub_task_list) => {
    let weigeSum = 0;
    for(let i = 0; i < sub_task_list.length; i++) {
      if(sub_task_list[i].complete === true) {
        weigeSum += (sub_task_list[i].weige_percentage)
      }
    }
    return Math.round(weigeSum)
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
    setToggleWorker(false); setTogglePrior(false);  setToggleUrgent(false);
    setToggleStartDate(false);  setToggleDueDate(false);  setTask()

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
    setToggleName(false); setTogglePrior(false);  setToggleUrgent(false);
    setToggleStartDate(false);  setToggleDueDate(false);  setTask()

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
    setToggleName(false); setToggleWorker(false); setToggleUrgent(false);
    setToggleStartDate(false);  setToggleDueDate(false);  setTask()

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
    setToggleName(false); setToggleWorker(false); setTogglePrior(false);
    setToggleStartDate(false);  setToggleDueDate(false);  setTask()

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
    setToggleName(false); setToggleWorker(false); setTogglePrior(false);
    setToggleUrgent(false); setToggleDueDate(false);  setTask()

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
    setToggleName(false); setToggleWorker(false); setTogglePrior(false);
    setToggleUrgent(false); setToggleStartDate(false);  setTask()

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
    setToggleName(false); setToggleWorker(false); setTogglePrior(false);
    setToggleUrgent(false); setToggleStartDate(false);  setTask();

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
  //----------------------------------------------------------------------------
  return (
    <Container>
      <header className='list-header'>
        <strong>Tarefas:
          <button className="list-header-button" onClick={() => handleListState(1)}>em aberto</button> |
          <button className="list-header-button" onClick={() => handleListState(2)}>finalizadas</button> |
          <button className="list-header-button" onClick={() => handleListState(3)}>canceladas</button> |
          <button className="list-header-button" onClick={() => handleListState(4)}>todas</button>
        </strong>
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
        <strong className='short-tag' onClick={() => sortPrior()} style={{cursor:'pointer'}}>Prioridade
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
        { tasks.map((t) =>
          <Line key={t.id} className='item-list-row'>
            {
              t.end_date || t.canceled_at
              ? (
                <div
                  className="line-div canceled" onClick={() => handleTaskDetails(t)}
                >
                  <label className="item-label">{t.name}</label>
                  <label className="item-label">{t.worker.worker_name}</label>
                  {/* Task selects */}
                  <label className="short-label">{t.task_attributes[0]}</label>
                  <label className="short-label">{t.task_attributes[1]}</label>
                  {/* Task Dates */}
                  <label className="startdate">{formattedDate(t.start_date)}</label>
                  <label className="startdate">{formattedDate(t.due_date)}</label>
                  {/* Task Status */}
                  <label className="status-label">
                    { t.end_date && isBefore(parseISO(t.end_date), parseISO(t.due_date)) &&
                      (
                        <label className="duedate red">
                          {`Finalizada ${formattedDate(t.end_date)}`}
                        </label>
                      )

                    }
                    { t.end_date && isBefore(parseISO(t.due_date), parseISO(t.end_date)) &&
                      (
                        <label className="duedate green">
                          {`Finalizada ${formattedDate(t.end_date)}`}
                        </label>
                      )

                    }
                    { t.canceled_at && (
                      <div>
                        {`Cancelada ${formattedDate(t.canceled_at)}`}
                      </div>
                    )}
                    { !t.end_date && !t.canceled_at && (
                      <>
                        <div className="status-complete-div">
                          <div
                            className="status-incomplete-div"
                            style={{"width": `${handleStatus(t.sub_task_list)}%`}}
                          ></div>
                        </div>
                        <span className="status-span">
                          {handleStatus(t.sub_task_list)}%
                        </span>
                      </>
                    )}
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
                        <Badge hasUnread={hasUnread(t.messages)} value={hasUnread(t.messages)} ref={messageInputRef}>
                          <MdNotifications color="#ccc" size={28} />
                        </Badge>
                      )
                    }
                  </div>
                </div>
              )
              : (
                <div
                  className="line-div" onClick={() => handleTaskDetails(t)}
                >
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
                    { t.end_date && (
                      <div>
                        {`Finalizada ${formattedDate(t.end_date)}`}
                      </div>
                    )}
                    { t.canceled_at && (
                      <div>
                        {`Cancelada ${formattedDate(t.canceled_at)}`}
                      </div>
                    )}
                    { !t.end_date && !t.canceled_at && (
                      <>
                        <div className="status-complete-div">
                          <div
                            className="status-incomplete-div"
                            style={{"width": `${handleStatus(t.sub_task_list)}%`}}
                          ></div>
                        </div>
                        <span className="status-span">
                          {handleStatus(t.sub_task_list)}%
                        </span>
                      </>
                    )}
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
                        <Badge hasUnread={hasUnread(t.messages)} value={hasUnread(t.messages)} ref={messageInputRef}>
                          <MdNotifications color="#ccc" size={28} />
                        </Badge>
                      )
                    }
                  </div>
                </div>
              )
            }

          </Line>
        )}
      </ul>
    </Container>
  )
}

export default TaskListDiv

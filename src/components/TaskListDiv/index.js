import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { GrTask } from 'react-icons/gr';
import { FiMessageSquare } from 'react-icons/fi';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import 'firebase/firestore'
import 'firebase/auth'
// -----------------------------------------------------------------------------
import api from '~/services/api';
import Searchbar from '../../utils/Searchbar';
import { ListDiv } from '~/pages/_layouts/list/styles';
import TaskLine from '../TaskLine'
// -----------------------------------------------------------------------------
function TaskListDiv({
  user_id,
  load,
  tasks,
  setTasks,
  defaultTasks,
  setTask,
  handleTaskDetails,
  handleListState,
  setListState,
  messagesProp,
  setMessagesProp,
}) {

  const [inputState, setInputState] = useState('');
  const [toggleName, setToggleName] = useState();
  const [toggleWorker, setToggleWorker] = useState();
  const [togglePrior, setTogglePrior] = useState();
  const [toggleUrgent, setToggleUrgent] = useState();
  const [toggleStartDate, setToggleStartDate] = useState();
  const [toggleDueDate, setToggleDueDate] = useState();

  // const selectArray = ['alta', 'média', 'baixa', '']
  const selectArray = [
    { id: 1, tag: 'baixa' },
    { id: 2, tag: 'média' },
    { id: 3, tag: 'alta' },
    { id: 4, tag: '' },
  ]

  function handleListState(number) {
    load('', user_id, number);
    setListState(number);
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
    // dispatch(updateTasks(new Date()))
    setToggleWorker(false); setTogglePrior(false);  setToggleUrgent(false);
    setToggleStartDate(false);  setToggleDueDate(false);
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
    setToggleName(false); setTogglePrior(false);  setToggleUrgent(false);
    setToggleStartDate(false);  setToggleDueDate(false);  setTask()

    function compare(a, b) {
      if (a.worker.worker_name > b.worker.worker_name) {
        return 1;
      }
      if (a.worker.worker_name < b.worker.worker_name) {
        return -1;
      }
      return 0;
    }

    function reversedCompare(a, b) {
      if (a.worker.worker_name > b.worker.worker_name) {
        return -1;
      }
      if (a.worker.worker_name < b.worker.worker_name) {
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
    <>
      <ListDiv>
      <header className='list-header'>
        <div className="list-header-title-div">
          <strong className="list-header-strong">Tarefas:</strong>
          <ul className="list-header-button-ul">
            <li><button className="list-header-button" onClick={() => handleListState(1)}>em aberto</button> |</li>
            <li><button className="list-header-button" onClick={() => handleListState(2)}>finalizadas</button> |</li>
            <li><button className="list-header-button" onClick={() => handleListState(3)}>canceladas</button> |</li>
            <li><button className="list-header-button" onClick={() => handleListState(4)}>todas</button></li>
          </ul>
        </div>

        <div className='list-header-div'>
          <Link className='create-link' to='/tasks'>
            <button className="task-button search">
              Nova Tarefa
            </button>
          </Link>
          <Searchbar className="header-input" input={inputState} onChange={handleUpdateInput}/>
        </div>
      </header>

      <div className="title-bar">
        <strong className="title-strong" onClick={() => sortName()}>Tarefa
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
        <div className='bell-tag'>
          <GrTask size={18}/>
        </div>
        <div
          className='bell-tag last'
          onClick={() => sortMessages()}
          style={{cursor:'pointer'}}
        >
          <FiMessageSquare size={18}/>
        </div>
      </div>

      {/* Task List */}
      <ul className='item-list'>
        { tasks.map((t) =>
          <TaskLine
            handleTaskDetails={handleTaskDetails}
            handleSelect={handleSelect}
            selectArray={selectArray}
            t={t}
          />
        )}
      </ul>
      </ListDiv>
    </>
  )
}

export default TaskListDiv

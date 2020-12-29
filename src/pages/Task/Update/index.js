import React, { useState, useEffect, useRef } from 'react';
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
  const [initialTaskData, setInitialTaskData] = useState([]);
  const [taskName, setTaskName] = useState();
  const [taskDescription, setTaskDescription] = useState();
  const [subTasks, setSubTasks] = useState([]);
  const [ worker, setWorker ] = useState();

  const [startDateInputValue, setStartDateInputValue] = useState();

  const [subTaskToggleEdit, setSubTaskToggleEdit] = useState(false);
  const [editSubTaskInputValue, setEditSubTasksInputValue] = useState();
  const [editSubTaskIndex, setEditSubTaskIndex] = useState();

  const editSubTaskInputRef = useRef();

  // const user_id = useSelector(state => state.user.profile.id);
  const user_id = 1;
  const task_id = match.params.id;
  const formattedDate = fdate =>
    fdate == null
      ? ''
      : format(parseISO(fdate), "yyyy'-'MM'-'dd", { locale: ptBR });

  useEffect(() =>{
    loadTaskInitialData('', user_id);
  },[ user_id ])

  // async function loadWorkerOptionsList(nameFilter, userID) {
  //   const workerResponse = await api.get('workers', {
  //     params: { nameFilter, userID },
  //   })
  //   setWorker(workerResponse.data);
  // }

  async function loadTaskInitialData( workerNameFilter, userID ) {
    const taskResponse = await api.get('tasks', {
      params: { workerNameFilter, userID },
    })
    const taskData = taskResponse.data.find(
      t => t.id == task_id
    )
    setInitialTaskData(taskData);
    setTaskName(taskData.name);
    setTaskDescription(taskData.description)
    setSubTasks(taskData.sub_task_list)
    setWorker(taskData.worker.worker_name);
  }
  console.log(initialTaskData)
  const { register, handleSubmit } = useForm(
  );

  const onSubmit = ({ name, description, start_date, due_date }) => {
    const hourStart = startOfHour(parseISO(start_date));
    // const userID = user_id;
    const parsedDueDateByEndingHour = endOfHour(parseISO(due_date)); // This solves: start_date === end_date issue for now (2020.07.22)

    if(!initialTaskData.workerphonenumber) {
      toast.error('Por favor, escolher um funcionário.');
    } else if (!name) {
        toast.error('Por favor, dar um nome à tarefa.');
    } else if (!start_date) {
        toast.error('Por favor, colocar uma data de início.');
    } else if (!due_date) {
      toast.error('Por favor, colocar um prazo.');
    } else if (isBefore(parseISO(due_date) , new Date())) {
      toast.error('O prazo não pode ser no passado.');
    } else if (isBefore(parsedDueDateByEndingHour , hourStart)) {
      toast.error('O prazo está antes do início.');
    } else {

      api.put(`tasks/${task_id}`, {
        name,
        description,
        sub_task_list: subTasks,
        task_attributes: initialTaskData.task_attributes,
        start_date,
        due_date,
        workerphonenumber: initialTaskData.workerphonenumber
      }
      );
      history.push('/');
      toast.success('Tarefa cadastrada com sucesso!');
    }
  }

  function handleOpenEditInput(position) {
    setSubTaskToggleEdit(!subTaskToggleEdit)
    setEditSubTasksInputValue(initialTaskData.sub_task_list[position].description)
    setEditSubTaskIndex(position)
  }

  function handleEditSubTask(position) {
    let editedSubTasks = subTasks.map((s, index) => {
      if (index === position) {
        s.description = editSubTaskInputValue
      }
      return s;
    })
    setSubTasks(editedSubTasks);
    setEditSubTaskIndex(null);
  }


  // -----------------------------------------------------------------------------
  return (
   <Container>
     <form onSubmit={handleSubmit(onSubmit)}>
       <header>
          <strong>Atualizar a tarefa</strong>
          <div className='header-bottom-div'>
            <input className='header-input'name="filter" placeholder='Busca por tarefas' />
            <div className='header-button-div'>
              <Link to='/'>
                <button className="back-button" type="button">
                  <Rewind size={11} color='#FFF' /> Voltar
                </button>
              </Link>
              <button className="save-button" type="submit">
                <CheckCircle size={11} color='#FFF' /> Salvar
              </button>
            </div>
          </div>
        </header>
          {/* Task Name */}
        <div className="form-body-div">
          <div className="sub-content-line-div">
            <label>Tarefa<sup>*</sup></label>
            <input
              name="name"
              type="string"
              placeholder="Lavar o carro"
              ref={register}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}/>
          </div>
          {/* Description */}
          <div className="sub-content-line-div">
            <label>Descrição</label>
            <textarea
              id="test"
              className="description-textarea"
              name="description"
              type="string"
              placeholder="Lavar o carro e passar cera."
              ref={register}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div><br/>
          {/* Sub Tasks */}
          <div className="sub-content-line-div">
            <ol className='sub-task-ol'>
              <label>Lista de Sub-tarefas</label>
              {
                subTasks.map((s, index) => (
                  <div className='sub-task-ol-sub-div' key={index}>
                    {
                      subTaskToggleEdit && (editSubTaskIndex === index)
                        ? (
                          <>
                            <li className='sub-task-li'>
                              <div className="sub-task-dangle-list-style">
                                {s.description}
                                <div className='sub-task-icons'>
                                  <TiEdit
                                    className='sub-task-edit-icon'
                                    onClick={() => handleOpenEditInput(index)}
                                  />
                                  <RiCloseCircleFill
                                    className='sub-task-remove-icon'
                                    // onClick={() => handleRemoveSubTask(index)}
                                  />
                                </div>
                              </div>
                            </li>
                            <div className='sub-content-line-div'>
                            <textarea
                              className='sub-task-input'
                              ref={editSubTaskInputRef}
                              value={editSubTaskInputValue}
                              onChange={(e) => setEditSubTasksInputValue(e.target.value)}
                            />
                            <button
                              className='sub-task-add-button'
                              type="button"
                              onClick={() => handleEditSubTask(index)}
                            >{`Alterar a sub-tarefa ???`}</button>
                          </div>
                        </>
                        )
                        : (
                          <>
                            <li className='sub-task-li'>
                              <div className="sub-task-dangle-list-style">
                                {s.description}
                                <div className='sub-task-icons'>
                                  <TiEdit
                                    className='sub-task-edit-icon'
                                    onClick={() => handleOpenEditInput(index)}
                                  />
                                  <RiCloseCircleFill
                                    className='sub-task-remove-icon'
                                    // onClick={() => handleRemoveSubTask(index)}
                                  />
                                </div>
                              </div>
                            </li>
                        </>
                        )
                    }
                  </div>
                ))
              }
            </ol>
          </div>
          {/* Dates */}
          <div className="sub-content-line-divider-div">
            <div className='sub-content-line-div'>
              <label>Início<sup>*</sup></label>
              <input
                name="start_date"
                type="date"
                ref={register}
                onChange={e => setStartDateInputValue(e.target.value)}
                value={startDateInputValue}/>
            </div>
            <div className='sub-content-line-div'>
              <label>Prazo<sup>*</sup></label>
              <input name="due_date" type="date" ref={register} />
            </div>
          </div>
          <br/>
          {/* Worker */}
          <div className='sub-content-line-div'>
            <label>Funcionários<sup>*</sup></label>

                <span className='form-span'>{worker}</span>

          </div>

        </div>
     </form>
   </Container>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Rewind, CheckCircle } from 'react-feather'
import { Link } from 'react-router-dom';
import { startOfHour, endOfHour, parseISO, isBefore, subHours, format  } from 'date-fns';
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
  const [startDateInputValue, setStartDateInputValue] = useState();
  const [dueDateInputValue, setDueDateInputValue] = useState();
  const [worker, setWorker] = useState();

  const [subTaskToggleEdit, setSubTaskToggleEdit] = useState(false);
  const [editSubTaskInputValue, setEditSubTasksInputValue] = useState();
  const [editSubTaskIndex, setEditSubTaskIndex] = useState();

  const editSubTaskInputRef = useRef();

  // const user_id = useSelector(state => state.user.profile.id);
  const user_id = 1;
  const task_id = match.params.id;

  useEffect(() =>{
    loadTaskInitialData('', user_id);
  },[ user_id ])

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
    setStartDateInputValue(taskData.start_date)
    setWorker(taskData.worker.worker_name);
    setStartDateInputValue(format(parseISO(taskData.start_date), "yyyy-MM-dd'T'HH:mm"))
    setDueDateInputValue(format(parseISO(taskData.due_date), "yyyy-MM-dd'T'HH:mm"))
  }
  const { register, handleSubmit } = useForm(
  );

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

  function handleRemoveSubTask(position) {
    let editedSubTasks = subTasks.filter((s, index) => index !== position)
    setSubTasks(editedSubTasks);
  }

  const onSubmit = ({ name, description, start_date, due_date }) => {
    const timeStart = parseISO(start_date);
    const timeEnd = parseISO(due_date);

    if(!initialTaskData.workerphonenumber) {
      toast.error('Por favor, escolher um funcionário.');
      return;
    } else if (!name) {
        toast.error('Por favor, dar um nome à tarefa.');
      return;
    } else if (!start_date) {
      toast.error('Por favor, colocar uma data de início.');
      return;
    } else if (isBefore(timeStart, subHours(new Date(), 1))) {
      toast.error('O início está no passado.');
      return;
    } else if (!due_date) {
      toast.error('Por favor, colocar um prazo.');
      return;
    } else if (isBefore(timeEnd , new Date())) {
      toast.error('O prazo não pode ser no passado.');
      return;
    } else if (isBefore(timeEnd , timeStart)) {
      toast.error('O prazo está antes do início.');
      return;
    } else {
      api.put(`tasks/${task_id}`, {
        name,
        description,
        sub_task_list: subTasks,
        start_date,
        due_date,
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
              <label>(ao alterar, não esquecer de salvar)</label>
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
                                    onClick={() => handleRemoveSubTask(index)}
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
                type="datetime-local"
                ref={register}
                onChange={e => setStartDateInputValue(e.target.value)}
                value={startDateInputValue}
              />
            </div>
            <div className='sub-content-line-div'>
              <label>Prazo<sup>*</sup></label>
              <input
                name="due_date"
                type="datetime-local"
                ref={register}
                onChange={e => setDueDateInputValue(e.target.value)}
                value={dueDateInputValue}
              />
            </div>
          </div>
          <br/>
          {/* Worker */}
          <div className='sub-content-line-div'>
            <div className="row-div">
            <label className='list-label'>Funcionário</label>
            <details>O funcionário é o ID da tarefa. Se quiser delegar a outro(a), na lista de tarefas, copie a tarefa, delegue-a para outro(a), e delete esta tarefa atual.</details>
                {/* <br/> */}
            </div>

                <span className='sub-task-li'>{worker}</span>

          </div>

        </div>
     </form>
   </Container>
  );
}

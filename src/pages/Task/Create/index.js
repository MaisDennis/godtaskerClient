import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Rewind, CheckCircle } from 'react-feather'
import { Link } from 'react-router-dom';
import { parseISO, isBefore , subHours, format } from 'date-fns';
import { TiEdit } from 'react-icons/ti';
import { RiCloseCircleFill,  RiSkipBackFill, RiCheckLine } from 'react-icons/ri';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import { Container } from '~/pages/_layouts/create/styles';
// import history from '~/services/history';
// -----------------------------------------------------------------------------
export default function CreateTask() {
  const [worker, setWorker] = useState([]);
  const [subTasks, setSubTasks] = useState([]);
  const [subTasksCheckBox, setSubTasksCheckBox] = useState(false);
  const [subTaskToggleEdit, setSubTaskToggleEdit] = useState(false);
  const [weige, setWeige] = useState(1);
  const [subTasksInputValue, setSubTasksInputValue] = useState([]); // don't delete subTaskInputValue.
  const [startDateInputValue, setStartDateInputValue] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));

  const [editSubTaskInputValue, setEditSubTasksInputValue] = useState();
  const [editSubTaskIndex, setEditSubTaskIndex] = useState();
  const [editWeigeInputValue, setEditWeigeInputValue] = useState();

  const [radioPriority, setRadioPriority] = useState('');
  const [radioUrgent, setRadioUrgent] = useState('');
  const [radioComplex, setRadioComplex] = useState('');

  const subTaskInputRef = useRef();
  const editSubTaskInputRef = useRef();
  const weigeInputRef = useRef();
  const editWeigeInputRef = useRef();
  const user_id = useSelector(state => state.user.profile.id);

  useEffect(() => {
    loadWorkerOptionsList(user_id);
  }, [user_id])
  async function loadWorkerOptionsList(userID) {
    const response = await api.get(`users/${userID}/contact-list`);
    setWorker(response.data);
  }

  function handleToggleSubTasksDiv() {
    setSubTasksCheckBox(!subTasksCheckBox)
  }

  function handleAddSubTask() {
    if (subTaskInputRef.current.value === '') {
      return;
    } else {
      let subTask = {
        description: subTaskInputRef.current.value,
        weige: weigeInputRef.current.value,
        complete: false,
        user_read: false,
      }
      setSubTasks([...subTasks, subTask])
    }
    subTaskInputRef.current.value = '';
    // weigeInputRef.current.value = '1';
    setWeige('1');
  }

  function handleOpenEditInput(position) {
    setSubTaskToggleEdit(!subTaskToggleEdit)
    setEditSubTasksInputValue(subTasks[position].description)
    setEditWeigeInputValue(subTasks[position].weige)
    setEditSubTaskIndex(position)

  }

  function handleEditSubTask(position) {
    let editedSubTasks = subTasks.map((s, index) => {
      if (index === position) {
        s.description = editSubTaskInputValue;
        s.weige = editWeigeInputValue;
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

  function weigeToPercentage(subTasks) {
    let weigeSum = 0;
    for(let i = 0; i < subTasks.length; i++) {
      weigeSum += parseFloat(subTasks[i].weige)
    }

    for(let i = 0; i < subTasks.length; i++) {
      subTasks[i].weige_percentage = (Math.round((parseFloat(subTasks[i].weige) / weigeSum)*1000) /10)
    }
    return weigeSum;
  }

  const { register, handleSubmit } = useForm();

  const onSubmit = ({ name, description, start_date, due_date, phonenumbers }) => {
    const timeStart = parseISO(start_date);
    const timeEnd = parseISO(due_date); // This solves: start_date === end_date issue for now (2020.07.22)
    const taskAttributeArray = [ radioPriority, radioUrgent, radioComplex ]

    if (!phonenumbers[0]) {
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
    } else if (isBefore(timeEnd, timeStart)) {
      toast.error('O prazo está antes do início.');
    } else {
      weigeToPercentage(subTasks)

      phonenumbers.map(p => {
        api.post('tasks', [
          {
            name,
            description,
            sub_task_list: subTasks,
            task_attributes: taskAttributeArray,
            start_date,
            due_date,
            workerphonenumber: p
          }, user_id
        ])
        return p
      })
      // history.push('/');
      toast.success('Tarefa cadastrada com sucesso!');
    }
  }

  // ---------------------------------------------------------------------------
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header>
          <strong>Cadastro de Tarefas</strong>
          <div className='header-bottom-div'>
            <input className='header-input'name="filter" placeholder='Busca por tarefas' />
            <div className='header-button-div'>
              <Link to='/'>
                <button className="back-button" type="button">
                  <RiSkipBackFill size={18} color='#FFF' /> Voltar
                </button>
              </Link>
              <button className="save-button" type="submit">
                <RiCheckLine size={18} color='#FFF' /> Salvar
              </button>
            </div>
          </div>
        </header>
          {/* Task Name */}
        <div className="form-body-div">
          <div className="sub-content-line-div">
            <label>Tarefa<sup>*</sup></label>
            <input name="name" type="string" placeholder="Lavar o carro" ref={register} />
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
            />
          </div>
          {/* Sub Tasks */}
          <div className="sub-content-line-div">
            <label className='checkbox-label'>
              <input className='checkbox-input' type="checkbox" onClick={handleToggleSubTasksDiv}/>
              <span className='form-span'>Incluir sub-tarefas</span>
              { !subTasksCheckBox && (subTasks[0] !== undefined)
                ? (
                  <span className='observations-span'>
                    <sup>*</sup>Selecionar, ou as sub-tarefas não serão inclusas.
                  </span>
                )
                : null
              }
            </label>
          </div>
          { !subTasksCheckBox
            ? (
              // Sub Tasks Add
              <div className="sub-content-line-div">
                <textarea
                  id="test"
                  className="sub-task-input"
                  name="subTaskInput"
                  type="string"
                  placeholder="1. Molhar 2. Passar sabão 3. Enxaguar..."
                  ref={subTaskInputRef}
                  onChange={(e) => setSubTasksInputValue(e.target.value)}
                />
                <div className="weige-div">
                  <span className="form-span">Peso:</span>
                  <input
                    className="sub-task-weige-input"
                    type="number"
                    ref={weigeInputRef}
                    onChange={(e) => setWeige(e.target.value)}
                    value={weige}
                  />
                </div>
                <button
                  className='sub-task-add-button'
                  type="button"
                  onClick={handleAddSubTask}
                >Adicionar a sub-tarefa à lista</button><br/>
                <ol className='sub-task-ol'>
                  { subTasksCheckBox && (subTasks[0] !== undefined)
                    ?  <label>Lista de Sub-tarefas</label>
                    : null
                  }
                  { subTasks.map((s, index) => (
                    <div className='sub-task-ol-sub-div' key={index}>
                      {
                        subTaskToggleEdit && (editSubTaskIndex === index)
                          ? (
                            <>
                              <li className='sub-task-li'>
                                <div className="sub-task-dangle-list-style">
                                  {s.description}
                                  <div className='sub-task-icons'>
                                    <span className="weige-span">{`Peso: ${s.weige || 'n/a'}`}</span>
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
                              <div className='sub-content-line-div'>
                                <textarea
                                  className='sub-task-input'
                                  ref={editSubTaskInputRef}
                                  value={editSubTaskInputValue}
                                  onChange={(e) => setEditSubTasksInputValue(e.target.value)}
                                />
                                <div className="weige-div">
                                  <span className="form-span">Peso:</span>
                                  <input
                                    className="sub-task-weige-input"
                                    type="number"
                                    ref={editWeigeInputRef}
                                    value={editWeigeInputValue}
                                    onChange={(e) => setEditWeigeInputValue(e.target.value)}
                                  />
                                </div>
                                <button
                                  className='sub-task-add-button'
                                  type="button"
                                  onClick={() => handleEditSubTask(index)}
                                >{`Alterar a sub-tarefa ${index+1}.`}</button>
                              </div>
                            </>
                          )
                        : (
                          <>
                            <li className='sub-task-li'>
                              <div className="sub-task-dangle-list-style">
                              {s.description}
                              <div className='sub-task-icons'>
                              <span className="weige-span">{`Peso: ${s.weige || 'n/a'}`}</span>
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
                  ))}
                  <br/>
                </ol>
              </div>
            )
            : null
          }
          {/* Dates */}
          <div className="sub-content-line-divider-div">
            <div className='sub-content-line-div'>
              <label>Início<sup>*</sup></label>
              <input
                name="start_date"
                type="datetime-local"
                ref={register}
                onChange={e => setStartDateInputValue(e.target.value)}
                value={startDateInputValue}/>
            </div>
            <div className='sub-content-line-div'>
              <label>Prazo<sup>*</sup></label>
              <input name="due_date" type="datetime-local" ref={register} />
            </div>
          </div>
          <br/>
          {/* Radio Tags */}
          <div className="sub-content-line-divider-div">
            <div className="sub-content-line-div">
              <label>Prioridade</label>
              <div className="radio-div">
                <label  className='checkbox-label' key={'1'}>
                  <input
                    className='radio-input'
                    name="Priority"
                    type="radio"
                    value="baixa"
                    onChange={e => setRadioPriority(e.target.value)}
                    ref={register}
                  />
                  <span className='form-span'>baixa</span>
                </label>
                <label  className='checkbox-label' key={'2'}>
                  <input
                    className='radio-input'
                    name="Priority"
                    type="radio"
                    value="média"
                    onChange={e => setRadioPriority(e.target.value)}
                    ref={register}
                  />
                  <span className='form-span'>média</span>
                </label>
                <label  className='checkbox-label' key={'3'}>
                  <input
                    className='radio-input'
                    name="Priority"
                    type="radio"
                    value="alta"
                    onChange={e => setRadioPriority(e.target.value)}
                    ref={register}
                  />
                  <span className='form-span'>alta</span>
                </label>
                <label  className='checkbox-label' key={'4'}>
                  <input
                    className='radio-input'
                    name="Priority"
                    type="radio"
                    value=''
                    onChange={e => setRadioPriority(e.target.value)}
                    ref={register}
                  />
                  <span className='form-span'>n/a</span>
                </label>
              </div>
            </div>
            <div className="sub-content-line-div">
              <label>Urgência</label>
              <div className="radio-div">
                <label  className='checkbox-label' key={'1'}>
                  <input
                    className='radio-input'
                    name="Urgent"
                    type="radio"
                    value='baixa'
                    onChange={e => setRadioUrgent(e.target.value)}
                    ref={register}
                  />
                  <span className='form-span'>baixa</span>
                </label>
                <label  className='checkbox-label' key={'2'}>
                  <input
                    className='radio-input'
                    name="Urgent"
                    type="radio"
                    value='média'
                    onChange={e => setRadioUrgent(e.target.value)}
                    ref={register}
                  />
                  <span className='form-span'>média</span>
                </label>
                <label  className='checkbox-label' key={'3'}>
                  <input
                    className='radio-input'
                    name="Urgent"
                    type="radio"
                    value='alta'
                    onChange={e => setRadioUrgent(e.target.value)}
                    ref={register}
                  />
                  <span className='form-span'>alta</span>
                </label>
                <label  className='checkbox-label' key={'4'}>
                  <input
                    className='radio-input'
                    name="Urgent"
                    type="radio"
                    value=''
                    onChange={e => setRadioUrgent(e.target.value)}
                    ref={register}
                  />
                  <span className='form-span'>n/a</span>
                </label>
              </div>
            </div>
            <div className="sub-content-line-div">
              <label>Complexidade</label>
              <div className="radio-div">
                <label  className='checkbox-label' key={'1'}>
                  <input
                    className='radio-input'
                    name="Complex"
                    type="radio"
                    value='baixa'
                    onChange={e => setRadioComplex(e.target.value)}
                    ref={register}
                  />
                  <span className='form-span'>baixa</span>
                </label>
                <label  className='checkbox-label' key={'2'}>
                  <input
                    className='radio-input'
                    name="Complex"
                    type="radio"
                    value='média'
                    onChange={e => setRadioComplex(e.target.value)}
                    ref={register}
                  />
                  <span className='form-span'>média</span>
                </label>
                <label  className='checkbox-label' key={'3'}>
                  <input
                    className='radio-input'
                    name="Complex"
                    type="radio"
                    value='alta'
                    onChange={e => setRadioComplex(e.target.value)}
                    ref={register}
                  />
                  <span className='form-span'>alta</span>
                </label>
                <label  className='checkbox-label' key={'4'}>
                  <input
                    className='radio-input'
                    name="Complex"
                    type="radio"
                    value=''
                    onChange={e => setRadioComplex(e.target.value)}
                    ref={register}
                  />
                  <span className='form-span'>n/a</span>
                </label>
              </div>
            </div>
          </div>
          {/* Workers */}
          <div className='sub-content-line-div'>
            <label>Enviar a Funcionários<sup>*</sup></label>
            { worker.map((w) =>
              <label  className='checkbox-label' key={w.worker_name}>
                <input
                  className='checkbox-input'
                  name="phonenumbers"
                  type="checkbox"
                  value={w.phonenumber}
                  ref={register}
                />
                <span className='form-span'>{w.worker_name}</span>
              </label>
            )}
          </div>
        </div>
      </form>
    </Container>
  );
}

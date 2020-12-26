import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Plus } from 'react-feather'
import { Link } from 'react-router-dom';
import { format, parseISO, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import { Container, Line } from '~/pages/_layouts/list/styles';
import insert from '~/assets/insert_photo-24px.svg';
import whatsapplogo from '~/assets/whatsapplogo5.png'
// -----------------------------------------------------------------------------
export default function ListTasks() {
  const [ task, setTask ] = useState([]);
  const [ queryInput, setQueryInput ] = useState([]);
  const user_id = useSelector(state => state.user.profile.id)
  const formattedDate = fdate =>
    fdate == null
      ? ''
      : format(parseISO(fdate), "dd'/'MMM'/'yyyy", { locale: ptBR });

  useEffect(() => {
    load('', user_id);
  }, [ user_id ]);

  async function load(workerNameFilter, userID) {
    const response = await api.get('tasks', {
      params: { workerNameFilter, userID }
    })
    setTask(response.data);
  }

  function handleInputChange(e) {
    setQueryInput(e.target.value)
  }

  function handleQueryInput(e) {
    if ( e.key === 'Enter' )
      load(queryInput);
  }
  // -----------------------------------------------------------------------------
  return (
   <Container>
      <header>
        <strong>Tarefas</strong>
        <div>
          <input placeholder='Busca por Nome de Funcionário'
            onChange={handleInputChange} onKeyDown={handleQueryInput}
          />
          <Link className='link-create-worker' to='/tasks'>
            <Plus size={11} color='#FFF'/> Cadastrar Novo Funcionário
          </Link>
        </div>
        <p>
          <strong className="person">Funcionário</strong>
          <strong>Mensagem</strong>
          <strong>Dept.</strong>
          <strong>Tarefa</strong>
          <strong>Início</strong>
          <strong>Prazo</strong>
          <strong>Detalhes</strong>
        </p>
      </header>

      <ul className='task-list'>
        {task.map(t =>
          <Line key={t.id}>
            <div className='avatar_name'>
              <Link to={`/tasks/update/${t.id}`} title='Clicar Aqui para editar a tarefa.' style={{color: 'blue'}}>
                {
                  t.worker.avatar === null
                    ? <img alt='workerAvatar' src={insert}></img>
                    : <img alt='workerAvatar' src={t.worker.avatar.url}></img>
                }
              </Link>
              <strong className="person">
                <Link to={`/tasks/update/${t.id}`}  title='Clicar Aqui para editar a tarefa.' style={{color: 'blue'}} data={task.name}>
                  {t.worker.name}
                </Link>
              </strong>
            </div>
            <strong>
              <a href={`https://api.whatsapp.com/send?phone=55${t.workerphonenumber}`} title={`${t.workerphonenumber}`} target="_blank" rel="noopener noreferrer">
                <button className="whatsappbutton" type="button">
                  <img src={whatsapplogo} alt="whatsapplogo" style={{height:16}} color={'green'}/>
                </button>
              </a>
            </strong>
            <strong>{t.worker.dept}</strong>

            <strong>{t.name}</strong>
            <strong className="startdate">{formattedDate(t.start_date)}</strong>
            {
              isBefore(parseISO(t.due_date), new Date())
                ? <strong className="duedate" style={{background:'#d87678'}}>{formattedDate(t.due_date)}</strong>
                : <strong className="duedate"style={{background:'#daf1e0'}}>{formattedDate(t.due_date)}</strong>
            }

            <strong><Link to={`/tasks/details/${t.id}`} style={{color:'blue'}}>entrar</Link></strong>
          </Line>
        )}
      </ul>
   </Container>
  );
}

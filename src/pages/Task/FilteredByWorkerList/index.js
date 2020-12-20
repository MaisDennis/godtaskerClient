import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdAdd } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import { Container, Line } from '~/pages/_layouts/list/styles';
import insert from '~/assets/insert_photo-24px.svg';
// -----------------------------------------------------------------------------
export default function FilteredByWorkerListTasks( { match }) {
  const { id } = match.params; // id is 'name' in this case.
  const [ task, setTask ] = useState([]);
  const user_id = useSelector(state => state.user.profile.id)
  const formattedDate = fdate =>
    fdate == null
      ? ''
      : format(parseISO(fdate), "dd '/' MMM '/' yyyy", { locale: pt });

  useEffect(() => {
    load('', user_id);
  }, [ user_id ])

  async function load(workerNameFilter, userID) {
    const response = await api.get('tasks', {
      params: { workerNameFilter: id, userID }
    })
    setTask(response.data);
  }
  // -----------------------------------------------------------------------------
  return (
   <Container>
      <header>
        <strong>Gerenciando Tarefas</strong>
        <div>
          <input className="cssSpaceFiller"/>
          <Link to='/task'>
            <button className="standard" type="button"><MdAdd size={16} color='#FFF'/>Cadastrar</button>
          </Link>
        </div>
        <p>
          <strong className='person'>Funcionário</strong>
          <strong>Dept.</strong>
          <strong>Tarefa</strong>
          <strong>Início</strong>
          <strong>Prazo</strong>
          <strong>detalhes</strong>
        </p>
      </header>
      <ul>
        {task.map(t =>
          <Line key={t.id}>
            <div className='avatar_name'>
              {
                t.worker.avatar === null
                  ? <img alt='workerAvatar' src={insert}></img>
                  : <img alt='workerAvatar' src={t.worker.avatar.url}></img>
              }
              <strong className='person'>{t.worker.name}</strong>
            </div>
            <strong>{t.worker.dept}</strong>
            <strong>{t.name}</strong>
            <strong>{formattedDate(t.start_date)}</strong>
            <strong>{formattedDate(t.due_date)}</strong>
            <strong><Link to={`/tasks/details/${t.id}`}>entrar</Link></strong>
          </Line>
        )}
      </ul>
   </Container>
  );
}

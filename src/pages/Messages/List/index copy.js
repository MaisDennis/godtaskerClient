import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Plus } from 'react-feather'
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import { Container, Line } from '~/pages/_layouts/list/styles';
import insert from '~/assets/insert_photo-24px.svg';
// -----------------------------------------------------------------------------
export default function ListMessages() {
  const [ message, setMessage ] = useState([]);
  const [ queryInput, setQueryInput ] = useState([]);
  const user_id = useSelector(state => state.user.profile.id)
  const formattedDate = fdate =>
    fdate == null
      ? ''
      : format(parseISO(fdate), "dd '/' MMM '/' yyyy", { locale: pt });

  useEffect(() => {
    load(user_id, '');
  }, [ user_id ])

  async function load(userID) {
    const response = await api.get('messages/web', {
      params: { userID },
    })
    setMessage(response.data);
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
        <strong>Mensagens</strong>
        <div className='list-header-div'>
          <input placeholder='Busca por tarefas'
            onChange={handleInputChange} onKeyDown={handleQueryInput}
          />
          <Link className='create-link' to='/task'>
            <button className="standard" type="button"><Plus size={11} color='#FFF'/> Cadastrar</button>
          </Link>
        </div>
      </header>

      <div className='title-bar'>
        <strong>Tarefa</strong>
        <strong>Funcionário</strong>
        <strong className="long">Mensagens</strong>
      </div>
      <ul className='item-list'>
        {message.map(m =>
          <Line className='item-list-row' key={m.id}>
            <div className="line-div">
              <strong>{m.task_id}</strong>
              <div className='avatar_name'>
                {
                  m.avatar == null
                    ? <img alt='del_avatar' src={insert}></img>
                    : <img alt='del_avatar' src={m.worker.avatar.url}></img>
                }
                <strong className='name-label'>{m.worker.name}</strong>
              </div>
              <strong>{formattedDate(m.createdAt)}</strong>
              <strong className="long">{m.message_worker}</strong>
            </div>
          </Line>
        )}
      </ul>
    </Container>
  );
};

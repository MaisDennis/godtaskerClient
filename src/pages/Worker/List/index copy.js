import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plus } from 'react-feather'
// -----------------------------------------------------------------------------
import api from '~/services/api';
import { Container, Line } from '~/pages/_layouts/list/styles';
import insert from '~/assets/insert_photo-24px.svg';
import whatsapplogo from '~/assets/whatsapplogo5.png'
// -----------------------------------------------------------------------------
export default function ListWorkers() {
  const [ workers, setWorkers ] = useState([]);
  const [ queryInput, setQueryInput ] = useState([]);
  const user_id = useSelector(state => state.user.profile.id)

  useEffect(() => {
    loadWorkers('', user_id);
  },[ user_id ]);

  async function loadWorkers( nameFilter, userID ) {
    const response = await api.get('workers', {
      params: { nameFilter, userID },
    })
    setWorkers(response.data);
  }

  function handleInputChange(e) {
    setQueryInput(e.target.value);
  }

  function handleQueryInput(e) {
    if ( e.key === 'Enter')
    loadWorkers(queryInput, user_id);
  }

  let formattedCpf = (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');
    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
    return null
  };
  // -----------------------------------------------------------------------------
  return (
   <Container>
      <header>
        <strong>Funcionários</strong>
        <div className='list-header-div'>
          <input placeholder='Busca por Funcionário'
            onChange={handleInputChange} onKeyDown={handleQueryInput}
          />
          <Link className='create-link' to='/workers'>
            <button type="button"><Plus size={11} color='#FFF'/> Cadastrar Funcionário</button>
          </Link>
        </div>
      </header>

      <div className="title-bar">
        <strong className='title-photo-and-name'>Nome</strong>
        <strong>Dept.</strong>
        <strong>Tel.</strong>
        <strong>Tarefas</strong>
      </div>

      <ul className='item-list'>
        {workers.map(w =>
          <Line key={w.id} className='item-list-row'>
            <div className="line-div">
            <div className='photo-and-name-div' title="Clicar para editar funcionário.">
                {
                  w.avatar === null
                    ? <img alt='del_avatar' src={insert}></img>
                    : <img alt='del_avatar' src={w.avatar.url}></img>
                }
                <label className="name-label">{w.name}</label>
            </div>
            {/* <label>
              <a href={`https://api.whatsapp.com/send?phone=55${w.workerphonenumber}`} title={`${w.phonenumber}`} target="_blank" rel="noopener noreferrer" style={{color: 'blue'}}>
                <button className="whatsappbutton" type="button">
                  <img src={whatsapplogo} alt="whatsapplogo" style={{height:16}}/>
                </button>
              </a>
            </label> */}
            <label>{w.dept}</label>
            <label>{formattedCpf(w.phonenumber)}</label>
            <label><Link to={`/dashboard/${w.name}`}>entrar</Link></label>
            </div>
          </Line>
        )}
      </ul>
   </Container>
  );
}


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plus } from 'react-feather'
// -----------------------------------------------------------------------------
import api from '~/services/api';
import { Container, ListDiv, Line } from '~/pages/_layouts/list/styles';
import Searchbar from '../../../utils/Searchbar';
import insert from '~/assets/insert_photo-24px.svg';
// import insert from '~/assets/insert_photo-24px.svg';
// import whatsapplogo from '~/assets/whatsapplogo5.png'
// -----------------------------------------------------------------------------
export default function ListWorkers() {
  const [inputState, setInputState] = useState('');
  const [ workers, setWorkers ] = useState([]);
  const [defaultWorkers, setDefaultWorkers] = useState([]);
  const [ queryInput, setQueryInput ] = useState([]);
  const user_id = useSelector(state => state.user.profile.id);

  useEffect(() => {
    loadWorkers(user_id);
  },[ user_id ]);

  async function loadWorkers(userID) {
    const response = await api.get(`users/${userID}/contact-list`, {
    })
    setWorkers(response.data);
    setDefaultWorkers(response.data);
  }

  const handleUpdateInput = async (input) => {
    const filteredList = defaultWorkers.filter(t => {
      let workerName = t.first_name + t.last_name + t.worker_name
      return workerName.toLowerCase().includes(input.toLowerCase())
    })
    setWorkers(filteredList)
    setInputState(input)
  }

  let formattedPhoneNumber = (str) => {
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
    <div className="container-div">
    <ListDiv>
      <header className="list-header">
        <strong>Funcionários</strong>
        <div className='list-header-div'>
          <Link className='create-link' to='/workers'>
            <button className="task-button search">
              <Plus size={11} color='#FFF'/> Cadastrar Funcionário
            </button>
          </Link>
          <Searchbar className="header-input" input={inputState} onChange={handleUpdateInput}/>
        </div>
      </header>

      <div className="title-bar">
        <strong className='worker-strong'>Nome de usuário</strong>
        <strong className='short-tag'>Nome</strong>
        <strong className='short-tag'>Sobrenome</strong>
        <strong className="short-tag">Dept.</strong>
        <strong className="short-tag">Tel.</strong>
        <strong className="short-tag">Tarefas</strong>
      </div>

      <ul className='item-list'>
        {workers.map(w =>
          <Line key={w.phonenumber} className='item-list-row'>
            <div className="line-div">
            {/* <div className='photo-and-name-div' title="Clicar para editar funcionário."> */}
                {/* {
                  w.avatar_id === null
                    ? <img alt='del_avatar' src={insert}></img>
                    : <img alt='del_avatar' src={w.avatar.url}></img>
                } */}
                <div className="worker-profile-div">
                  <img src={insert} alt="Worker"/>
                  <label className="worker-label">{w.worker_name}</label>
                </div>

            {/* </div> */}
            {/* <label>
              <a href={`https://api.whatsapp.com/send?phone=55${w.phonenumber}`} title={`${w.phonenumber}`} target="_blank" rel="noopener noreferrer" style={{color: 'blue'}}>
                <button className="whatsappbutton" type="button">
                  <img src={whatsapplogo} alt="whatsapplogo" style={{height:16}}/>
                </button>
              </a>
            </label> */}
            <label className="short-label">{w.first_name}</label>
            <label className="short-label">{w.last_name}</label>
            <label className="short-label">{w.department}</label>
            <label className="short-label">{formattedPhoneNumber(w.phonenumber)}</label>
            <label className="short-label"><Link to={`/dashboard/${w.worker_name}`}>entrar</Link></label>
            </div>
          </Line>
        )}
      </ul>
    </ListDiv>
    </div>
   </Container>
  );
}


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plus } from 'react-feather'
// import { BsThreeDots } from 'react-icons/bs';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import Searchbar from '../../../utils/Searchbar';
import Contact from '~/components/Contact'

import { Container, ListDiv } from '~/pages/_layouts/list/styles';
// import whatsapplogo from '~/assets/whatsapplogo5.png'
// -----------------------------------------------------------------------------
export default function ListContacts() {
  const user_id = useSelector(state => state.user.profile.id);

  const [inputState, setInputState] = useState('');
  const [contacts, setContacts] = useState([]);
  const [defaultContacts, setDefaultContacts] = useState([]);

  useEffect(() => {
    loadContacts(user_id);
  },[ user_id ]);

  async function loadContacts(userID) {
    const response = await api.get(`users/${userID}/contact-list`, {
    })

    setContacts(response.data);
    setDefaultContacts(response.data);
  }

  const handleUpdateInput = async (input) => {
    const filteredList = defaultContacts.filter(t => {
      let workerName = t.first_name + t.last_name + t.worker_name
      return workerName.toLowerCase().includes(input.toLowerCase())
    })
    setContacts(filteredList)
    setInputState(input)
  }

  async function handleRemoveContact(phonenumber) {
    await api.put(`/users/${user_id}/remove-contact`, {
      phonenumber: phonenumber,
    })
    loadContacts(user_id);
    // dispatch(updateContacts(new Date()))
  }
  // -----------------------------------------------------------------------------
  return (
   <Container>
    <div className="container-div">
      <ListDiv>
        <header className="list-header">
          <div className="list-header-title-div">
            <strong className="list-header-strong">Funcionários</strong>
          </div>
          <div className='list-header-div'>
            <Link className='create-link' to='/contact-list'>
              <button className="task-button search">
                Cadastrar Funcionário
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
          {/* <strong className="short-tag">Tarefas</strong> */}
          <strong className="short-tag last">Outros</strong>
        </div>
        { contacts && (
          <ul className='item-list'>
          { contacts.map(c =>
            <Contact
              key={c.phonenumber}
              contact={c}
              handleRemoveContact={handleRemoveContact}
              contacts={contacts}
              setContacts={setContacts}
            />
          )}
          </ul>
        )}

      </ListDiv>
    </div>
   </Container>
  );
}


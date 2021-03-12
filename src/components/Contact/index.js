import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import insert from '~/assets/insert_photo-24px.svg';
// import { Line } from './styles';
import { Line } from '~/pages/_layouts/list/styles'
// import whatsapplogo from '~/assets/whatsapplogo5.png'

export default function Contact({ contact, contacts, setContacts }) {
  const user_id = useSelector(state => state.user.profile.id);

  const [toggleOthers, setToggleOthers] = useState();
  const [workerData, setWorkerData] = useState();

  useEffect(() => {
    getPhoto(contact.phonenumber)
  }, [contact.phonenumber])

  async function getPhoto(phonenumber) {
    const worker = await api.get('workers/individual', {
      params: {phonenumber: phonenumber},
    })
    setWorkerData(worker.data)
  }

  async function handleRemoveContact(phonenumber) {
    const response = await api.put(`/users/${user_id}/remove-contact`, {
      phonenumber: phonenumber,
    })
    setContacts(response.data.contact_list);
  }

  let formattedPhoneNumber = (str) => {
    let cleaned = ('' + str).replace(/\D/g, '').slice(2, ); //Filter only numbers from the input
    // console.log(cleaned)
    let match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/); //Check if the input is of correct length
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
  };
  // ---------------------------------------------------------------------------
  return (
    <Line key={contact.phonenumber} className='item-list-row'>
      <div className="line-div">
        <div className='photo-and-name-div' title="Clicar para editar funcionário.">
          <div className="worker-profile-div">
            { workerData === undefined || workerData.avatar === null
              ? <img src={insert} alt="User"/>
              : <img src={workerData.avatar.url} alt="User"/>
            }
            <label className="worker-label">{contact.worker_name}</label>
          </div>
        </div>

        <label className="short-label">{contact.first_name}</label>
        <label className="short-label">{contact.last_name}</label>
        <label className="short-label">{contact.department}</label>
        <label className="short-label">{formattedPhoneNumber(contact.phonenumber)}</label>
        {/* <label className="short-label"><Link to={`/dashboard/${contact.worker_name}`}>entrar</Link></label> */}
        <label className="others-label">
          <div className="others-div">
            <button className="others-button" onClick={() => setToggleOthers(!toggleOthers)}>
              <BsThreeDots size={14}/>
            </button>
            { toggleOthers && (
              <div className="others-menu-div">
                <label className="short-label">
                  <Link to={`/contact-list/update/${contact.worker_name}`}>
                    editar
                  </Link>
                </label>
                <label className="short-label">
                  <button
                    className="others-button"
                    onClick={() => handleRemoveContact(contact.phonenumber)}
                  >
                    remover
                  </button>
                </label>
                {/* <label>
                <a href={`https://api.whatsapp.com/send?phone=55${contact.phonenumber}`} title={`${contact.phonenumber}`} target="_blank" rel="noopener noreferrer" style={{color: 'blue'}}>
                  <button className="whatsappbutton" type="button">
                    <img src={whatsapplogo} alt="whatsapplogo" style={{height:16}}/>
                  </button>
                </a>
                </label> */}
              </div>
            )}
          </div>

        </label>
      </div>

      </Line>
  )
}

import React, { useState, useEffect } from 'react'
import { BsThreeDotsVertical, BsSearch } from 'react-icons/bs'
import { IoReturnDownForward } from 'react-icons/io5'
import { TiCancel } from 'react-icons/ti'
import { RiArrowDownSLine, RiCloseLine } from 'react-icons/ri'
//------------------------------------------------------------------------------
import api from '~/services/api';
import Searchbar from '../../utils/Searchbar';
import { Container} from './styles'
import insert from '~/assets/insert_photo-24px.svg';

function MessageDiv({
  task,
  setTask,
  setForwardValue,
  chatMessage,
  setChatMessage,
  user_name,
  formattedMessageDate,
  messageRef,
  lastMessageRef,
  scrollIntoLastMessage,
  taskMessages,
  setTaskMessages,
}) {
  const [messageDropMenu, setMessageDropMenu] = useState();

  const [toggleDropMenu, setToggleDropMenu] = useState(false);
  const [replyValue, setReplyValue] = useState();
  const [replySender, setReplySender] = useState();
  const [toggleMessageSearch, setToggleMessageSearch] = useState();
  const [inputState, setInputState] = useState('');
  const [ messageArray, setMessageArray] = useState(task);
  const [ defaultMessageArray, setDefaultMessageArray] = useState(task);

  useEffect(() => {
    setDefaultMessageArray(task)
    setMessageArray(task);
    console.log(taskMessages)
  }, [task]);

  const handleUpdateInput = async (input) => {
    console.log(input)
    const filteredList = defaultMessageArray.messages.filter(t => {
      let workerName = t.message
      return workerName.toLowerCase().includes(input.toLowerCase())
    })
    setTaskMessages(filteredList)
    console.log(taskMessages)
    setInputState(input)
  }

  function handleMessageDropMenu(position) {
    console.log(position)
    setMessageDropMenu(position)
    setToggleDropMenu(!toggleDropMenu)

    console.log(messageDropMenu)
    console.log(toggleDropMenu)
  }

  function handleReply(message, sender) {
    setReplyValue(message)
    setReplySender(sender)
    setToggleDropMenu(false)
  }

  function handleForward(message) {
    setForwardValue(message)
    setToggleDropMenu(false)
  }

  async function handleMessageDelete(position) {
    const editedTaskMessages = task.messages;
    editedTaskMessages[position].removed_message = editedTaskMessages[position].message;
    editedTaskMessages[position].message = 'mensagem removida'
    await api.put(`tasks/${task.id}`, {
      messages:  editedTaskMessages
    });
    setTask(task)
    setToggleDropMenu(false)

  }

  async function handleMessageSubmit(e) {
    // if ( e.key === 'Enter' ) {
      e.preventDefault()
      let pushMessage = task.messages
      let formattedTimeStamp = formattedMessageDate(new Date())
      const id = task.id
      if (replyValue) {
        pushMessage.push({
          "message": chatMessage,
          "sender": "user",
          "user_read": false,
          "worker_read": false,
          "timestamp": formattedTimeStamp,
          "reply_message": replyValue,
          "reply_sender": replySender,
          "forward_message": false,
        })
      } else {
        pushMessage.push({
          "message": chatMessage,
          "sender": "user",
          "user_read": false,
          "worker_read": false,
          "timestamp": formattedTimeStamp,
          "reply_message": '',
          "reply_sender": '',
          "forward_message": false,
        })
      }

      await api.put(`tasks/messages/${id}`,
        pushMessage
      );
      setChatMessage(); // adds latest message to chat.
      setReplyValue();
      if(pushMessage.length > 3) scrollIntoLastMessage()
      messageRef.current.value = '';
      messageRef.current.focus()
    // }
  }

  //----------------------------------------------------------------------------
  return (
    <Container>
      <header className='message-header'>
        <strong>Conversa</strong>
        <div className="list-header">
          <div className="worker-profile-div">
            {
              toggleMessageSearch
              ? (
                // <input className="message-search-input"/>
                <Searchbar
                  className="header-input"
                  input={inputState}
                  onChange={handleUpdateInput}
                  placeholder="Palavra-chave"
                />
              )
              :
              (
                <div className="worker-tag">
                  <img src={insert} alt="Worker"/>
                  <label className="worker-profile-label">{task && task.worker.worker_name}</label>
                </div>
              )
            }

          </div>
          <div className="message-menu-div">
            <button className="message-menu-button" onClick={() => setToggleMessageSearch(!toggleMessageSearch)}><BsSearch size={16}/></button>
            <button className="message-menu-button"><BsThreeDotsVertical size={16}/></button>
          </div>
        </div>
      </header>
      <div className="message-conversation-div">

        { task && taskMessages && (taskMessages.map((m, index) => (
          <div className={`message-container-div ${m.sender}`} key={index}>
            { m.sender === 'user'
              ? (
                <div className={`time-message-div ${m.sender}`}>
                  <span className={`message-time-span`}>{m.timestamp}</span>
                  <div className={`message-line-div ${m.sender}`} >
                    { m.reply_message && !m.removed_message
                      ? (
                        <div className="reply-on-top-div">
                          { m.reply_sender === 'worker'
                            ? (
                              <span className="reply-name-span">{task.worker.worker_name}</span>
                            )
                            : (
                              <span className="reply-name-span">{user_name}</span>
                            )
                          }
                          <span className="reply-on-top-span">{m.reply_message}</span>
                        </div>
                      )
                      : null
                    }
                    { m.forward_message && !m.removed_message
                      ? (
                        <div className="forward-on-top-div">
                          <IoReturnDownForward size={18} color={'#999'}/>
                          <span className={`message-span ${m.sender}`}>

                            Mens. encaminhada</span>

                        </div>
                      )
                      : null
                    }
                    { m.removed_message
                      ? (
                        <div className="message-arrow-div removed">
                          <TiCancel size={24} color={'#999'}/>
                          <span
                            className={`message-span ${m.sender}`}
                            style={{color: '#999'}}
                          >{m.message}</span>
                          <RiArrowDownSLine
                            color={'#999'}
                          />
                        </div>
                      )
                      : (
                        <div className="message-arrow-div">
                          <span
                            className={`message-span ${m.sender}`}
                            ref={lastMessageRef}
                          >{m.message}</span>
                          <RiArrowDownSLine
                            onClick={() => handleMessageDropMenu(index)}
                            style={{cursor:'pointer'}}
                          />
                        </div>
                      )
                    }
                  </div>
                </div>
              )
              : (
                <div className={`time-message-div ${m.sender}`}>
                  <div className={`message-line-div ${m.sender}`}>
                    <div className="message-arrow-div">
                      <span className={`message-span ${m.sender}`}>{m.message}</span>
                      <RiArrowDownSLine
                        onClick={() => handleMessageDropMenu(index)}
                        style={{cursor:'pointer'}}
                      />
                    </div>
                  </div>
                  <span className={`message-time-span`}>{m.timestamp}</span>
                </div>
              )
            }
            {/* message buttons */}
            { (messageDropMenu === index) && (toggleDropMenu === true) && (
              <ul classname="message-dropMenu-ul">
                <li className="message-dropMenu-li">
                  <button
                    className="message-dropMenu-button"
                    onClick={() => handleReply(m.message, m.sender)}
                  >Responder</button>
                </li>
                <li className="message-dropMenu-li">
                  <button
                    className="message-dropMenu-button"
                    onClick={() => handleForward(m.message)}
                  >Encaminhar</button>
                </li>
                { m.sender === 'user' && (
                  <li className="message-dropMenu-li">
                    <button
                      className="message-dropMenu-button"
                      onClick={() => handleMessageDelete(index)}
                    >Deletar</button>
                  </li>
                )}
              </ul>
            )}
          </div>
        )))}
      </div>
      <form onSubmit={handleMessageSubmit}>
        {
          replyValue && (
            <div className="temporary-message-container">
            <div className="temporary-message-div">
              {replyValue}
            </div>
            <RiCloseLine
              size={24}
              style={{margin: '4px'}}
              color={'#ccc'}
              cursor='pointer'
              onClick={() => setReplyValue()}
            />
            </div>
          )
        }
        <textarea
          type="text"
          className="message-input"
          ref={messageRef}
          onChange={e => setChatMessage(e.target.value)}
          // onKeyDown={handleMessageSubmit}
        />
        {
          inputState
          ? (
            <button className='message-button' type='submit' disabled={true}>Desabilitado</button>
          )
          : (
            <button className='message-button' type='submit'>Enviar</button>
          )
        }

      </form>
    </Container>
  )
}

export default MessageDiv

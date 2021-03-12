import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { BsThreeDotsVertical, BsSearch } from 'react-icons/bs'
import { IoReturnDownForward } from 'react-icons/io5'
import { TiCancel } from 'react-icons/ti'
import { RiArrowDownSLine, RiCloseLine } from 'react-icons/ri'
import { parseISO } from 'date-fns'

import 'firebase/firestore'
import 'firebase/auth'
//------------------------------------------------------------------------------
import api from '~/services/api';
import Searchbar from '../../utils/Searchbar';
import { MessageDivision } from './styles'
import insert from '~/assets/insert_photo-24px.svg';
import firebase from '~/services/firebase'
import ChatMessage from '~/components/ChatMessage'

function MessageDiv({
  task, setTask,
  setForwardValue,
  chatMessage, setChatMessage,
  user_name,
  formattedMessageDate,
  messageRef,
  scrollIntoLastMessage,
  toggleHeaderDropMenu, setToggleHeaderDropMenu,
  toggleMessageDiv, setToggleMessageDiv,
  // messages, setMessages
}) {
  const [messageDropMenu, setMessageDropMenu] = useState();
  const [toggleDropMenu, setToggleDropMenu] = useState(false);
  const [replyValue, setReplyValue] = useState();
  const [replySender, setReplySender] = useState();
  const [toggleMessageSearch, setToggleMessageSearch] = useState();
  const [workerData, setWorkerData] = useState();
  const [messages, setMessages] = useState();
  const [defaultMessages, setDefaultMessages] = useState();
  const [load, setLoad] = useState();

  const [inputState, setInputState] = useState(); // chat message state stays here in order (instead of MessageDiv) to update new message bell.
  const [resetMessages, setResetMessages] = useState();
  const [messagesTest, setMessagesTest] = useState(task.id);

  const phonenumber = task.worker.phonenumber

  const lastMessageRef = useRef();
  const firestore = firebase.firestore()
  const messagesRef = firestore.collection(`messages/task/${task.id}`)

  useEffect(() => {
    // getPhoto(phonenumber)
    getMessages()
  }, []);

  useMemo(() => {
    // getPhoto(phonenumber)
    getMessages()
  }, [task]);

  // const appendMessages = useCallback((messages) => {
  //   setMessages((previousMessages) => messages.append(previousMessages, messages))
  // }, [messages])

  async function getMessages() {
    // const response = await api.get(`messages/${task.message_id}`)
    // setMessages(response.data.messages)
    // setDefaultMessages(response.data.messages)
    // let messagesArray = []
    const unsubscribe = await firestore.collection(`messages/task/${task.id}`)
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     messagesArray.push(doc.data())
      //  })
        // const messagesFirestore = querySnapshot.docChanges()
        // .filter(({type}) => type === 'added')
        // .map(({doc}) => {
        //   const message = doc.data()

        //   return {...message }

        // })
        // // console.log(messagesFirestore)
        // setMessages(messagesFirestore)
        // console.log(appendMessages(messagesFirestore))
        // appendMessages(messagesFirestore)

        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = querySnapshot.docs.map(doc => ({
              ...doc.data(),
            }));
              setMessages(data)
            // if(messages === undefined) {
            //   setMessages(data)
            // } else if (messages && data[0].id === messages[0].id) {
            //   setMessages(data)
            //   console.log(messages)
            // }
          }
        })
      })
    return unsubscribe;
  }

  async function getPhoto(phonenumber) {
    const worker = await api.get('workers/individual', {
      params: {phonenumber: phonenumber},
    })
    setWorkerData(worker.data)
  }

  function handleMessageDropMenu(position) {
    setMessageDropMenu(position)
    setToggleDropMenu(!toggleDropMenu)
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

  async function handleMessageDelete(id) {
    await api.put(`messages/remove/${task.message_id}`, {
      message_id: id
    });
    setResetMessages(new Date());
    setToggleDropMenu(false)
  }

  async function handleMessageSubmit(e) {
      setLoad(true)
      e.preventDefault()
      let newMessage = null;
      const message_id = Math.floor(Math.random() * 1000000)

      let formattedTimeStamp = formattedMessageDate(new Date())
      if (replyValue) {
        newMessage = {
          id: message_id,
          message: chatMessage,
          sender: "user",
          user_read: true,
          worker_read: false,
          timestamp: formattedTimeStamp,
          reply_message: replyValue,
          reply_sender: replySender,
          forward_message: false,
          visible: true,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }
      } else {
        newMessage = {
          id: message_id,
          message: chatMessage,
          sender: "user",
          user_read: true,
          worker_read: false,
          timestamp: formattedTimeStamp,
          reply_message: '',
          reply_sender: '',
          forward_message: false,
          visible: true,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }
      }

      await api.put(`messages/${task.message_id}`, {
        messages: newMessage,
      });
      // Firebase Messaging ****************************************************
      await messagesRef.add(newMessage)
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.log("Error writing document: ", error);
        });

      await api.put(`tasks/${task.id}`, {
        messaged_at: new Date(),
      })

      setChatMessage(); // adds latest message to chat.
      setReplyValue();
      // setResetMessages(new Date());

      // scroll into view ******************************************************
      // lastMessageRef.current.scrollIntoView(false, { behavior: 'smooth' });

      // if(messages && messages.length > 3) scrollIntoLastMessage()
      messageRef.current.value = '';
      messageRef.current.focus()
      setLoad(false)
    // }
  }

  const handleUpdateInput = async (input) => {
    const filteredList = defaultMessages.filter(t => {
      let messageSearch = t.message
      return messageSearch.toLowerCase().includes(input.toLowerCase())
    });
    setMessages(filteredList);
  }

  async function handleClearMessages() {
    const editedTaskMessages = messages;
    editedTaskMessages.map(e => {
      e.visible = false;
      return e
    })
    await api.put(`messages/update/${task.message_id}`, {
      messages:  editedTaskMessages
    });
    setChatMessage();
    setToggleHeaderDropMenu(false)
  }
  //----------------------------------------------------------------------------
  return (
    <MessageDivision>
      <header className='message-header'>
        <strong className="message-header-strong">Conversa</strong>
        <div className="list-header">
          <div className="worker-profile-div">
            { toggleMessageSearch
              ? (
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
                  { workerData === undefined || workerData.avatar === null
                    ? <img src={insert} alt="Worker"/>
                    : <img src={workerData.avatar.url} alt="Worker"/>
                  }
                  <label className="worker-profile-label">{task && task.worker.worker_name}</label>
                </div>
              )
            }
          </div>
          <div className="message-menu-div">
            <button
              className="message-menu-button"
              onClick={() => setToggleMessageSearch(!toggleMessageSearch)}
            >
              <BsSearch className='message-menu-icon'/>
            </button>
            <div className="others-menu-div">
              <button
                className="message-menu-button"
                onClick={() => setToggleHeaderDropMenu(!toggleHeaderDropMenu)}
              >
                <BsThreeDotsVertical className='message-menu-icon'/>
              </button>
              { toggleHeaderDropMenu
                ? (
                  <ul
                    className="others-drop-menu-ul"
                    // className="message-dropMenu-ul"
                  >
                    <li className="others-drop-menu-li">
                      <button className="others-drop-menu-button"
                        onClick={() => handleClearMessages()}
                      >Limpar a conversa</button>
                    </li>
                  </ul>
                )
                : (
                  null
                )
              }
            </div>
          </div>
        </div>
      </header>
      {/* messages */}
      <div className="message-conversation-div">
        { messages
          ? (messages.map((m, index) => (
            <>
            {/* <ChatMessage
              m={m}
              index={index}
              task={task}
              user_name={user_name}
              handleMessageDropMenu={handleMessageDropMenu}
              lastMessageRef={lastMessageRef}
              toggleDropMenu={toggleDropMenu}
              handleReply={handleReply}
              handleForward={handleForward}
              handleMessageDelete={handleMessageDelete}
              messageDropMenu={messageDropMenu}
            /> */}
                <div key={index}>
      { m.visible === true && (
        <div className={`message-container-div ${m.sender}`}>
          <div className={`time-message-div ${m.sender}`}>
            { m.sender === 'user' && (
              <span className={`message-time-span`}>{m.timestamp}</span>
            )}
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
                        Mens. encaminhada
                      </span>
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
                        // ref={lastMessageRef}
                      >{m.message}</span>
                      <RiArrowDownSLine
                        onClick={() => handleMessageDropMenu(index)}
                        style={{cursor:'pointer'}}
                      />

                    </div>
                  )
                }
              </div>
              { m.sender === 'worker' && (
                <span className={`message-time-span`}>{m.timestamp}</span>
              )}
              <span ref={lastMessageRef}></span>
          </div>

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
                    onClick={() => handleMessageDelete(m.id)}
                  >Deletar</button>
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>

          </>
          )))
          : null
        }
      </div>

      <form onSubmit={handleMessageSubmit}>
        { replyValue && (
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
        )}
        <textarea
          type="text"
          className="message-input"
          ref={messageRef}
          onChange={e => setChatMessage(e.target.value)}
          // onKeyDown={handleMessageSubmit}
        />
        { !chatMessage
          ? (
            null
          )
          : (
            <button
              className='message-button'
              type='submit'
              disabled={load}
            >
              Enviar
            </button>
          )
        }
      </form>
    </MessageDivision>
  )
}

export default MessageDiv

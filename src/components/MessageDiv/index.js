import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux';
import { BsThreeDotsVertical, BsSearch } from 'react-icons/bs'
import { RiCloseLine } from 'react-icons/ri'

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
  task,
  setForwardValue,
  chatMessage, setChatMessage,
  user_name,
  formattedMessageDate,
  messageRef,
  // scrollIntoLastMessage,
  toggleHeaderDropMenu, setToggleHeaderDropMenu,
}) {
  const user = useSelector(state => state.user.profile);

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

  const phonenumber = task.worker.phonenumber

  const lastMessageRef = useRef();
  const firestore = firebase.firestore()
  const messagesRef = firestore.collection(`messages/task/${task.id}`)

  useEffect(() => {
    getPhoto(phonenumber)
    getMessages()
  }, [task]);

  // useMemo(() => {
  //   getPhoto(phonenumber)
  //   getMessages()
  // }, [task]);

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
              setDefaultMessages(data)
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
    // await api.put(`messages/remove/${task.message_id}`, {
    //   message_id: id
    // });

    // Firebase Messaging ****************************************************
    firestore.collection(`messages/task/${task.id}`)
      .doc(`${id}`)
      .update({
        message: "mensagem removida",
        removed_message: true,
      })
      .then(() => {
        console.log("Document successfully removed!");
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      })

    setToggleDropMenu(false)
    getMessages()
  }

  async function handleMessageSubmit(e) {
    try {
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

      // Firebase Messaging ****************************************************
      await messagesRef
        .doc(`${message_id}`)
        .set(newMessage)
        .then(() => {
          console.log("Document successfully written!");

          api.put(`messages/${task.message_id}/user`, {
            messages: newMessage,
            task_id: task.id,
            task_name: task.name,
            user_id: user.id,
            user_name: user.user_name,
          });
        })
        .catch((error) => {
          console.log("Error writing document: ", error);
        });

      await api.put(`tasks/${task.id}`, {
        messaged_at: new Date(),
      })

      setChatMessage(); // adds latest message to chat.
      setReplyValue();

      // scroll into view ******************************************************
      lastMessageRef.current.scrollIntoView(false, { behavior: 'smooth' });

      // if(messages && messages.length > 3) scrollIntoLastMessage()
      messageRef.current.value = '';
      messageRef.current.focus()
      setLoad(false)
    // }
    }
    catch(error) {
      console.log(error)
    }
  }

  function handleToggleMessageSearch() {
    if(toggleMessageSearch) {
      setToggleMessageSearch(false)
      handleUpdateInput('')
    } else {
      setToggleMessageSearch(true)
    }
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
                    ? (
                      <div className="image-background-div">
                        <img src={insert} alt="Worker"/>
                      </div>
                    )
                    : (
                      <div className="image-background-div">
                        <img src={workerData.avatar.url} alt="Worker"/>
                      </div>
                    )
                  }
                  <label className="worker-profile-label">{task && task.worker.worker_name}</label>
                </div>
              )
            }
          </div>
          <div className="message-menu-div">
            <button
              className="message-menu-button"
              // onClick={() => setToggleMessageSearch(!toggleMessageSearch)}
              onClick={() => handleToggleMessageSearch()}
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
            <ChatMessage
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
            />


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

import React from 'react'

import { IoReturnDownForward } from 'react-icons/io5'
import { TiCancel } from 'react-icons/ti'
import { RiArrowDownSLine, RiCloseLine } from 'react-icons/ri'

export default function ChatMessage({
  m, index, task, user_name, handleMessageDropMenu,
  lastMessageRef, toggleDropMenu, handleReply, handleForward,
  handleMessageDelete, messageDropMenu,
}) {
  return (
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
  )
}

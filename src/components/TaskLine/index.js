import React, { useState, useRef, useEffect } from 'react'
import { format, parseISO, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MdNotifications } from 'react-icons/md';
import 'firebase/firestore'
import 'firebase/auth'
// -----------------------------------------------------------------------------
import { Line, Badge } from '~/pages/_layouts/list/styles';
import firebase from '~/services/firebase'

export default function TaskLine({
  handleTaskDetails, handleSelect,
  selectArray, t,
}) {
  const messageInputRef = useRef();

  const [messages, setMessages] = useState();

  useEffect(() => {
    getMessages();
  }, [])

  const formattedDate = fdate =>
  fdate == null
    ? ''
    : format(parseISO(fdate), "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

  const handleStatus = (sub_task_list) => {
    let weigeSum = 0;
    for(let i = 0; i < sub_task_list.length; i++) {
      if(sub_task_list[i].complete === true) {
        weigeSum += (sub_task_list[i].weige_percentage)
      }
    }
    return Math.round(weigeSum)
  }

  const firestore = firebase.firestore()
  const messagesRef = firestore.collection(`messagesTask${t.id}`)

  async function getMessages() {
    const unsubscribe = await messagesRef
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        console.log('Can you hear me?')
        const data = querySnapshot.docs.map(d => ({
          ...d.data(),
        }));
        setMessages(data)
      })
    return unsubscribe;
  }

  const hasUnread = (array) => {
    try {
      let sum = 0;
      for(let i = 0; i < array.length; i++) {
        if(array[i].user_read === false) {
          sum += 1
        }
      }
      return sum
    } catch(error) {
      return
    }

  }
  // ---------------------------------------------------------------------------
  return (
    <Line key={t.id} className='item-list-row'>
      {
        t.end_date || t.canceled_at
        ? (
          <div
            className="line-div canceled" onClick={() => handleTaskDetails(t)}
          >
            <label className="item-label">{t.name}</label>
            <label className="item-label">{t.worker.worker_name}</label>
            {/* Task selects */}
            <label className="short-label">{t.task_attributes[0]}</label>
            <label className="short-label">{t.task_attributes[1]}</label>
            {/* Task Dates */}
            <label className="startdate">{formattedDate(t.start_date)}</label>
            <label className="startdate">{formattedDate(t.due_date)}</label>
            {/* Task Status */}
            <label className="status-label">
              { t.end_date && isBefore(parseISO(t.end_date), parseISO(t.due_date)) &&
                (
                  <label className="duedate red">
                    {`Finalizada ${formattedDate(t.end_date)}`}
                  </label>
                )

              }
              { t.end_date && isBefore(parseISO(t.due_date), parseISO(t.end_date)) &&
                (
                  <label className="duedate green">
                    {`Finalizada ${formattedDate(t.end_date)}`}
                  </label>
                )

              }
              { t.canceled_at && (
                <div>
                  {`Cancelada ${formattedDate(t.canceled_at)}`}
                </div>
              )}
              { !t.end_date && !t.canceled_at && (
                <div className="status-test-div">
                  <div className="status-complete-div">
                    <div
                      className="status-incomplete-div"
                      style={{"width": `${handleStatus(t.sub_task_list)}%`}}
                    ></div>
                  </div>
                  <span className="status-span">
                    {handleStatus(t.sub_task_list)}%
                  </span>
                </div>
              )}
            </label>
            {/* Task Bells */}
            <div className="bell-label">
              { (hasUnread(t.sub_task_list) === 0)
                ? (
                  <Badge
                    style={{visibility: 'hidden'}}
                    value={hasUnread(t.sub_task_list)}
                    ref={messageInputRef}
                  >
                    <MdNotifications color="#ccc" size={28} />
                  </Badge>
                )
                : (
                  <Badge
                    hasUnread={hasUnread(t.sub_task_list)}
                    value={hasUnread(t.sub_task_list)}
                    ref={messageInputRef}
                  >
                    <MdNotifications color="#ccc" size={28} />
                  </Badge>
                )
              }
            </div>
            <div className="bell-label last">
              { (hasUnread(messages) === 0)
              // { !t.score
                ? (
                  <Badge
                    style={{visibility: 'hidden'}}
                    value={hasUnread(t.messages)}
                    ref={messageInputRef}
                  >
                    <MdNotifications color="#ccc" size={28} />
                  </Badge>
                )
                : (
                  <Badge
                    hasUnread={hasUnread(messages)}
                    value={hasUnread(messages)}
                    ref={messageInputRef}
                  >
                    <MdNotifications color="#ccc" size={28} />
                  </Badge>
                )
              }
            </div>
          </div>
        )
        : (
          <div
            className="line-div" onClick={() => handleTaskDetails(t)}
          >
            <label className="item-label">{t.name}</label>
            <label className="item-label">{t.worker.worker_name}</label>
            {/* Task selects */}
            <select
              className={`list-select-${t.task_attributes[0]}`}
              onChange={e => handleSelect(e, t.id, t.task_attributes, 'Prior')}
              value={t.task_attributes[0]}>
              {selectArray.map(s =>
                <option key={s.id} className="list-option" value={s.id}>{s.tag}</option>
              )}
            </select>
            <select
              className={`list-select-${t.task_attributes[1]}`}
              onChange={e => handleSelect(e, t.id, t.task_attributes, 'Urgent')}
              value={t.task_attributes[1]}>
              {selectArray.map(s =>
                <option key={s.id} className="list-option" value={s.id}>{s.tag}</option>
              )}
            </select>
            {/* Task Dates */}
            <label className="startdate">{formattedDate(t.start_date)}</label>
            { isBefore(parseISO(t.due_date), new Date())
              ? <label className="duedate red">{formattedDate(t.due_date)}</label>
              : <label className="duedate green">{formattedDate(t.due_date)}</label>
            }
            {/* Task Status */}
            <label className="status-label">
              { t.end_date && (
                <div>
                  {`Finalizada ${formattedDate(t.end_date)}`}
                </div>
              )}
              { t.canceled_at && (
                <div>
                  {`Cancelada ${formattedDate(t.canceled_at)}`}
                </div>
              )}
              { !t.end_date && !t.canceled_at && (
                <div className="status-test-div">
                  <div className="status-complete-div">
                    <div
                      className="status-incomplete-div"
                      style={{"width": `${handleStatus(t.sub_task_list)}%`}}
                    ></div>
                  </div>
                  <span className="status-span">
                    {handleStatus(t.sub_task_list)}%
                  </span>
                </div>
              )}
            </label>
            {/* Task Bells */}
            <div className="bell-label">
              { (hasUnread(t.sub_task_list) === 0)
                ? (
                  <Badge
                    style={{visibility: 'hidden'}}
                    value={hasUnread(t.sub_task_list)}
                    ref={messageInputRef}
                  >
                    <MdNotifications color="#ccc" size={28} />
                  </Badge>
                )
                : (
                  <Badge
                    hasUnread={hasUnread(t.sub_task_list)}
                    value={hasUnread(t.sub_task_list)}
                    ref={messageInputRef}
                  >
                    <MdNotifications color="#ccc" size={28} />
                  </Badge>
                )
              }
            </div>
            <div className="bell-label last">
              { (hasUnread(messages) === 0)
              // { !t.score
                ? (
                  <Badge
                    style={{visibility: 'hidden'}}
                    // value={hasUnread(t.sub_task_list)}
                    ref={messageInputRef}
                  >
                    <MdNotifications color="#ccc" size={28} />
                  </Badge>
                )
                : (
                  <Badge
                    hasUnread={hasUnread(messages)}
                    value={hasUnread(messages)}
                    ref={messageInputRef}
                  >
                    <MdNotifications color="#ccc" size={28} />
                  </Badge>
                )
              }
            </div>
          </div>
        )
      }
    </Line>
  )
}

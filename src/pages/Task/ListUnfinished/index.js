import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import { Container } from '~/pages/_layouts/list/styles';
import TaskListDiv from '../../../components/TaskListDiv'
import TaskDetailsDiv from '../../../components/TaskDetailsDiv';
import MessageDiv from '../../../components/MessageDiv';
// -----------------------------------------------------------------------------
export default function ListTasksFinished() {
  const user_id = useSelector(state => state.user.profile.id)
  const user_name = useSelector(state => state.user.profile.user_name)
  // task states
  const [tasks, setTasks] = useState([]);
  const [defaultTasks, setDefaultTasks] = useState([]);
  const [task, setTask] = useState(tasks[0]);
  const [chatMessage, setChatMessage] = useState(); // chat message state stays here in order (instead of MessageDiv) to update new message bell.
  // message states
  const [forwardValue, setForwardValue] = useState();

  const messageRef = useRef();
  const lastMessageRef = useRef();

  // var devices = navigator.mediaDevices.getUserMedia({audio:true})
  useEffect(() => {
    load('', user_id);
  }, [user_id]);

  const formattedMessageDate = fdate =>
  fdate == null
    ? ''
    : format(fdate, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

  async function load(workerNameFilter, userID) {
    console.log(userID)
    const response = await api.get(`tasks/user/finished`, {
      params: { workerNameFilter, userID }
    })

    setTasks(response.data);
    setDefaultTasks(response.data)
    setTask(response.data[0])
    // if (!response.data[0].messages) scrollIntoLastMessage() // this seems to fix the scrollIntoView
    // console.log(response.data)
  }

  function scrollIntoLastMessage() { // if there are no messages, scrollIntoView has error.
    return lastMessageRef.current.scrollIntoView(false)
 }

  async function handleTaskDetails(t) {
    let S = t.sub_task_list;
    let editedMessages = t.messages;

    await S.map((s) => {
      if(s.user_read === false) {
        s.user_read = true;
      }
      return s
    })

    await editedMessages.map((m) => {
      if(m.user_read === false) {
        m.user_read = true;
      }
      return m
    })
    if (forwardValue) {
      editedMessages.push({
        "message": forwardValue,
        "sender": "user",
        "user_read": true,
        "worker_read": false,
        "timestamp": formattedMessageDate(new Date()),
        "forward_message": true,S
      })
      setForwardValue();
    }

    await api.put(`tasks/${t.id}`, {
      sub_task_list: S,
      messages: editedMessages,
    })
    setTask(t);
  }

  // -----------------------------------------------------------------------------
  return (
    <Container>
      <div className="container-div left">
        <TaskListDiv
          user_id={user_id}
          load={load}
          tasks={tasks}
          setTasks={setTasks}
          defaultTasks={defaultTasks}
          setTask={setTask}
          handleTaskDetails={handleTaskDetails}
        />
        {/* Task Detail */}
        <TaskDetailsDiv
          task={task}
          load={load}
          user_id={user_id}
        />
      </div>
      {/* Message */}
      <div className="container-div right">
        <MessageDiv
          task={task}
          setTask={setTask}
          setForwardValue={setForwardValue}
          chatMessage={chatMessage}
          setChatMessage={setChatMessage}
          user_name={user_name}
          formattedMessageDate={formattedMessageDate}
          messageRef={messageRef}
          lastMessageRef={lastMessageRef}
          scrollIntoLastMessage={scrollIntoLastMessage}
        />
      </div>
    </Container>
  );
}

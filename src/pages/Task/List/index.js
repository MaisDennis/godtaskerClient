import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import 'firebase/firestore'
// -----------------------------------------------------------------------------
import api from '~/services/api';
import { Container, Footer } from '~/pages/_layouts/list/styles';
import TaskListDiv from '~/components/TaskListDiv'
import TaskDetailsDiv from '~/components/TaskDetailsDiv';
import MessageDiv from '~/components/MessageDiv';
import firebase from '~/services/firebase'

// -----------------------------------------------------------------------------
export default function ListTasks() {
  const user_id = useSelector(state => state.user.profile.id)
  const user_name = useSelector(state => state.user.profile.user_name)
  const update_tasks = useSelector(state => state.task.tasks)
  // task states
  const [tasks, setTasks] = useState([]);
  const [defaultTasks, setDefaultTasks] = useState([]);
  const [toggleHeaderDropMenu, setToggleHeaderDropMenu] = useState();

  const [task, setTask] = useState();
  const [ toggleMessageDiv, setToggleMessageDiv] = useState();

  // message states
  const [forwardValue, setForwardValue] = useState();
  const [chatMessage, setChatMessage] = useState();
  const [selectedTaskId, setSelectedTaskId] = useState();

  const [listState, setListState] = useState(1);

  const messageRef = useRef();

  // var devices = navigator.mediaDevices.getUserMedia({audio:true})
  useEffect(() => {
    load('', user_id, 1);
    // getMessages()

  }, [update_tasks]);
  // console.log(task)
  const formattedMessageDate = fdate =>
  fdate == null
    ? ''
    : format(fdate, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

  let response = null

  // const [messages, setMessages] = useState();



  async function load(workerNameFilter, userID, listState) {
    switch(listState) {
      case(1):
        response = await api.get(`tasks/user/unfinished`, {
          params: { workerNameFilter, userID }
        })
        setTasks(response.data); setDefaultTasks(response.data);
        setTask(response.data[0]); setSelectedTaskId(response.data[0] && response.data[0].id);
        // if(response.data[0]) {
        // setTaskMessages(response.data[0].messages.filter(m => m.visible === true));
        // setDefaultTaskMessages(response.data[0].messages.filter(m => m.visible === true));
        // }
        break
      case(2):
        response = await api.get(`tasks/user/finished`, {
          params: { workerNameFilter, userID }
        })
        setTasks(response.data); setDefaultTasks(response.data);
        setTask(response.data[0]); setSelectedTaskId(response.data[0] && response.data[0].id);
        // if(response.data[0]) {
          // setTaskMessages(response.data[0].messages.filter(m => m.visible === true));
          // setDefaultTaskMessages(response.data[0].messages.filter(m => m.visible === true));
        // }
        break
      case(3):
        response = await api.get(`tasks/user/canceled`, {
          params: { workerNameFilter, userID }
        })
        setTasks(response.data); setDefaultTasks(response.data);
        setTask(response.data[0]); setSelectedTaskId(response.data[0] && response.data[0].id);
        // if(response.data[0]) {
          // setTaskMessages(response.data[0].messages.filter(m => m.visible === true));
          // setDefaultTaskMessages(response.data[0].messages.filter(m => m.visible === true));
        // }
        break
      case(4):
        response = await api.get(`tasks`, {
          params: { workerNameFilter, userID }
        })
        setTasks(response.data); setDefaultTasks(response.data);
        setTask(response.data[0]); setSelectedTaskId(response.data[0] && response.data[0].id);
        // if(response.data[0]) {
          // setTaskMessages(response.data[0].messages.filter(m => m.visible === true));
          // setDefaultTaskMessages(response.data[0].messages.filter(m => m.visible === true));
        // }
        break
      default:
        response = await api.get(`tasks/user/unfinished`, {
          params: { workerNameFilter, userID }
        })
        setTasks(response.data); setDefaultTasks(response.data);
        setTask(response.data[0]);

        // if(response.data[0]) {
          // setTaskMessages(response.data[0].messages.filter(m => m.visible === true));
          // setDefaultTaskMessages(response.data[0].messages.filter(m => m.visible === true));
        // }
    }
  }

  // function scrollIntoLastMessage() { // if there are no messages, scrollIntoView has error.
  //   try {
  //     return lastMessageRef.current.scrollIntoView(false, { behavior: 'smooth'})
  //   }
  //   catch(error) {
  //     return
  //   }
  // }

  // function handleTest(t) {
  //   setToggleMessageDiv(t)
  //   setTask(t);
  // }

  const firestore = firebase.firestore()

  async function handleTaskDetails(t) {
    setSelectedTaskId(t.id)
    let editedSubTaskList = t.sub_task_list;

    const response = await api.get(`messages/${t.message_id}`)
    let editedMessages = response.data.messages;

    if (forwardValue) {
      // editedMessages.push({
      //   "message": forwardValue,
      //   "sender": "user",
      //   "user_read": true,
      //   "worker_read": false,
      //   "timestamp": formattedMessageDate(new Date()),
      //   "forward_message": true,
      // })

      const message_id = Math.floor(Math.random() * 1000000)

      await firestore.collection(`messages/task/${t.id}`).add({
        id: message_id,
        message: forwardValue,
        sender: "user",
        user_read: true,
        worker_read: false,
        timestamp: formattedMessageDate(new Date()),
        forward_message: true,
        visible: true,
      createdAt: new Date(),
      })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.log("Error writing document: ", error);
        });

        setForwardValue();
    }

    if (editedSubTaskList) {
      await editedSubTaskList.map((s) => {
        if(s.user_read === false) {
          s.user_read = true;
        }
        return s
      })
    }

    if (editedMessages) {
      await editedMessages.map((m) => {
        if(m.user_read === false) {
          m.user_read = true;
        }
        return m
      })
    }
    await api.put(`tasks/${t.id}`, {
      sub_task_list: editedSubTaskList,
    })

    // await api.put(`messages/update/${t.message_id}`, {
    //   messages: editedMessages,
    // })

    firestore.collection(`messages/task/${t.id}`)
    .orderBy('createdAt')
    .get().then(resp => {
      // console.log(resp.docs)
      resp.forEach(doc => {
        doc.ref.update({user_read: true})
        // console.log(doc.ref)
      })
    })

    setTask(t);
  }
  // -----------------------------------------------------------------------------
  return (
    <>
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
            // handleTest={handleTest}
            listState={listState}
            setListState={setListState}
            task={task}
            selectedTaskId={selectedTaskId}
          />

          { task && (
            <TaskDetailsDiv
              task={task}
              load={load}
              user_id={user_id}
              listState={listState}
            />
          )}
        </div>
        <div className="container-div right">
          { task && (
            <MessageDiv
              task={task}
              setForwardValue={setForwardValue}
              chatMessage={chatMessage}
              setChatMessage={setChatMessage}
              user_name={user_name}
              formattedMessageDate={formattedMessageDate}
              messageRef={messageRef}
              // lastMessageRef={lastMessageRef}
              // scrollIntoLastMessage={scrollIntoLastMessage}
              toggleHeaderDropMenu={toggleHeaderDropMenu}
              setToggleHeaderDropMenu={setToggleHeaderDropMenu}
            />
          )}
        </div>
      </Container>

    </>
  );
}

    // if(listState === 1) {
    //   response = await api.get(`tasks/user/unfinished`, {
    //     params: { workerNameFilter, userID }
    //   })
    //   setTasks(response.data); setDefaultTasks(response.data); setTask(response.data[0]);
    //   if(response.data[0]) setTaskMessages(response.data[0].messages.filter(m => m.visible === true));
    // }
    // if(listState === 2) {
    //   response = await api.get(`tasks/user/finished`, {
    //     params: { workerNameFilter, userID }
    //   })
    //   setTasks(response.data); setDefaultTasks(response.data); setTask(response.data[0]);
    //   if(response.data[0]) setTaskMessages(response.data[0].messages.filter(m => m.visible === true));
    // }
    // if(listState === 3) {
    //   response = await api.get(`tasks/user/canceled`, {
    //     params: { workerNameFilter, userID }
    //   })
    //   setTasks(response.data); setDefaultTasks(response.data); setTask(response.data[0]);
    //   if(response.data[0]) setTaskMessages(response.data[0].messages.filter(m => m.visible === true));
    // }
    // if(listState === 4) {
    //   response = await api.get(`tasks`, {
    //     params: { workerNameFilter, userID }
    //   })
    //   setTasks(response.data); setDefaultTasks(response.data); setTask(response.data[0]);
    //   if(response.data[0]) setTaskMessages(response.data[0].messages.filter(m => m.visible === true));
    // }

    // if (response.data && !response.data[0].messages) scrollIntoLastMessage() // this seems to fix the scrollIntoView
    // if (response.data[0].messages.length > 3) scrollIntoLastMessage()
    // console.log(response.data)

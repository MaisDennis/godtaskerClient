import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
//------------------------------------------------------------------------------
import { Container} from './styles'
import api from '~/services/api';

function TaskDetailsDiv({ task, load, user_id }) {
  const [ toggleEvaluate, setToggleEvaluate ] = useState();
  const [ scoreValue, setScoreValue] = useState();
  const { register, handleSubmit } = useForm();

  async function handleRemoveTask(task) {
    await api.delete(`tasks/${task.id}`);
    load('', user_id, 1);
  }

  function handleEvaluateTask() {
    setToggleEvaluate(!toggleEvaluate)
    setScoreValue(task.score || null)
    console.log(toggleEvaluate)
  }

  const onSubmit = ({ score }) => {
    api.put(`tasks/${task.id}`, {
      score: score,
    })
    // console.log(task.id)
    // console.log(score)
  }
  //----------------------------------------------------------------------------
  return (
    <Container>
      <div className="task-details-div">
        <strong className="task-details-strong">Detalhes da tarefa: {task && task.name}</strong>
        <label className="task-details-label">Descrição</label>
        <div className="task-details-description-div">{task && task.description}</div>
        <div className="sub-tasks-div">
          <label className="task-details-label">Sub-tarefas</label>
          <div className="sub-tasks-list-div">
            { task
              ? ( task.sub_task_list.map((s, index) => (
                <div className="sub-tasks-checkbox-div" key={index}>
                  <label className="sub-tasks-checkbox-label" key={s.description}>
                    <input className="sub-tasks-checkbox-input" type="checkbox" defaultChecked={s.complete}/>
                    <span className="sub-tasks-checkbox-span">{s.description}</span>
                  </label>
                  <span className="#">Peso:
                    { s.weige_percentage
                        ? ` ${JSON.stringify(s.weige_percentage).replace(".",",")}%`
                        : ' n/a'
                    }
                  </span>
                </div>
              )))
              : null
            }
          </div>
          { toggleEvaluate && (
            <form className="task-score-div" onSubmit={handleSubmit(onSubmit)}>
              <strong className="task-details-strong">Avaliação</strong>
              <label className="task-details-label">Comentário</label>
              <textarea
                className="task-details-comment-input"
                name="score-comment"
                type="text"
                ref={register}
              />
              {/* <div className="score-div"> */}
                <label className="task-details-label">{'Nota (0-10):'}</label>
                <div className="score-date-div">
                  <input
                    className="task-details-score-input"
                    name="score"
                    type="number"
                    min="0"
                    max="10"
                    value={scoreValue}
                    onChange={e => setScoreValue(e.target.value)}
                    ref={register}
                  />
                  {
                    scoreValue
                    ? (
                      <div>Avaliada 14/dez/2020 14:00</div>
                    )
                    : null
                  }

                </div>
              {/* </div> */}
              <button className="task-button send-score">Enviar</button>
            </form>
          )}
        </div>
        <div className="sub-tasks-buttons-div">
          <Link className='create-link' to={task && (`/tasks/update/${task.id}`)}>
            <button className="task-button edit">Editar</button>
          </Link>
          <button className="task-button remove" onClick={() => handleRemoveTask(task)}>Cancelar</button>
          <button className="task-button score" onClick={() => handleEvaluateTask(task)}>Avaliar</button>
        </div>
      </div>
    </Container>
  )
}

export default TaskDetailsDiv

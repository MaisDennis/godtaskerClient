import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { HiEmojiHappy } from 'react-icons/hi';
//------------------------------------------------------------------------------
import { DetailsDiv } from './styles'
import api from '~/services/api';

function TaskDetailsDiv({ task, load, user_id, listState }) {
  const [ toggleEvaluate, setToggleEvaluate ] = useState();
  const [ scoreValue, setScoreValue] = useState();
  const { register, handleSubmit } = useForm();
  // console.log(task)

  async function handleCancelTask(task) {
    try {
      await api.put(`tasks/${task.id}/cancel`, {
        status: {
          status: 4,
          comment: `Canceled on ${new Date()}`,
        },
      });
      load('', user_id, 1);
    }
    catch(error) {
    }
  }

  async function handleReviveTask(task) {
    await api.put(`tasks/${task.id}`, {
      initiated_at: null,
      canceled_at: null,
      status: {
        status: 1,
        comment: `Restored on ${new Date()}`,
      },
    });
    load('', user_id, 3);
  }

  async function handleDestroyTask() {
    await api.delete(`tasks/${task.id}`);
    load('', user_id, 3);
  }

  function handleEvaluateTask() {
    setToggleEvaluate(!toggleEvaluate)
    setScoreValue(task.score || null)
    // console.log(toggleEvaluate)
  }

  const onSubmit = ({ score }) => {
    api.put(`tasks/${task.id}`, {
      score: score,
    })
  }
  //----------------------------------------------------------------------------
  return (
    <DetailsDiv>
      <header className="details-header-div">
        <strong className="details-title-strong">Detalhes da tarefa: {task && task.name}</strong>
      </header>
      <div className="details-body">
        <strong className="details-strong">Descrição</strong>
        <div className="details-description-div">
          {task && task.description}
        </div>
        <div className="sub-tasks-div">
          <strong className="details-strong">Sub-tarefas</strong>
          <div className="sub-tasks-list-div">
            { task
              ? ( task.sub_task_list.map((s, index) => (
                <div className="sub-tasks-checkbox-div" key={index}>
                  <label className="sub-tasks-checkbox-label" key={s.description}>
                    <input
                      className="sub-tasks-checkbox-input"
                      type="checkbox"
                      // defaultChecked={s.complete}
                      checked={s.complete}
                      disabled={true}
                    />
                    <span className="sub-tasks-checkbox-span">{s.description}</span>
                  </label>
                  <span className="sub-task-checkbox-weige-span">Peso:
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
          <div className="sub-tasks-div">
            <strong className="details-strong">Confirmação com foto?</strong>
            { task.confirm_photo
              ? <div className="details-description-div">Sim</div>
              : <div className="details-description-div">Não</div>
            }
          </div>
          { toggleEvaluate && (
            <form className="score-div" onSubmit={handleSubmit(onSubmit)}>
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
                    className="score-input"
                    name="score"
                    type="number"
                    min="0"
                    max="10"
                    value={scoreValue}
                    onChange={e => setScoreValue(e.target.value)}
                    ref={register}
                  />
                  { scoreValue
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
          { task.signature &&
            <div className="task-details-img-div">
              <strong className="details-strong">Foto de confirmação</strong>
              <img
                className="task-details-img"
                src={task.signature.url}
                alt="confirm-img"
              />

            </div>
          }
        </div>
        {listState === 1 && (
          <div className="sub-tasks-buttons-div">
            <Link className='create-link' to={task && (`/tasks/update/${task.id}`)}>
              <button className="task-button blue">Editar</button>
            </Link>
            <button className="task-button grey" onClick={() => handleCancelTask(task)}>Cancelar</button>
          </div>
        )}
        {listState === 2 && (
          <div className="sub-tasks-buttons-div">
              <button className="task-button blue" onClick={() => handleEvaluateTask(task)}>Avaliar</button>
              <button className="task-button grey" onClick={() => handleDestroyTask(task)}>Deletar</button>
          </div>
        )}
        {listState === 3 && (
          <div className="sub-tasks-buttons-div">
            <button className="task-button blue" onClick={() => handleReviveTask(task)}>Recuperar</button>
            <button className="task-button grey" onClick={() => handleDestroyTask(task)}>Deletar</button>
          </div>
        )}
        {listState === 4 && (
          <div className="sub-tasks-buttons-div">
            <HiEmojiHappy size={24} color={'#ccc'}/>
          </div>
        )}
      </div>
    </DetailsDiv>
  )
}

export default TaskDetailsDiv

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Rewind } from 'react-feather'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// -----------------------------------------------------------------------------
import { Container, Line } from './styles';
import api from '~/services/api';
// -----------------------------------------------------------------------------
export default function DetailTask({ match }) {
  const [ task, setTask ] = useState([]);
  const [ message, setMessage ] = useState([]);
  const { id } = match.params
  const formattedDate = fdate => fdate == null ? '' : format(parseISO(fdate), "dd'/'MM'/'yyyy", { locale: pt });

  useEffect(() => {
    load(id);
  }, [ id ])

  async function load( taskID ) {
    const response = await api.get(`tasks/${ taskID }/t_detail`)
    setTask(response.data);

    const messageResponse = await api.get(`/messages/web/task`, {
      params: { taskID },
    })
    setMessage(messageResponse.data)
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // console.log(data.inputScore)
    if (task.end_date) {
      api.put(`tasks/${id}/t_detail`, { score: data.inputScore })
      load(id)
    } else {
      toast.error('A tarefa tem que estar finalizada para receber a nota.');
    }
  }

  // -----------------------------------------------------------------------------
  return (
    <Container>
      {task.map(t =>
        <main key={t.id}>
          <header>
            <strong>Detalhes</strong>
            <div>
            <input name="filter" placeholder='Busca por tarefas'/>
            <div>
              <Link to='/'>
                <button className="back" type="button"><Rewind size={11} color='#FFF' /> Voltar</button>
              </Link>

            </div>
          </div>
          </header>
          <section>
            <div className="block">
              <div className="row">
                <div className="tag">
                  <label>Funcionário:</label>
                  <span>{t.worker.name}</span>
                </div>
              </div>
              <div className="row">
                <div className="tag">
                  <label>Dept.:</label>
                  <span>Tesouraria</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="block">
              <div className="row">
                <div className="tag">
                  <label>Tarefa</label>
                  <span>{t.name}</span>
                </div>
              </div>

              <div className="row">
                <div className="tag">
                  <label>Descrição</label>
                  <textbox>{t.description}</textbox>
                </div>
              </div>
            </div>
          </section>

          <section>

            <div className="block">
              <div className="row">
                <div className="tag">
                  <label>Início:</label>
                  <span>{formattedDate(t.start_date)}</span>
                </div>
                <div className="tag">
                  <label>Prazo:</label>
                  <span>{formattedDate(t.due_date)}</span>
                </div>
              </div>
              <div className="row">
                <div className="tag">
                  <label>Dias até o prazo:</label>
                  <span>23</span>
                </div>
                <div className="tag">
                  <label>Data de Entrega:</label>
                  <span className="status">{formattedDate(t.end_date)}</span>
                </div>
                <div className="tag">
                  <label>Pontualidade:</label>
                  <span>OK</span>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="tag">
                    <label>Nota:</label>
                      <input className="inputScore" name="inputScore" type="integer" placeholder="0-10" ref={register}/>
                  </div>
                  <div className="tag">
                    <label>Confirmar:</label>
                    <button className="buttonScore" type="submit">OK</button>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="tag">
                  <label>Nota Final:</label>
                  <span>{t.score}</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="block">
                <div className="row">
                  <div className="tag">
                    <label> Mensagens</label>
                    <ul>
                      {message.map(m =>
                        <>
                          <Line key={m.id}>
                            <div className="messageContent">
                              <strong className="workerName">{t.worker.name}:</strong>
                              <p className="workerMessage">{m.message_worker}</p>
                            </div>
                            <div className="dateTime">
                              <p className="spanDate">25/05/2020 14:32</p>
                            </div>
                          </Line>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
          </section>
        </main>
      )}
   </Container>
  );
}

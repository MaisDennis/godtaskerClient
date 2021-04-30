import React from 'react';
import { Container } from './styles';
// -----------------------------------------------------------------------------
export default function Tutorial() {

  // -----------------------------------------------------------------------------
  return (
    <Container>
      <strong>Hello Tutorial</strong>
      <span>Passo 1: Criar um funcionário.</span>
      <ol>
        <li>No Menu, clicar em "Funcionário".</li>
        <li>Clicar no botão "Cadastrar".</li>
        <li>Preencher todos os campos.</li>
        <li>Clicar no botão "Salvar".</li>
        <li>Para certificar que o funcionário foi criado, vide a mensagem de aviso em verde no canto superior:
          "Funcionário cadastrado com sucesso!". O funcionário já deve aparecer na lista de funcionários.</li>
      </ol>
      <br/>
      <span>Passo 2: Criar uma tarefa para o funcionário.</span>
      <ol>
        <li>No Menu, clicar em "Tarefas".</li>
        <li>Clicar no botão "Nova Tarefa".</li>
        <li>Preencher todos os campos.</li>
        <li>Preencher se a confirmação da tarefa requer uma foto de comprovação.</li>
        <li>O nome do(s) funcionário(s) deverá(ão) aparecer em baixo antes do botão "Salvar".</li>
        <li>Clicar no botão "Salvar"</li>
        <li>Para certificar que a tarefa foi criada, vide a mensagem de aviso em verde no canto superior: "Tarefa
          cadastrada com sucesso!". A tarefa já deve aparecer na lista de tarefas.</li>
      </ol>
      <br/>
      <span>Passo 3: O funcionário recebe a tarefa.</span>
      <ol>
        <li>O funcionário irá receber a tarefa delegada no celular pelo aplicativo Godtasker.</li>
        <li>Para isso, o funcionário deve baixar o aplicativo através do Google Play Store em
          dispositivos Android, ou Apple Store em dispositivos Apple.</li>
        <li>Ao entrar com usuário e senha no aplicativo, aparecem as tarefas designada, com o nome, descrição, início e prazo.</li>
        <li>O funcionário tem 2 botões disponíveis:</li>
        <ol>
          <li>Para confirmar a conclusão de uma tarefa.</li>
          <li>Para envio de uma mensagem pelo chat, caso haja alguma dúvida com a tarefa em questão.</li>
        </ol>
      </ol>
        <br/>
      <span>Passo 4: Listas de tarefas, funcionários e mensagens. Notificações.</span>
      <ol>
        <li>Ao clicar nas opções na barra de menu, aparecem a lista do respectivo item.</li>
        <li>Na lista de tarefas e funcionários, é possível usar a caixa de pesquisa para filtrar a linha por nome de funcionário.</li>
        <li>Na lista de funcionários, ao clicar e; "..." na linha de cada funcionário, é possível
          editar ou remover os dados.</li>
        <li>Os sinos de notificações na lina de cada tarefa alertam alterações/novidades e novas mensagens.</li>
      </ol>
      <br/>
      <span>Passo 5: Detalhes da tarefa e chat.</span>
      <ol>
        <li>Na lista de tarefas, os quadrantes restantes indicam os detalhes da tarefa e o chat.</li>
        <li>Para editar a tarefa, clicar no botão "editar" e entrar na página de edição.</li>
        <li>É possível avaliar o desmpenho ao clicar no botão "Avaliar", após a entrega da tarefa pelo funcionário. A avaliação fica
          disponível apenas para o administrador.</li>
          <li>O chat permite enviar mensagem, responder, encaminhar e remover mensagens.</li>
          <li>Há uma caixa de "Procura" por palavra-chave.</li>
      </ol>

    </Container>


  );
}

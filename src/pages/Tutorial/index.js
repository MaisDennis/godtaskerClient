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
        <li>Preencher os campos "Nome, e Número de celular".</li>
        <li>Clicar no botão "Salvar".</li>
        <li>Para certificar que o funcionário foi criado, vide a mensagem de aviso em verde no canto superior:
          "Funcionário cadastrado com sucesso!". O funcionário já deve aparecer na lista de funcionários.</li>
      </ol>
      <br/>
      <span>Passo 2: Criar uma tarefa para o funcionário.</span>
      <ol>
        <li>No Menu, clicar em "Tarefas".</li>
        <li>Clicar no botão "Cadastrar".</li>
        <li>O nome do funcionário deverá aparecer como opção na caixa "Funcionário".</li>
        <li>Preencher os campos "Nome, Descrição, Data de início e Data de entrega (Prazo)".</li>
        <li>Clicar no botão "Salvar"</li>
        <li>Para certificar que a tarefa foi criada, vide a mensagem de aviso em verde no canto superior: "Tarefa
          cadastrada com sucesso!". A tarefa já deve aparecer na lista de tarefas.</li>
      </ol>
      <br/>
      <span>Passo 3: O funcionário recebe a tarefa.</span>
      <ol>
        <li>O funcionário irá receber a tarefa delegada no celular pelo aplicativo Godtasker.</li>
        <li>Para isso, o funcionário deve baixar o aplicativo através do Google Play Store em
          dispositivos Android, ou pelo Apple Store em dispositivos Apple.</li>
        <li>Ao entrar com usuário e senha no aplicativo, aparecem as tarefas designada, com o nome, descrição, início e prazo.</li>
        <li>O funcionário tem 2 botões disponíveis:</li>
        <ol>
          <li>Para confirmar a conclusão de uma tarefa com o envio de uma foto de comprovação.</li>
          <li>Para envio de uma mensagem de notificação, caso haja algum problema com a tarefa em questão.</li>
        </ol>
      </ol>
        <br/>
      <span>Passo 4: Listas de tarefas, funcionários e mensagens. Notificações.</span>
      <ol>
        <li>Ao clicar nas opções na barra de menu, aparecem a lista do respectivo item.</li>
        <li>Na lista de tarefas e funcionários, é possível usar a caixa de pesquisa para filtrar a linha por nome de funcionário.</li>
        <li>Na lista de funcionários, ao clicar no link "entrar" na linha de cada funcionário, é possível
          entrar na lista de tarefas delegadas a ele.</li>
        <li>O sino de notificações no "Menu" alertam as novas mensagens e tarefas confirmadas.</li>
      </ol>
      <br/>
      <span>Passo 5: Detalhes da tarefa e avaliação.</span>
      <ol>
        <li>Na lista de tarefas, ao clicar no link "detalhes" na linha de cada tarefa, será encaminhado para
          uma página contendo os detalhes da tarefa.</li>
        <li>Nessa página, é possível avaliar o desmpenho, após a entrega da tarefa pelo funcionário. A avaliação fica
          disponível apenas para o administrador.</li>
      </ol>

    </Container>


  );
}

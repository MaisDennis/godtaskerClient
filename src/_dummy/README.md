# gerenteDash Front-end || 01 de abril, 2020

##  1.  Conceitos abordados

##  2.  Descrição do projeto

##  3.  Iniciando o projeto

##  4.  Color palette
        1.  #444444
        2.  #5edc1f green apple
        3.  #F5F5F5
        3.  #fff
        4.  #fff44f yellow cattleya
        5.  #ffdd33 yellow Bell Pepper
        6.  #ff0f0f red alert
        7.  #f64C75
        8.  #009966
        9.  #80c4a9
        10. #bb9a39 gold taffeta
        11. #25415d
        12. #c8c2c0 white flag
        13. #dbd5d1 white castle
        14. #3b3f42 former background
        15. #58595B detective
        16: #ff6e3a orange burst
        17: #beef69 green cow
        18: #daf1e0 green brocade
        19: #ed7777 red chalk

##  4.  Criando o Projeto

1.  Criando o projeto do zero.
    1.  yarn create react-app modulo05
    2.  cd modulo05 -> code .
    3.  .editorconfig
    4.  yarn add eslint -D
    5.  yarn eslint --init
    6.  yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
    7.  configurar .eslintrc.js
    8.  Criar .prettierrc

2.  Ajustes na API
    1.  yarn add cors no back-end.
    2.  src/app.js
        1.  import cors from 'cors';
        2.  adicione cors no middlewares.
            1.  this.server.use(cors());

3.  Configurando Rotas
    1.  yarn add react-router-dom
    2.  Criar as pastas src/pages e src/routes/index.js e src/services/history.js
    3.  Criar pages/Dashboard/index.js, Profile/index.js, SignIn/index.js e SignUp/index.js
    4.  routes/index.js
    5.  src/App.js
    6.  yarn add history
    7.  src/services/history.js

4.  Configurando Reactotron
    1.  yarn add reactotron-react-js
    2.  Criar src/config/ReactotronConfig.js
    3.  src/App.js -> import './config/ReactotronConfig';

5.  Rotas privadas
    1.  pages/SignIn/index.js
    2.  Criar routes/Route.js -> import { Route, Redirect } from 'react-router-dom';
    3.  add isPrivate para Dashboard e Profile
    4.  yarn add prop-types
    5.  Teste -> acesar Dashboard e Profile e será redirecionado ao Login.

6.  Layouts por página.
    1.  Criar a pasta pages/_layouts
        1.  Criar auth/index.js
        2.  Criar default/index.js
        3.  Criar auth/styles.js
    2.  yarn add styled-components
    3.  Copiar auth/index.js e trocar por DefaultLayout.
    4.  Criar default/styles.js

7.  Estilos globais
    1.  Criar src/styles/global.js
        1.  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
    2.  src/App.js
        1.  import GlobalStyle from './styles/global'; -> GlobalStyle />

8.  Utilizando Root Import
    1.  Troca de ../ por ~/
    2.  yarn add customize-cra react-app-rewired -D
    3.  Criar modulo09/config-overrides.js
    4.  yarn add babel-plugin-root-import -D
    5.  package.js
        1.  Trocar "scripts" -> react-scripts por react-app-rewired
    6.  yarn add eslint-import-resolver-babel-plugin-root-import -D
    7.  Criar o arquivo /jsconfig.json

9.  Estilização da autenticação
    1.  pages/SignIn/index.js
    2.  pages/auth/index.js
    3.  yarn add polished
    4.  auth/styles.js

10. Utilizando Unform
    1.  por padrão teria que criar um estado para form, input para guardar as informações delas, submit p/API etc.
    2.  yarn add @rocketseat/unform
    3.  SignIn/index.js -> import { Form, Input} from '@rocketseat/unform'; -> Trocar form e input por Form e Input.
        1.  Form onSubmit={handleSubmit}>
        2.  Incluir function handleSubmit
        3.  Teste: vide Reactotron: dados inputs.
        4.  	1. Replicar para SignUp.

11. Validações
    1.  yarn add yup
    2.  SignIn/index.js -> import * as Yup from 'yup';
    3.  const schema = Yup.object().shape({
    4.  Form schema={schema} onSubmit={handleSubmit}>
    5.  SignUp/index.js -> Replicar yup.

12. Configurando **store**
    1.  Autenticação, informação do usuario logado vão ser guardados no redux.
    2.  Criar a pasta src/store
    3.  yarn add redux redux-saga react-redux reactotron-redux reactotron-redux-saga immer
    4.  Criar :
          1. store/index.js
          2. store/modules/auth/reducer.js
          3. store/modules/auth/actions.js
          4. store/modules/auth/sagas.js
          5. store/modules/rootReducer.js
          6. store/modules/rootSaga.js
          7. store/createStore.js
    5.  src/config/ReactotronConfig.js -> import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
    6.  src/App.js -> import { Provider } from 'react-redux'; -> wrap Provider>

13. Autenticação
    1.  modules/auth/actions.js
    2.  store/modules/auth/sagas.js
    3.  **Requisições API**
        1.  yarn add axios
        2.  Criar src/services/api.js
    4.  modules/auth/sagas.js
        1.  export function* signIn(payload) {
              const { email, password } = payload;
              const response = yield call(api.post, 'sessions', {
                email,
                password
              });
    5.  pages/SignIn/index.js
        1.  import {useDispatch} from 'react-redux'; -> import { signInRequest } from '~/store/modules/auth/actions';
        2.  const dispatch = useDispatch();
        3.  function handleSubmit({email, password}) {
              dispatch(signInRequest(email, password));
            }
        4.  modules/auth/reducer.js

14. Amrazenando o perfil (p/ fazer update)
    1.  Criar store/modules/user/actions.js
    2.  Criar store/modules/user/reducer.js
    3.  Criar store/modules/user/sagas.js
    4.  modules/rootReducer.js
    5.  modules/rootSaga.js
    6.  teste: Login -> criar state 'user' no Reactotron.

15. Persistindo a autenticação
    1.  yarn add redux-persist
    2.  redux-persist tem varias integrações
      	1. Ex. localstorage, async storage (react native),
    3.  Criar src/store/persistReducers.js
    4.  store/index.js
    5.  src/App.js -> acrescentar persistor.
    6.  routes/Route.js
    7.  Deletar persist:
        1. Inspecionar -> Application -> Local Storage -> persist/Key/root -> delete.

16. Loading de autenticação
    1.  modules/auth/reducer.js
        1.  incluir cases e loading.
        2.  tirar o return para switch. incluir {} e break em cada case.
        3.  src/pages/SIgnIn/index.js
            1.  import {useDispatch, useSelector } from 'react-redux';
            2.  const loading=useSelector(state => state.auth.loading);
            3.  button type="submit">{ loading ? 'Carregando...' : 'Acessar'}
                1.  no sagas ainda não tem solução para falha de autenticação
    2.  auth/sagas.js
        1.  inserir try/catch de SignIn.
    3.  auth/reducer.js: obs. apagar token e signed

17. Exibindo Toasts
    1.  Mensagens em relação aos erros.
    2.  yarn add react-toastify
    3.  src/App.js

18. Upload de imagens para S3
    1.  inclusão de Headers no .post.
    
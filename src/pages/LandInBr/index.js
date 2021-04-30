import React from 'react'
import { GrApple, GrAndroid } from 'react-icons/gr';
import { GiCheckMark } from 'react-icons/gi';
// -----------------------------------------------------------------------------
import { Container } from '../LandIn/styles'
import history from '~/services/history';
import godtaskerFont from '~/assets/godtaskerFont/GroupgodtaskerFontLogoGrey.svg';
// import godtaskerFontFooter from '~/assets/godtaskerFont/GroupgodtaskerFontPlainGrey.svg';
import footerLogo from '~/assets/detective/detective.svg';
import hero from '~/assets/stockImages/hero.jpg';
import subHeroTop from '~/assets/stockImages/sub-hero-top.jpg';
import subHeroBottom from '~/assets/stockImages/sub-hero-bottom.jpg';
import subHeroExample1 from '~/assets/stockImages/sub-hero-example-1.jpg';
import subHeroExample2 from '~/assets/stockImages/sub-hero-example-2.jpg';
import subHeroExample3 from '~/assets/stockImages/sub-hero-example-3.jpg';
import subHeroExample4 from '~/assets/stockImages/sub-hero-example-4.jpg';
import subHeroExample5 from '~/assets/stockImages/sub-hero-example-5.jpg';
import subHeroExample6 from '~/assets/stockImages/sub-hero-example-6.jpg';
import qrcodegeneric from '~/assets/stockImages/qrcodegeneric.png';
import { Wrapper } from '../_layouts/default/styles';

export default function LandIn() {

  function handleSingIn() {
    history.push('/login');
  }
  // ---------------------------------------------------------------------------
  return (
    <Container>
      <header className="header-div">
        <div className="left-header-div">
          <img className="header-img" src={godtaskerFont} alt="godtaskerFont"/>
        </div>
        <div className="center-header-div">
          <ul className="header-ul">
            <li className="header-li">Attributos</li>
            <li className="header-li">Preço</li>
            <li className="header-li">Comunidade</li>
            <li className="header-li">Ajuda</li>
          </ul>
        </div>
        <div className="right-header-div">
          <button
            className="header-button"
            onClick={() => handleSingIn()}
          >Entrar</button>
        </div>
      </header>

      <body className="body-div">

        <div className="hero-div">
          <img className="hero-background-img" src={hero} alt="hero" />
          <div className="hero-hover-div">
            <strong className="hero-strong">
              Tarefas claras como a luz do dia
            </strong>
            <button
              className="hero-button"
              onClick={() => handleSingIn()}
            >Comece hoje mesmo</button>
          </div>
        </div>

        <div className="sub-hero-div top">
          <div className="sub-hero-wrapper">
            {/* <div className="sub-hero-img-wrapper"> */}
            <img className="sub-hero-img" src={subHeroTop} alt="sub-hero-top"/>
            {/* </div> */}
            <div className="sub-hero-message-div">
              <strong className="sub-hero-strong">
                Delegue com poder!
              </strong>
              <ul className="sub-hero-ul">
                <li className="sub-hero-li">Um website e um aplicativo no celular.</li>
                <li className="sub-hero-li">Se cadastre como chefe, e adicione outros usuários como seus funcionários.</li>
                <li className="sub-hero-li">Crie tarefas... Delegue!</li>
                <li className="sub-hero-li">O(a) funcionário(a) recebe a tarefa no aplicativo e a aceita.</li>
                <li className="sub-hero-li">Agora ele(a) tem o compromisso de completar a tarefa antes do prazo!</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sub-hero-div responsive">
          <div className="sub-hero-wrapper">
            <div className="sub-hero-message-div responsive">
              <strong className="sub-hero-strong">
                Delegue com poder!
              </strong>
              <ul className="sub-hero-ul">
              <li className="sub-hero-li">Um website e um aplicativo no celular.</li>
                <li className="sub-hero-li">Se cadastre como chefe, e adicione outros usuários como seus funcionários.</li>
                <li className="sub-hero-li">Crie tarefas... Delegue!</li>
                <li className="sub-hero-li">O(a) funcionário(a) recebe a tarefa no aplicativo e a aceita.</li>
                <li className="sub-hero-li">Agora ele(a) tem o compromisso de completar a tarefa antes do prazo!</li>
              </ul>
            </div>
            <img className="sub-hero-img" src={subHeroTop} alt="sub-hero-top"/>
          </div>
        </div>

        <div className="sub-hero-div bottom">
          <div className="sub-hero-wrapper">
            <div className="sub-hero-message-div">
              <strong className="sub-hero-strong bottom">Para o(a) funcionário(a)</strong>
              <ul className="sub-hero-ul">
                <li className="sub-hero-li bottom">Quando precisar de ajuda:</li>
                <ul className="help-ul">
                  <li className="sub-hero-li bottom">Pode perguntar pelo chat.</li>
                </ul>
                <li className="sub-hero-li bottom">Notificações quando:</li>
                <ul className="help-ul">
                  <li className="sub-hero-li bottom">A tarefa é editada.</li>
                  <li className="sub-hero-li bottom">Nova mensagem no chat.</li>

                </ul>
                <li className="sub-hero-li bottom">Quando completar uma tarefa:</li>
                <ul className="help-ul">
                  <li className="sub-hero-li bottom">Ele(a) irá confirmar com uma foto (pode ser opcional).</li>
                  <li className="sub-hero-li bottom">O produto final agora pode ser avaliado.</li>
                </ul>
              </ul>
            </div>
            <img className="sub-hero-img" src={subHeroBottom} alt="sub-hero-bottom"/>
          </div>
        </div>

        <div className="sub-hero-div top">
          <div className="sub-hero-wrapper">
            <div className="sub-hero-examples-wrapper">
              <div className="sub-hero-examples-div">
                <article>
                <img className="sub-hero-examples-img" src={subHeroExample1} alt="sub-hero-top"/>
                </article>
                <article>
                <img className="sub-hero-examples-img" src={subHeroExample2} alt="sub-hero-top"/>
                </article>
                <article>
                <img className="sub-hero-examples-img" src={subHeroExample3} alt="sub-hero-top"/>
                </article>
              </div>
              <div className="sub-hero-examples-div">
                <article>
                <img className="sub-hero-examples-img" src={subHeroExample4} alt="sub-hero-top"/>
                </article>
                <article>
                <img className="sub-hero-examples-img" src={subHeroExample5} alt="sub-hero-top"/>
                </article>
                <article>
                <img className="sub-hero-examples-img" src={subHeroExample6} alt="sub-hero-top"/>
                </article>
              </div>
            </div>
            <div className="sub-hero-message-div">
              <strong className="sub-hero-strong examples">
                Alguns exemplos de uso
              </strong>
              <ul className="sub-hero-ul">
                <li className="sub-hero-li examples"><strong>No dia-a-dia com a sua equipe.</strong></li>
                <li className="sub-hero-li examples"><strong>Entre colegas e departamentos:</strong>
                  <ul className="help-ul">
                    <li>instruções claras, com prazo, e chat para suporte.</li>
                  </ul>
                </li>
                <li className="sub-hero-li examples"><strong>Equipe de vendas:</strong>
                  <ul className="help-ul">
                    <li>estabelecer metas e locais de venda.</li>
                  </ul>
                </li>

                <li className="sub-hero-li examples"><strong>Personal trainers:</strong>
                  <ul className="help-ul">
                    <li>Exercícios para o(a) aluno(a) com confirmação de finalização (pode ser exigindo uma foto 😥).</li>
                  </ul>
                </li>
                <li className="sub-hero-li examples"><strong>Encarregado(a) da limpeza/Babá:</strong>
                  <ul className="help-ul">
                    <li>Lista de tarefas, horário para a criança comer e dormir.</li>
                  </ul>
                </li>
                <li className="sub-hero-li examples"><strong>Ou para si mesmo(a).</strong>
                  <ul className="help-ul">
                    <li>Lista de compras, agenda de reuniões, promessas do ano.</li>
                  </ul>
                </li>

              </ul>
            </div>
          </div>
        </div>

        <div className="sub-hero-div responsive">
          <div className="sub-hero-wrapper">
            <div className="sub-hero-examples-wrapper">
              <div className="sub-hero-message-div">
                <strong className="sub-hero-strong examples">
                  Alguns exemplos de uso
                </strong>
                {/* <ul className="sub-hero-ul">
                  <li className="sub-hero-li examples">Seu funcionário(a) precisa realizar alguma tarefa no dia-a-dia.</li>
                  <li className="sub-hero-li examples">Colaboração entre colegas e departamentos com instruções claras, e um helpdesk para o suporte.</li>
                  <li className="sub-hero-li examples">Equipe de vendas: estabelecer metas, locais de venda, agendar clientes.</li>
                  <li className="sub-hero-li examples">Personal trainer: lista de exercícios e confirmação de finalização (pode ser exigindo uma foto 😥).</li>
                  <li className="sub-hero-li examples">Uma lista de tarefas para o(a) babá/encarregado(a) da limpeza.</li>
                  <li className="sub-hero-li examples">Para si mesmo(a). Lista de tarefas, lista de compras, agenda de reuniões, promessas do ano.</li>
                </ul> */}
                <ul className="sub-hero-ul">
                  <li className="sub-hero-li examples"><strong>No dia-a-dia com a sua equipe.</strong></li>
                  <li className="sub-hero-li examples"><strong>Entre colegas e departamentos:</strong>
                    <ul className="help-ul">
                      <li>instruções claras, com prazo, e chat para suporte.</li>
                    </ul>
                  </li>
                  <li className="sub-hero-li examples"><strong>Equipe de vendas:</strong>
                    <ul className="help-ul">
                      <li>estabelecer metas e locais de venda.</li>
                    </ul>
                  </li>

                  <li className="sub-hero-li examples"><strong>Personal trainers:</strong>
                    <ul className="help-ul">
                      <li>Exercícios para o(a) aluno(a) com confirmação de finalização (pode ser exigindo uma foto 😥).</li>
                    </ul>
                  </li>
                  <li className="sub-hero-li examples"><strong>Encarregado(a) da limpeza/Babá:</strong>
                    <ul className="help-ul">
                      <li>Lista de tarefas, horário para a criança comer e dormir.</li>
                    </ul>
                  </li>
                  <li className="sub-hero-li examples"><strong>Ou para si mesmo(a).</strong>
                    <ul className="help-ul">
                      <li>Lista de compras, agenda de reuniões, promessas do ano.</li>
                    </ul>
                  </li>

                </ul>
              </div>

              <div className="sub-hero-examples-div">
                <article>
                <img className="sub-hero-examples-img" src={subHeroExample1} alt="sub-hero-top"/>
                </article>
                <article>
                <img className="sub-hero-examples-img" src={subHeroExample2} alt="sub-hero-top"/>
                </article>
                <article>
                <img className="sub-hero-examples-img" src={subHeroExample3} alt="sub-hero-top"/>
                </article>
              </div>
              <div className="sub-hero-examples-div">
                <article>
                <img className="sub-hero-examples-img" src={subHeroExample4} alt="sub-hero-top"/>
                </article>
                <article>
                <img className="sub-hero-examples-img" src={subHeroExample5} alt="sub-hero-top"/>
                </article>
                <article>
                <img className="sub-hero-examples-img" src={subHeroExample6} alt="sub-hero-top"/>
                </article>
              </div>
            </div>
          </div>
        </div>

        <div className="sign-up-div">
          <div className="sign-up-top-div">
            <strong className="sign-up-strong">
              O godtakser deve ser usado sempre que uma tarefa for feita de uma pessoa à outra, planejada ou não.
            </strong>

            <button
              className="hero-button"
              onClick={() => handleSingIn()}
            >Entre hoje mesmo!</button>
          </div>

          <div className="sign-up-bottom-div">
            <div className="apple-div">
              <div className="sign-up-title-div">
                <GrApple size={32} color='#fff'/>
                  <p className="app-p">
                    App Store
                  </p>
              </div>


              <img className="qrcode-img" src={qrcodegeneric} alt="qrcodegeneric"/>
            </div>
            <div className="android-div">
              <div className="sign-up-title-div">
                <GrAndroid size={32} color='#fff'/>
                  <p className="app-p">
                    Google Play
                  </p>
              </div>

              <img className="qrcode-img" src={qrcodegeneric} alt="qrcodegeneric"/>
            </div>
          </div>
        </div>
      </body>

      <footer className="footer-div">
        <div className="left-header-div">
          <img className="footer-img" src={footerLogo} alt="godtaskerFont"/>
        </div>
        <div className="center-header-div">
          <ul className="header-ul">
            <li className="footer-li">Comunidade</li>
            <li className="footer-li">Ajuda</li>
          </ul>
        </div>
        <div className="right-header-div">
          <p className="footer-p">godtasker Inc. 2021, making you powerful</p>
        </div>
      </footer>
    </Container>
  )
}

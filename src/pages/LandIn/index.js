import React from 'react'
import { Container } from './styles'
import history from '~/services/history';
// -----------------------------------------------------------------------------
import godtaskerFont from '~/assets/godtaskerFont/GroupgodtaskerFontLogoGrey.svg';
import godtaskerFontFooter from '~/assets/godtaskerFont/GroupgodtaskerFontPlainGrey.svg';
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
            <li className="header-li">Features</li>
            <li className="header-li">Pricing</li>
            <li className="header-li">Community</li>
            <li className="header-li">Support</li>
          </ul>
        </div>
        <div className="right-header-div">
          <button
            className="header-button"
            onClick={() => handleSingIn()}
          >Log In</button>
        </div>
      </header>

      <body className="body-div">

        <div className="hero-div">
          <img className="hero-background-img" src={hero} alt="hero" />
          <div className="hero-hover-div">
            <strong className="hero-strong">
              Make tasks as clear as day and get the desired results.
            </strong>
            <button
              className="hero-button"
              onClick={() => handleSingIn()}
            >Join Today</button>
          </div>
        </div>

        <div className="sub-hero-top-div">
          {/* <div className="sub-hero-wrapper"> */}
            <img className="sub-hero-img" src={subHeroTop} alt="sub-hero-top"/>
            <div className="sub-hero-message-div">
              <strong className="sub-hero-strong">
                Delegate with Power!
              </strong>
              <ul className="sub-hero-ul">
                <li className="sub-hero-li">A website and mobile app</li>
                <li className="sub-hero-li">Register, add other users as workers.</li>
                <li className="sub-hero-li">Create tasks for them. Delegate!</li>
                <li className="sub-hero-li">The worker receives the task on the app. He/She accepts.</li>
                <li className="sub-hero-li">Now the worker is entitled to complete that task before the deadline.</li>
              </ul>
            </div>
          {/* </div> */}
        </div>

        <div className="sub-hero-bottom-div">
          {/* <div className="sub-hero-wrapper"> */}
            <div className="sub-hero-message-div">
              <strong className="sub-hero-strong bottom">For the worker</strong>
              <ul className="sub-hero-ul">
                <li className="sub-hero-li bottom">When the worker needs help, or has a question.</li>
                <ul className="help-ul">
                  <li className="sub-hero-li bottom">Internal Chat with the user.</li>
                </ul>
                <li className="sub-hero-li bottom">Notifications when:</li>
                <ul className="help-ul">
                  <li className="sub-hero-li bottom">A sub-task, due date, priority is altered or completed.</li>
                  <li className="sub-hero-li bottom">New messages in the chat.</li>
                </ul>
                <li className="sub-hero-li bottom">Worker completes the task.</li>
                <ul className="help-ul">
                  <li className="sub-hero-li bottom">He/She will confirm with a photo (can be optional).</li>
                  <li className="sub-hero-li bottom">The end-product can now be evaluated.</li>
                </ul>
              </ul>
            </div>
            <img className="sub-hero-img" src={subHeroBottom} alt="sub-hero-bottom"/>
          {/* </div> */}
        </div>

        <div className="sub-hero-top-div">
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
            <strong className="sub-hero-strong">
              Some examples of use
            </strong>
            <ul className="sub-hero-ul">
              <li className="sub-hero-li">Your employees need to do a certain task on the job.</li>
              <li className="sub-hero-li">Between co-workers and across departments with clear instructions along with a helpdesk.</li>
              <li className="sub-hero-li">Sales task force: setting goals, setting locations, scheduling clients.</li>
              <li className="sub-hero-li">Fitness trainers: Workout routine and completion confirmation (can be photo-required 😥).</li>
              <li className="sub-hero-li">A to-do list for the babysitter/housecleaner.</li>
              <li className="sub-hero-li">By yourself. To-do lists, checklists, meeting schedules, resolutions.</li>
            </ul>
          </div>
        </div>

        <div className="sign-up-div">
          <strong className="sign-up-strong">
            godtasker should be used anytime a task is done by one person(s) for another person, planned or not.
          </strong>
          <button
            className="hero-button"
            onClick={() => handleSingIn()}
          >Join Today</button>
        </div>
      </body>

      <footer className="footer-div">
        <div className="left-header-div">
          <img className="footer-img" src={footerLogo} alt="godtaskerFont"/>
        </div>
        <div className="center-header-div">
          <ul className="header-ul">
            <li className="footer-li">Mobile App</li>
            <li className="footer-li">Community</li>
            <li className="footer-li">Support</li>
          </ul>
        </div>
        <div className="right-header-div">
          <p className="footer-p">godtasker Inc. 2021, making you powerful</p>
        </div>
      </footer>
    </Container>
  )
}

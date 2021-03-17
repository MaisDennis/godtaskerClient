import React from 'react';

// import godtaskerFontFooter from '~/assets/godtaskerFont/GroupgodtaskerFontPlainGrey.svg';
import logo from '~/assets/detective/detective.svg';
import { Container } from './styles';

function Footer() {
  return (
    <Container>
      <footer className="footer-div">
        <div className="left-header-div">
          <img className="footer-img" src={logo} alt="godtaskerFont"/>
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
  );
}

export default Footer;

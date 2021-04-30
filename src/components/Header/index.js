import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// -----------------------------------------------------------------------------
// import logo from '~/assets/detective/detective.svg';
import logo from '~/assets/godtaskerFont/GroupgodtaskerFontPlainGrey.svg';
// import logo from '~/assets/godtaskerFont/GroupgodtaskerFontLogoGrey.svg';
import insert from '~/assets/insert_photo-24px.svg';
import { Container, Content, Profile } from './styles';
import Notifications from '~/components/Notifications';
// -----------------------------------------------------------------------------
export default function Header() {
  const profile = useSelector(state => state.user.profile);
  // ---------------------------------------------------------------------------
  return (
    <Container>
      <Content>
      <img
        className="image-logo"
        src={logo}
        alt="gerenteDash"
      />
        <nav>

          <ul>
            <li><Link to="/dashboard">Tarefas</Link></li>
            <li><Link to="/contact-list/list">Funcionários</Link></li>
            <li><Link to="/tutorial">Tutorial</Link></li>
            <li><Link to="/profile">Editar perfil</Link></li>
          </ul>
        </nav>

        <aside>
        {/* <Notifications /> */}
          <Profile>
            <div>
              <strong>{profile.user_name}</strong>
            </div>
            {!profile.avatar
              ? (
                <div className="image-background-div">
                  <img
                    className="image-user"
                    src={insert} alt="User"
                  />
                </div>
              )
              : (
                <div className="image-background-div">
                  <img
                    className="image-user"
                    src={profile.avatar.url}
                    alt="User"
                  />
                </div>
              )
            }
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

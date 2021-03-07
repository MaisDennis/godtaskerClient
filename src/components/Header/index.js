import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// -----------------------------------------------------------------------------
import logo from '~/assets/detective/detective.svg';
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
      <img src={logo} alt="gerenteDash" />
        <nav>

          <ul>
            <li><Link to="/dashboard">Tarefas</Link></li>
            <li><Link to="/contact-list/list">Funcionários</Link></li>
            <li><Link to="/tutorial">Tutorial</Link></li>
            <li><Link to="/profile">Meu perfil</Link></li>
          </ul>
        </nav>

        <aside>
        {/* <Notifications /> */}
          <Profile>
            <div>
              <strong>{profile.user_name}</strong>
            </div>
            {!profile.avatar
              ? <img src={insert} alt="User"/>
              : <img src={profile.avatar.url} alt="User"/>
            }
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

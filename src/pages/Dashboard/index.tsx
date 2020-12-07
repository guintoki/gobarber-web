/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-use-before-define */
import React from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
} from './styles';
import { useAuth } from '../../hooks/Auth';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 5</span>
            <span>Domingo</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>

            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/55093125?s=400&u=b241d3376c3c7ddaa21421eb4bcd255962486339&v=4"
                alt=""
              />

              <strong></strong>
              <span>
                <FiClock />
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar></Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;

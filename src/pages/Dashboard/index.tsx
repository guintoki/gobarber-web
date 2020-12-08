/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-use-before-define */
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
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
  Section,
  Appointment,
} from './styles';
import { useAuth } from '../../hooks/Auth';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface MonthAvaliabilityItem {
  day: number;
  avaliable: boolean;
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvaliability, setMonthAvaliability] = useState<
    MonthAvaliabilityItem[]
  >([]);

  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.avaliable) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-avaliability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvaliability(response.data);
      });
  }, [currentMonth, user.id]);

  const disabledDays = useMemo(() => {
    const dates = monthAvaliability
      .filter(monthDay => monthDay.avaliable === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvaliability]);

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

              <strong>cleiton</strong>
              <span>
                <FiClock />
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                9: 00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/55093125?s=400&u=b241d3376c3c7ddaa21421eb4bcd255962486339&v=4"
                  alt=""
                />
                <strong>cleiton</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                9: 00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/55093125?s=400&u=b241d3376c3c7ddaa21421eb4bcd255962486339&v=4"
                  alt=""
                />
                <strong>cleiton</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                9: 00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/55093125?s=400&u=b241d3376c3c7ddaa21421eb4bcd255962486339&v=4"
                  alt=""
                />
                <strong>cleiton</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              avaliable: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;

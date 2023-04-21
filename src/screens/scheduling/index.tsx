import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackButton } from '../../components/back-button';
import { useTheme } from 'styled-components/native';
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';
import ArrowSVG from '../../assets/svg/arrow.svg';
//import { StatusBar } from 'expo-status-bar';
import { Button } from '../../components/button';
import { CarDTO } from '../../dtos/car';
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from '../../components/calendar';
//TIPAGENS ROTAS
import { RootStackParamList } from '../../routes/stack.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import { getPlataformDate } from '../../utils/get-plat-form-date';

type schedulingDetailsScrenProp = NativeStackNavigationProp<
  RootStackParamList,
  'SchedulingDetails'
>;

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}
interface Params {
  car: CarDTO;
}
export function Scheduling() {
  const route = useRoute();
  const { car } = route.params as Params;

  const [lastSelectedDate, setlastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markeDates, setMarkeDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();
  const navigation = useNavigation<schedulingDetailsScrenProp>();

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markeDates),
    });
  }
  function handleConfimCalback() {
    navigation.goBack();
  }

  function handleChangeDate(day: DayProps) {
    let start = !lastSelectedDate.timestamp ? day : lastSelectedDate;
    let end = day;
    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setlastSelectedDate(end);

    const interval = generateInterval(start, end);
    setMarkeDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];
    setRentalPeriod({
      startFormatted: format(
        getPlataformDate(new Date(firstDate)),
        'dd/MM/yyyy'
      ),
      endFormatted: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
  }
  return (
    <Container>
      <Header>
        {/**
       *   <StatusBar 
          style='light'
          translucent
          backgroundColor='transparent'
        />
       */}
        <BackButton
          onPress={() => handleConfimCalback()}
          color={theme.colors.shape}
        />
        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguel {'\n'}
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSVG />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar makedDates={markeDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={() => handleConfirmRental()} />
      </Footer>
    </Container>
  );
}

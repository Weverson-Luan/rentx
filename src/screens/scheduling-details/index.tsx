import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { Feather } from "@expo/vector-icons";
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { BackButton } from '../../components/back-button';
import { Calendar, TagChevron } from 'phosphor-react-native';
import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Content,
  Acessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';
import { ImageSlider } from '../../components/image-slider';
import { getAccessoryIcon } from '../../utils/get-accessory-icon';
import { Accessory } from '../../components/accessory';
import { Button } from '../../components/button';
import { CarDTO } from '../../dtos/car';
import { RootStackParamList } from '../../routes/stack.routes';
import { getPlataformDate } from '../../utils/get-plat-form-date';
import { api } from '../../services/api';
import { Alert } from 'react-native';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}
// type schedulingDetailsScrenProp = NativeStackNavigationProp<RootStackParamList, 'SchedulingDetails'>;
type schedulingCompletsScrenProp = NativeStackNavigationProp<
  RootStackParamList,
  'SchedulingComplet'
>;

interface ServerResponse {
  unavailable_dates: [];
}
export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const navigation = useNavigation<schedulingCompletsScrenProp>();
  const theme = useTheme();

  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price);
  async function handleConfirmRental() {
    const schedulesByCar = await api.get<ServerResponse>(
      `/schedules_bycars/${car.id}`
    );

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];
    await api.post('/schedules_byuser', {
      user_id: '1',
      car,
      startDate: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(
        getPlataformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    });
    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then((response) => navigation.navigate('SchedulingComplet'))
      .catch((error) =>
        Alert.alert('Não foi possivel confirmar o agendamento.')
      );
  }
  function handleNavigationGoback() {
    navigation.goBack();
  }
  useEffect(() => {
    setRentalPeriod({
      start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlataformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    });
  }, []);
  return (
    <Container>
      <Header>
        <BackButton onPressIn={() => handleNavigationGoback()} color="red" />
      </Header>
      <CarImages>
        <ImageSlider imageUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Acessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Calendar size={RFValue(24)} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <TagChevron size={RFValue(24)} color={theme.colors.text} />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{` R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal> R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.sucess}
          onPress={() => handleConfirmRental()}
        />
      </Footer>
    </Container>
  );
}

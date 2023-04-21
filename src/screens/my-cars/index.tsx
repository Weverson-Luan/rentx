import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CarDTO } from '../../dtos/car';
import { Loading } from '../../components/load';
import { BackButton } from '../../components/back-button';
import { useTheme } from 'styled-components/native';
import { api } from '../../services/api';
import { Car } from '../../components/car';
import { ArrowRight } from 'phosphor-react-native';
import {
  Container,
  Title,
  Header,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFootePeriod,
  CarFooterDate,
} from './styles';
interface CarProps {
  id: string;
  user_id: string;
  startDate: string;
  endDate: string;
  car: CarDTO;
}

interface CarApi {
  data: CarProps[];
}

export function MyCars() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarProps[]>([]);
  const [isloading, setIsloading] = useState(true);

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = (await api.get(
          '/schedules_byuser?user_id=1'
        )) as CarApi;
        setCars(response.data);
      } catch (error) {
        return error;
      } finally {
        setIsloading(false);
      }
    }
    fetchCars();
  }, []);
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={() => handleBack()} color={theme.colors.shape} />
        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguel {'\n'}
        </Title>
        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>
      {isloading ? (
        <Loading />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Periodo</CarFooterTitle>
                  <CarFootePeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <ArrowRight
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFootePeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}

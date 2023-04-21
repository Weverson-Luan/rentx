import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import { BackButton } from '../../components/back-button';
import { Accessory } from '../../components/accessory';
import { Button } from '../../components/button';
import { ImageSlider } from '../../components/image-slider';

import { getAccessoryIcon } from '../../utils/get-accessory-icon';

import { CarDTO } from '../../dtos/car';

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
  About,
  Accessories,
  Footer,
} from './styles';

//TIPAGENS ROTAS
import { RootStackParamList } from '../../routes/stack.routes';

type schedulingScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Scheduling'
>;

interface Params {
  car: CarDTO;
}
export function CarDetails() {
  const theme = useTheme();
  const navigation = useNavigation<schedulingScreenProp>();
  const route = useRoute();
  const { car } = route.params as Params;

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    console.log(event.contentOffset.y);
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200], // efeito ira acontecer entre 0 a 200
        [200, 70], /// quando estiver em 0 vai ter a altura de 200px quando chegar em 200 iremos jogar altura para 70px
        Extrapolate.CLAMP
      ),
    };
  });

  const imageCarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150], // efeito ira acontecer entre 0 a 150
        [1, 0], /// quando estiver em 0 vai ter a opacidade de 100% quando chegar em 150 iremos jogar opcidade para 0
        Extrapolate.CLAMP
      ),
    };
  });

  function handleConfirmRental() {
    navigation.navigate('Scheduling', {
      car,
    });
  }
  function handleConfirmCallback() {
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <Animated.View
        style={[
          headerStyleAnimation,
          { backgroundColor: theme.colors.background_secundary },
        ]}
      >
        <Header>
          <BackButton onPressIn={() => handleConfirmCallback()} color="red" />
        </Header>
        <Animated.View style={[imageCarStyleAnimation]}>
          <ImageSlider imageUrl={car.photos} />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          alignItems: 'center',
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16} // 60 frame por segundos
      >
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
        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={() => handleConfirmRental()}
        />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
  back: {
    marginTop: 24,
  },
});

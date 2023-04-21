import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
// import { StatusBar } from 'expo-status-bar';
// import { Ionicons } from '@expo/vector-icons';
import { CarSimple } from 'phosphor-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CarDTO } from '../../dtos/car';
import { Car } from '../../components/car';
import { LoadingAnimation } from '../../components/loading-animation';
import { api } from '../../services/api';
import LogoSVG from '../../assets/svg/logo.svg';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton,
  AnimatedMyCarsButton,
  //@ts-ignore
} from './styles';

//TIPAGENS ROTAS
import { RootStackParamList } from '../../routes/stack.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
type homeScrenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function Home() {
  const theme = useTheme();

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const animatedMyCarsViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      (ctx.positionX = positionX.value), (ctx.positionY = positionY.value);
    },
    onActive(event, ctx: any) {
      (positionX.value = event.translationX + ctx.positionX),
        (positionY.value = event.translationY + ctx.positionY);
    },
    onEnd() {
      (positionX.value = withSpring(0)), (positionY.value = withSpring(0));
    },
  });

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<homeScrenProp>();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleNavigationMyCars() {
    navigation.navigate('MyCars');
  }

  const fetchCars = async () => {
    try {
      const response: any = await api.get('/cars');
      setCars(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  });

  return (
    <Container>
      {/* <StatusBar style="light" backgroundColor="transparent" /> */}
      <HeaderContent>
        <Header>
          <LogoSVG width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total {cars.length} Carros</TotalCars>}
        </Header>
      </HeaderContent>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            animatedMyCarsViewStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <AnimatedMyCarsButton
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            onPress={() => navigation.navigate('MyCars')}
          >
            <CarSimple size={32} color={theme.colors.shape} />
          </AnimatedMyCarsButton>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';

import BrandSvg from '../../assets/svg/brand.svg';
import LogoSvg from '../../assets/svg/logo.svg';

import { RootStackParamList } from 'src/routes/stack.routes';

import { Container } from './styles';

type homeScrenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const SpalshScreen = () => {
  const navigation = useNavigation<homeScrenProp>();
  const splashAnimation = useSharedValue(0);

  const brandStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 50],
        [1, 0],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 25, 50],
        [0, 0.3, 1],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const handleStartApp = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      {
        duration: 3000,
      },
      () => {
        'worklet';
        runOnJS(handleStartApp)();
      }
    );
  }, []);
  return (
    <Container>
      <Animated.View style={[brandStyles, { position: 'absolute' }]}>
        <BrandSvg width={100} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyles, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
};

export { SpalshScreen };

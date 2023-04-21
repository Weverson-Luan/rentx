import React from 'react';
import LottieView from 'lottie-react-native';

import loadindingCar from '../../assets/lotite/loading-animation.json';
import { Container } from './styles.';

const LoadingAnimation = () => {
  return (
    <Container>
      <LottieView
        source={loadindingCar}
        autoPlay
        style={{ height: 200 }}
        resizeMode="contain" // ajustar image sempre pra melhor proporção
        loop //  dizemos que o carregamento demore 5 segundo digamos que não queremos que a animação pare
      />
    </Container>
  );
};

export { LoadingAnimation };

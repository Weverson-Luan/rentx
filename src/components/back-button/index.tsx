import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container } from './styles';
import { ShieldChevron } from 'phosphor-react-native';
import { useTheme } from 'styled-components/native';

interface Props extends TouchableOpacityProps {
  color?: string;
}

export function BackButton({ color, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container {...rest}>
      <ShieldChevron size={24} color={color ? color : theme.colors.text} />
    </Container>
  );
}

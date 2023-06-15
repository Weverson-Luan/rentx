import React from 'react';
import { useTheme } from 'styled-components/native';
import { Container, Title } from './styles';
import { TouchableOpacityProps } from 'react-native';
import { Loading } from '../load';

// tipando nosso component
interface Props extends TouchableOpacityProps {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled,
  loading,
  light = false,
  ...props
}: Props) {
  const theme = useTheme();
  console.log('Button', enabled);
  return (
    <Container
      {...props}
      color={color ? color : theme.colors.main}
      onPress={onPress}
      disabled={enabled ? false : true}
      style={{ opacity: enabled ? 1 : 0.5 }}
    >
      {loading ? (
        <Loading color={theme.colors.background_secundary} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}

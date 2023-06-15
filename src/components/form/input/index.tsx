import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Container, IconContainer, InputText } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import { Envelope, IconProps } from 'phosphor-react-native';

interface Props extends TextInputProps {
  color?: string;
  iconName?: React.ComponentProps<typeof Feather>['name'];
  nameIcon: 'envelope' | 'look';
}

export function InputCustom({ color, iconName, nameIcon, ...props }: Props) {
  const theme = useTheme();
  return (
    <Container>
      <IconContainer>
        <>
          {nameIcon === 'envelope' && (
            <Envelope size={24} color={theme.colors.text} />
          )}
        </>
      </IconContainer>

      <InputText {...props} />
    </Container>
  );
}

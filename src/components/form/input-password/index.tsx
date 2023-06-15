import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  Container,
  IconContainer,
  InputText,
  ChangePasswordVisibityButton,
} from './styles';
import Feather from 'react-native-vector-icons/Feather';
import { Lock, Eye, EyeSlash } from 'phosphor-react-native';

interface Props extends TextInputProps {
  color?: string;
  iconName?: React.ComponentProps<typeof Feather>['name'];
  nameIcon: 'eye' | 'lok';
  nameIconTwo?: 'eye' | 'lok';
}

export function InputPasswordCustom({
  color,
  iconName,
  nameIcon,
  nameIconTwo,
  ...props
}: Props) {
  const theme = useTheme();
  const [isPasswordVisibly, setIsVisibly] = useState(true);
  return (
    <Container>
      <IconContainer>
        <>
          {nameIcon === 'lok' && <Lock size={24} color={theme.colors.text} />}
        </>
      </IconContainer>

      <InputText secureTextEntry={isPasswordVisibly} {...props} />

      <ChangePasswordVisibityButton
        onPress={() => setIsVisibly(!isPasswordVisibly)}
      >
        <>
          {nameIconTwo === 'eye' && (
            <>
              {isPasswordVisibly ? (
                <Eye size={24} color={theme.colors.text} />
              ) : (
                <EyeSlash size={24} color={theme.colors.text} />
              )}
            </>
          )}
        </>
      </ChangePasswordVisibityButton>
    </Container>
  );
}

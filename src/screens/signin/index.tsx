import React from 'react';
import { StatusBar } from 'react-native';
import {
  Container,
  Header,
  Title,
  Form,
  SubTitle,
  FotterButtons,
} from './styles';
import { Button } from '../../components/button';
import { InputCustom } from '../../components/form/input';
import { useTheme } from 'styled-components/native';
import { InputPasswordCustom } from '../../components/form/input-password';

const SignIn = () => {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <Header>
        <Title>Estamos{'\n'}quase lá.</Title>

        <SubTitle>
          Faça seu login para começar{'\n'}uma experiência incrível.
        </SubTitle>
      </Header>

      <Form>
        <InputCustom
          nameIcon="envelope"
          placeholder="E-mail"
          placeholderTextColor={theme.colors.text}
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />

        <InputPasswordCustom
          nameIcon="lok"
          nameIconTwo={'eye'}
          placeholder="Senha"
          placeholderTextColor={theme.colors.text}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </Form>

      <FotterButtons>
        <Button
          title="Login"
          onPress={() => {}}
          color="red"
          enabled={true}
          loading={false}
        />

        <Button
          title="Criar conta gratuita"
          onPress={() => {}}
          color={theme.colors.background_secundary}
          enabled={true}
          loading={false}
          light={true}
        />
      </FotterButtons>
    </Container>
  );
};
/**
 * EXPORTS
 */
export { SignIn };

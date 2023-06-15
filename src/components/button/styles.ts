import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { TouchableOpacityProps } from 'react-native';
interface ButtonProps extends TouchableOpacityProps{
  color: string;
  enabled?: boolean;
};
export const Container = styled(TouchableOpacity)<ButtonProps>`
  width: 100%;

  padding: 19px;
  align-items: center;
  justify-content: center;

  background-color: ${({color })=> color };
  margin-bottom: 8px;
`;

type TextProps = {
  light?: boolean
}
export const Title = styled.Text<TextProps>`
  font-size: ${RFValue(15)}px;
  color: ${({theme, light})=> light ?theme.colors.header :theme.colors.shape};
`;


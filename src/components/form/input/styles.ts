import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';


export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: 8px;
 
`;

export const IconContainer = styled.View`
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme})=> theme.colors.background_secundary};
  margin-right: 3px;

`;


export const InputText = styled.TextInput`
  width: 100%;
  flex: 1;
  background-color: ${({theme})=> theme.colors.background_secundary};
  font-size: ${RFValue(15)}px;
  color: ${({theme})=> theme.colors.text};
  font-family: ${({theme})=> theme.fonts.primary_inter_400};
  padding: 0 23px;

`;


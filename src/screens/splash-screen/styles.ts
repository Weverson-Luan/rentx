import styled from "styled-components/native";  

const Container = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({theme})=> theme.colors.header};

`;


export {
  Container
}
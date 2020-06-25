import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/theme";

export default function NumberInCart(props) {
  const themeContext = useContext(ThemeContext);
  return (
    <NumberInCartWrapper value={themeContext}>
      {props.count}
    </NumberInCartWrapper>
  );
}
const NumberInCartWrapper = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  border-top-left-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  box-shadow: 0px 2px 4px -2px rgba(0, 0, 0, 1);
  background-color: ${(props) => props.value.theme.secondary.main};
  border: 1px solid ${(props) => props.value.theme.secondary.dark};
  color: ${(props) => props.value.theme.secondary.text};
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.5rem;
`;

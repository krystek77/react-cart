import styled from "styled-components";

export const ButtonWrapper = styled.button`
  font-size: ${(props) => (props.navbar ? "1.6rem" : "1.1rem")};
  padding: ${(props) =>
    props.navbar ? "0" : props.cart ? "0.3rem 0.5rem" : "0.3rem 0.8rem"};
  margin: 0.2rem;
  border-radius: 0.2rem;
  cursor: pointer;
  color: ${(props) =>
    props.modal
      ? props.value.theme.primary.text
      : props.value.theme.secondary.text};
  background-color: ${(props) =>
    props.modal
      ? props.value.theme.primary.main
      : props.navbar
      ? "transparent"
      : props.cart
      ? props.value.theme.primary.main
      : props.value.theme.secondary.main};
  border: 1px solid
    ${(props) =>
      props.modal
        ? props.value.theme.primary.dark
        : props.navbar
        ? "transparent"
        : props.cart
        ? props.value.theme.primary.main
        : props.value.theme.secondary.dark};
  transition: all 0.3s ease-in-out;
  &:disabled {
    background-color: grey;
    border: 1px solid grey;
    color: darkgrey;
    pointer-events: none;
    cursor: none;
  }
  &:hover {
    color: ${(props) =>
      props.modal
        ? props.value.theme.primary.dark
        : props.cart
        ? props.value.theme.primary.dark
        : props.value.theme.secondary.dark};
  }
  &:focus {
    outline: none;
  }
  .btn-label {
    margin-left: 0.5rem;
  }
`;

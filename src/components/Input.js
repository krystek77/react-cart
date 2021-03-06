import React from "react";
import { ThemeContextConsumer } from "../context/theme";
import styled from "styled-components";

const Input = (props) => {
  let input = null;
  let inputClass = "inputElement";
  if (!props.config.valid && props.config.touched)
    inputClass = "inputElement invalid";

  switch (props.config.elementType) {
    case "input":
      input = (
        <input
          type={props.config.elementConfig.type}
          value={props.config.value}
          name={props.config.elementConfig.name}
          id={props.config.elementConfig.id}
          placeholder={props.config.elementConfig.placeholder}
          onChange={props.changed}
          checked={props.config.checked}
          className={inputClass}
        />
      );
      break;
    case "select":
      input = (
        <select
          value={props.config.value}
          onChange={props.changed}
          className="inputElement"
        >
          {props.config.elementConfig.options.map((option) => {
            return <option value={option.value}>{option.displayValue}</option>;
          })}
        </select>
      );
      break;
    default:
      input = null;
      break;
  }
  return (
    <ThemeContextConsumer>
      {(theme) => {
        return (
          <InputWrapper value={theme}>
            {props.config.elementConfig.label && (
              <label htmlFor={props.config.elementConfig.id}>
                {props.config.elementConfig.label}
              </label>
            )}
            {input}
            {!props.config.valid && props.config.touched && (
              <span className="error">{props.config.error.message}</span>
            )}
          </InputWrapper>
        );
      }}
    </ThemeContextConsumer>
  );
};

const InputWrapper = styled.div`
  width: 100%;
  padding-bottom: 1.5rem;
  position: relative;
  .inputElement:not([type="checkbox"]) {
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem 0.8rem;
    font-size: 1.2rem;
    font-family: "Open Sans", sans-serif;
    border: 1px solid ${(props) => props.value.theme.primary.main};
    border-radius: 0.4rem;
    color: ${(props) => props.value.theme.primary.text};
    background-color: ${(props) => props.value.theme.primary.light};
    outline: none;
  }
  .inputElement:focus {
    color: ${(props) => props.value.theme.secondary.text};
    border-color: ${(props) => props.value.theme.primary.dark};
    background-color: ${(props) => props.value.theme.primary.text};
    box-shadow: inset 0px 0px 4px 0px
      ${(props) => props.value.theme.primary.light};
  }
  .inputElement::placeholder {
    color: ${(props) => props.value.theme.primary.dark};
    opacity: 0.5;
  }
  label {
    color: ${(props) => props.value.theme.primary.text};
    font-size: 1.1rem;
    font-weight: 300;
  }
  .inputElement[type="checkbox"] {
    position: relative;
    top: 8px;
    left: 0px;
    border-radius: 0.2rem;
    width: 1.6rem;
    height: 1.6rem;
    outline: none;
  }

  .inputElement[type="checkbox"]:focus {
    color: ${(props) => props.value.theme.secondary.text};
    border-color: ${(props) => props.value.theme.primary.dark};
    background-color: ${(props) => props.value.theme.primary.text};
    box-shadow: inset 0px 0px 4px 0px
      ${(props) => props.value.theme.primary.light};
  }
  .error {
    position: absolute;
    bottom: 0.2rem;
    left: 0;
    color: ${(props) => props.value.theme.secondary.text};
    font-size: 0.8rem;
    font-weight: 300;
    display: inline-block;
    padding-left: 1rem;
    margin-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.2rem;
    background-color: ${(props) => props.value.theme.secondary.light};
  }
  .inputElement.invalid {
    background-color: ${(props) => props.value.theme.secondary.dark};
  }
`;
export default Input;

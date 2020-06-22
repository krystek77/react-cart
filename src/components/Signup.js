import React from "react";
import Title from "./Title";
import Input from "./Input";
import { ButtonWrapper } from "./Button";
import { ThemeContextConsumer } from "../context/theme";
import { AuthContextConsumer } from "../context/auth";
import styled from "styled-components";
import Spinner from "./Spinner";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signupForm: {
        email: {
          elementType: "input",
          elementConfig: {
            type: "text",
            name: "email",
            id: "email",
            placeholder: "Enter your email",
            label: "",
          },
          value: "email@email.pl",
          validation: {
            required: true,
            regExp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          },
          error: {
            message: "It is not valid email",
          },
          valid: false,
          touched: false,
        },
        password: {
          elementType: "input",
          elementConfig: {
            type: "text",
            name: "password",
            id: "password",
            placeholder: "Enter your password",
            label: "",
          },
          value: "A?1aaaaa",
          validation: {
            required: true,
            minLength: 8,
            maxLength: 10,
            regExp: /((?=.*\d)(?=.*[a-zA-Z])(?=.*[@!-'()+--/:?[-`{}~]).{8,10})/,
          },
          error: {
            message:
              "Password must contain one upper case letter, special character, number [8-10].  ",
          },
          valid: false,
          touched: false,
        },
        nick: {
          elementType: "input",
          elementConfig: {
            type: "text",
            name: "nick",
            id: "nick",
            placeholder: "Enter your nick",
            label: "",
          },
          value: "Krys",
          validation: {
            required: true,
            regExp: /^[A-Z]{1}[a-z]+\d*$/,
          },
          error: {
            message:
              "Nick has to contain: first [A-Z],one or more [a-z],0 or more [0-9] ",
          },
          valid: false,
          touched: false,
        },
        accept: {
          elementType: "input",
          elementConfig: {
            type: "checkbox",
            name: "accept",
            id: "accept",
            placeholder: "",
            label: "I agree to the terms",
          },
          checked: true,
          value: "",
          valid: true,
          touched: false,
          validation: {
            checked: true,
          },
          error: {
            message: "You have to agree to the terms",
          },
        },
      },
      totalFormValid: false,
    };
  }

  validationInput = (value, rules) => {
    let valid = true;
    if (rules.required) valid = value.trim() !== "" && valid;
    if (rules.minLength) valid = value.length >= rules.minLength && valid;
    if (rules.maxLength) valid = value.length <= rules.maxLength && valid;
    if (rules.checked) valid = value === rules.checked && valid;
    if (rules.regExp) valid = value.match(rules.regExp) && valid;

    return valid;
  };

  handleInput = (event, id) => {
    const updatedFormData = { ...this.state.signupForm };
    const updatedFormDataInput = { ...updatedFormData[id] };

    if (event.target.type === "checkbox") {
      updatedFormDataInput.checked = event.target.checked;
      updatedFormDataInput.touched = true;
      updatedFormDataInput.valid = this.validationInput(
        updatedFormDataInput.checked,
        updatedFormDataInput.validation
      );
    } else {
      updatedFormDataInput.value = event.target.value;
      updatedFormDataInput.touched = true;
      updatedFormDataInput.valid = this.validationInput(
        updatedFormDataInput.value,
        updatedFormDataInput.validation
      );
    }
    updatedFormData[id] = updatedFormDataInput;

    let totalFormValid = true;
    for (let key in updatedFormData) {
      totalFormValid = updatedFormData[key].valid && totalFormValid;
    }
    this.setState({
      signupForm: updatedFormData,
      totalFormValid,
    });
  };

  formatFormData = (formData) => {
    const formattedFormData = [];
    for (let key in formData) {
      formattedFormData.push({
        id: key,
        config: { ...formData[key] },
      });
    }
    return formattedFormData;
  };

  submitSignupForm = (event, dataAuth, signup) => {
    event.preventDefault();
    signup(dataAuth);
  };

  render() {
    let contentForm = this.formatFormData(this.state.signupForm).map(
      ({ id, config }) => {
        return (
          <Input
            key={id}
            config={config}
            changed={(event) => this.handleInput(event, id)}
          />
        );
      }
    );
    return (
      <div className="container">
        <div className="row">
          <Title title="It seems, you have to signin" />
        </div>
        <div className="row">
          <div className="col-10 col-sm-10 col-md-8 col-lg-6 mx-auto ">
            <ThemeContextConsumer>
              {(theme) => {
                return (
                  <AuthContextConsumer>
                    {(auth) => {
                      return (
                        <React.Fragment>
                          <FormWrapper
                            value={theme}
                            onSubmit={(event) =>
                              this.submitSignupForm(
                                event,
                                {
                                  email: this.state.signupForm.email.value,
                                  password: this.state.signupForm.password
                                    .value,
                                },
                                auth.signup
                              )
                            }
                          >
                            <h2 className="form-title">
                              SIGNUP
                              <Spinner isLoading={auth.isLoading}/>
                            </h2>

                            {contentForm}
                            <ButtonWrapper
                              disabled={
                                this.state.totalFormValid ? false : true
                              }
                              value={theme}
                              className="form-btn"
                              type="submit"
                            >
                              <i className="fas fa-sign-in-alt"></i>
                              <span>SIGNUP</span>
                            </ButtonWrapper>
                          </FormWrapper>
                          {Object.keys(auth.error).length > 0 && (
                            <ErrorMessageWrapper
                              value={theme}
                              className="error-message"
                            >
                              Error: {auth.error.message}
                            </ErrorMessageWrapper>
                          )}
                        </React.Fragment>
                      );
                    }}
                  </AuthContextConsumer>
                );
              }}
            </ThemeContextConsumer>
          </div>
        </div>
      </div>
    );
  }
}

const ErrorMessageWrapper = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
  color: ${(props) => props.value.theme.secondary.dark};
`;

const FormWrapper = styled.form`
  background-color: ${(props) => props.value.theme.primary.main};
  padding: 15px 20px;
  min-width: 320px;
  border: 1px solid ${(props) => props.value.theme.primary.dark};
  border-radius: 0.4rem;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 1);
  .form-title {
    position: relative;
    font-family: "Open Sans", sans-serif;
    text-align: center;
    font-size: 1.2rem;
    color: ${(props) => props.value.theme.primary.text};
    padding-bottom: 1.5rem;
  }
  .fa-sign-in-alt {
    margin-right: 0.5rem;
  }
  .form-btn {
    display: block;
    margin-left: auto !important;
  }
`;

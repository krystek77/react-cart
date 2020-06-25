import React from "react";
import { Redirect } from "react-router-dom";
import Title from "./Title";
import Input from "./Input";
import { ButtonWrapper } from "./Button";
import { ThemeContextConsumer } from "../context/theme";
import { AuthContextConsumer } from "../context/auth";
import Spinner from "./Spinner";
import styled from "styled-components";

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signinForm: {
        email: {
          elementType: "input",
          elementConfig: {
            type: "text",
            name: "email",
            id: "email",
            placeholder: "Enter your email",
            label: "",
          },
          value: "test@test.pl",
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
      },
      totalFormValid: false,
    };
  }
  componentDidUpdate() {
    console.log("[signin.js]-updated");
  }
  componentDidMount() {
    console.log("[signin.js]-mounted");
  }
  validationInput = (value, rules) => {
    let valid = true;
    if (rules.required) valid = value.trim() !== "" && valid;
    if (rules.minLength) valid = value.length >= rules.minLength && valid;
    if (rules.maxLength) valid = value.length <= rules.maxLength && valid;
    // if (rules.checked) valid = value === rules.checked && valid;
    if (rules.regExp) valid = value.match(rules.regExp) && valid;

    return valid;
  };

  handleInput = (event, id) => {
    const updatedFormData = { ...this.state.signinForm };
    const updatedFormDataInput = { ...updatedFormData[id] };

    updatedFormDataInput.value = event.target.value;
    updatedFormDataInput.touched = true;
    updatedFormDataInput.valid = this.validationInput(
      updatedFormDataInput.value,
      updatedFormDataInput.validation
    );

    updatedFormData[id] = updatedFormDataInput;

    let totalFormValid = true;
    for (let key in updatedFormData) {
      totalFormValid = updatedFormData[key].valid && totalFormValid;
    }
    this.setState({
      signinForm: updatedFormData,
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

  submitSigninForm = (event, dataAuth, signin) => {
    event.preventDefault();
    signin(dataAuth);
  };

  render() {
    let contentForm = this.formatFormData(this.state.signinForm).map(
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
                      const isAuthenticated = auth.idToken !== null;
                      let form = null;
                      if (isAuthenticated) form = <Redirect push to="/" />;
                      form = (
                        <React.Fragment>
                          <FormWrapper
                            value={theme}
                            onSubmit={(event) =>
                              this.submitSigninForm(
                                event,
                                {
                                  email: this.state.signinForm.email.value,
                                  password: this.state.signinForm.password
                                    .value,
                                },
                                auth.signin
                              )
                            }
                          >
                            <h2 className="form-title">
                              LOGIN
                              <Spinner isLoading={auth.isLoading} />
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
                              <span>LOGIN</span>
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

                      return form;
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

import React from "react";
import Title from "./Title";
import Input from "./Input";
import { ButtonWrapper } from "./Button";
import { ThemeContextConsumer } from "../context/theme";
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
          value: "",
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
          value: "",
        },
        accept: {
          elementType: "input",
          elementConfig: {
            type: "checkbox",
            name: "accept",
            id: "accept",
            placeholder: "",
            label: "Akceptuję regulamin",
          },
          checked: true,
          value: "",
        },
      },
    };
  }
  handleInput = (event, id) => {
    const updatedFormData = { ...this.state.signinForm };
    const updatedFormDataInput = { ...updatedFormData[id] };
    updatedFormDataInput.value = event.target.value;

    if (updatedFormDataInput.elementConfig.type === "checkbox") {
      updatedFormDataInput.checked = event.target.checked;
      this.setState({
        signinForm: updatedFormData,
      });
    }
    updatedFormData[id] = updatedFormDataInput;

    this.setState({
      signinForm: updatedFormData,
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
              {(theme) => (
                <FormWrapper
                  value={theme}
                  onSubmit={(event) => {
                    event.preventDefault();
                    console.log("Signin form");
                  }}
                >
                  <h2 className="form-title">LOGIN</h2>
                  {contentForm}
                  <ButtonWrapper
                    value={theme}
                    className="form-btn"
                    type="submit"
                  >
                    <i className="fas fa-sign-in-alt"></i>
                    <span>LOGIN</span>
                  </ButtonWrapper>
                </FormWrapper>
              )}
            </ThemeContextConsumer>
          </div>
        </div>
      </div>
    );
  }
}

const FormWrapper = styled.form`
  background-color: ${(props) => props.value.theme.primary.main};
  padding: 15px 20px;
  min-width: 320px;
  border: 1px solid ${(props) => props.value.theme.primary.dark};
  border-radius: 0.4rem;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 1);
  .form-title {
    font-family: "Open Sans", sans-serif;
    text-align: center;
    font-size: 1.2rem;
    color: ${(props) => props.value.theme.primary.text};
  }
  .fa-sign-in-alt {
    margin-right: 0.5rem;
  }
  .form-btn {
    display: block;
    margin-left: auto !important;
  }
`;

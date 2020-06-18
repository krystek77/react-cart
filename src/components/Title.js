import React from "react";
import styled from "styled-components";

export default function Title(props) {
  return (
    <TitleWrapper className="col-10 mx-auto">
      <h1 className="title">{props.title}</h1>
    </TitleWrapper>
  );
}
const TitleWrapper = styled.div`
  padding-top: 2.5rem;
  padding-bottom: 1.5rem;
  .title {
    text-align: center;
    font-family: "Open sans", sans-serif;
    font-weight: 400;
    font-size: 2.4rem;
    text-transform: capitalize;
  }
`;

import React, { useEffect } from "react";
import styled from "styled-components";

export default function Summary(props) {
  const { value, total } = props;
  useEffect(() => {
    return () => {};
  });
  return (
    <SummaryWrapper value={value}>
      <span className="total">
        Total amount: {total && total.toFixed(2)} Euro
      </span>
      <span className="tax">Tax (23%): {(total * 0.23).toFixed(2)} Euro</span>
      <span className="pay">
        To pay: <strong>{total && (total * 1.23).toFixed(2)}</strong> Euro
      </span>
    </SummaryWrapper>
  );
}
const SummaryWrapper = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  margin-left: auto;
  font-size: 1.2rem;
  span {
    display: block;
  }
  .pay {
    position: relative;
    strong {
      font-size: 2.3rem;
      color: ${(props) => props.value.theme.primary.main};
    }
  }
  .pay:after {
    position: absolute;
    left: 0;
    bottom: 0;
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: ${(props) => props.value.theme.primary.dark};
  }
  .tax,
  .total {
    font-family: "Open Sans", sans-serif;
  }
`;

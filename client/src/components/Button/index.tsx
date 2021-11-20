import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: rgb(242, 158, 2);
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  display: block;
  min-width: 80px;
  padding: 12px;
  outline: none;
  transition: background-color 0.3s;

  :hover {
    background-color: rgb(242, 158, 2, 0.5);
    cursor: pointer;
  }
`;

const Button = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>): React.ReactElement => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;

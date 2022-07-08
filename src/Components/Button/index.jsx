import styled from "@emotion/styled";

const Button = styled("button")`
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
  border: ${({ border }) => border};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  width: ${({ btnSize }) => (btnSize === "full" ? "100%" : null)};
  padding: ${({ btnSize }) =>
    btnSize === "sm" || btnSize === "full" ? ".5rem" : btnSize === "md" ? ".5rem 3rem" : btnSize === "lg" && ".5rem 10rem"};
  border-radius: ${({ rounded }) => rounded};
  cursor: ${({ cursor }) => cursor};
`;

Button.defaultProps = {
  bg: "grey",
  color: null,
  border: null,
  fontSize: "1rem",
  fontWeight: "700",
  rounded: ".5rem",
  btnSize: "sm",
  cursor: null,
};

export default Button;

import styled from "@emotion/styled";

const Card = styled("div")`
  background-color: ${props => props.bg};
  border-radius: ${props => props.rounded};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  opacity: ${props => props.opacity};
  max-width: ${props => props.maxWidth};
`;

Card.defaultProps = {
  bg: "white",
  rounded: "16px",
  padding: "16px",
  opacity: null,
  margin: null,
  maxWidth: null,
};

export default Card;

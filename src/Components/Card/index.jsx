import styled from "@emotion/styled";

const Card = styled("div")`
  background-color: ${props => props.bg};
  border-radius: ${props => props.rounded};
  padding: ${props => props.padding};
  opacity: ${props => props.opacity};
`;

Card.defaultProps = {
  bg: "white",
  rounded: "16px",
  padding: "16px",
  opacity: null,
};

export default Card;

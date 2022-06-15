import React from "react";

const CardIcon = ({ color, size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.9375 11.5166C0.9375 11.9518 1.11035 12.3691 1.41803 12.6767C1.7257 12.9844 2.143 13.1573 2.57812 13.1573H12.4219C12.857 13.1573 13.2743 12.9844 13.582 12.6767C13.8896 12.3691 14.0625 11.9518 14.0625 11.5166V7.00493H0.9375V11.5166ZM2.87109 9.29008C2.87109 9.05698 2.96369 8.83343 3.12852 8.6686C3.29335 8.50378 3.5169 8.41118 3.75 8.41118H5.15625C5.38935 8.41118 5.6129 8.50378 5.77773 8.6686C5.94256 8.83343 6.03515 9.05698 6.03515 9.29008V9.87602C6.03515 10.1091 5.94256 10.3327 5.77773 10.4975C5.6129 10.6623 5.38935 10.7549 5.15625 10.7549H3.75C3.5169 10.7549 3.29335 10.6623 3.12852 10.4975C2.96369 10.3327 2.87109 10.1091 2.87109 9.87602V9.29008Z"
        fill={color}
      />
      <path
        d="M12.4219 2.84428H2.57812C2.143 2.84428 1.7257 3.01714 1.41803 3.32481C1.11035 3.63249 0.9375 4.04979 0.9375 4.48491V5.24663H14.0625V4.48491C14.0625 4.04979 13.8896 3.63249 13.582 3.32481C13.2743 3.01714 12.857 2.84428 12.4219 2.84428Z"
        fill={color}
      />
    </svg>
  );
};

CardIcon.defaultProps = {
  color: "white",
  size: 18,
};

export default CardIcon;
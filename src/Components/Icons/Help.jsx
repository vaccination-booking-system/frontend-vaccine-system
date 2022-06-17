import React from "react";

const HelpIcon = ({ color, size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 0C3.85937 0 0.5 3.35937 0.5 7.5C0.5 11.6406 3.85937 15 8 15C12.1406 15 15.5 11.6406 15.5 7.5C15.5 3.35937 12.1406 0 8 0ZM7.76562 11.875C7.61111 11.875 7.46006 11.8292 7.33158 11.7433C7.20311 11.6575 7.10297 11.5355 7.04384 11.3927C6.98471 11.25 6.96924 11.0929 6.99938 10.9413C7.02953 10.7898 7.10394 10.6506 7.2132 10.5413C7.32246 10.4321 7.46166 10.3577 7.61321 10.3275C7.76476 10.2974 7.92184 10.3128 8.06459 10.372C8.20735 10.4311 8.32936 10.5312 8.41521 10.6597C8.50105 10.7882 8.54687 10.9392 8.54687 11.0937C8.54687 11.3009 8.46456 11.4997 8.31805 11.6462C8.17154 11.7927 7.97282 11.875 7.76562 11.875ZM9.07187 7.89062C8.43867 8.31562 8.35156 8.70508 8.35156 9.0625C8.35156 9.20754 8.29394 9.34664 8.19138 9.4492C8.08883 9.55176 7.94973 9.60937 7.80469 9.60937C7.65965 9.60937 7.52055 9.55176 7.41799 9.4492C7.31543 9.34664 7.25781 9.20754 7.25781 9.0625C7.25781 8.20664 7.65156 7.52617 8.46172 6.98203C9.21484 6.47656 9.64062 6.15625 9.64062 5.45195C9.64062 4.97305 9.36719 4.60937 8.80117 4.34023C8.66797 4.27695 8.37148 4.21523 8.00664 4.21953C7.54883 4.22539 7.19336 4.33476 6.91953 4.55508C6.40312 4.9707 6.35937 5.42305 6.35937 5.42969C6.35591 5.5015 6.33834 5.57193 6.30765 5.63696C6.27697 5.70198 6.23378 5.76033 6.18055 5.80866C6.12732 5.857 6.06509 5.89437 5.99742 5.91866C5.92974 5.94294 5.85795 5.95366 5.78613 5.95019C5.71431 5.94673 5.64388 5.92916 5.57886 5.89848C5.51383 5.86779 5.45549 5.8246 5.40716 5.77137C5.35882 5.71814 5.32145 5.65591 5.29716 5.58824C5.27288 5.52056 5.26216 5.44877 5.26562 5.37695C5.26992 5.28203 5.33594 4.42695 6.2332 3.70508C6.69844 3.33086 7.29023 3.13633 7.99101 3.12773C8.48711 3.12187 8.95312 3.20586 9.26914 3.35508C10.2148 3.80234 10.7344 4.54805 10.7344 5.45195C10.7344 6.77344 9.85117 7.3668 9.07187 7.89062Z"
        fill={color}
      />
    </svg>
  );
};

HelpIcon.defaultProps = {
  color: "white",
  size: 18,
};

export default HelpIcon;
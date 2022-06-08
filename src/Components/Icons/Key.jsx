import React from "react";

const KeyIcon = ({ color }) => {
  return (
    <svg width="18" height="18" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.93574 3.64989C4.93574 3.92919 4.93574 4.19989 5.02383 4.45341C4.09785 5.54052 1.65293 8.41298 1.4252 8.63212C1.37993 8.67273 1.34373 8.72241 1.31893 8.77793C1.29413 8.83345 1.28129 8.89357 1.28125 8.95438C1.28125 9.137 1.39297 9.31317 1.4875 9.412C1.6293 9.56024 2.23516 10.121 2.34687 10.0136C2.67773 9.6913 2.74434 9.60536 2.87969 9.47216C3.08379 9.27235 2.8582 8.86415 2.9291 8.69872C3 8.53329 3.0752 8.50106 3.19766 8.47528C3.32012 8.4495 3.53711 8.53759 3.70684 8.53973C3.88516 8.54188 3.98184 8.46669 4.11504 8.34208C4.22246 8.24325 4.2998 8.15087 4.30195 8.00692C4.30625 7.81356 4.02695 7.5579 4.23535 7.3538C4.44375 7.1497 4.74453 7.487 4.96582 7.46122C5.18711 7.43544 5.45566 7.12821 5.48359 6.99716C5.51152 6.8661 5.23223 6.5288 5.27519 6.33759C5.29023 6.27313 5.42129 6.12274 5.52012 6.10126C5.61895 6.07977 6.05723 6.2495 6.15605 6.22802C6.27637 6.20224 6.41602 6.07548 6.52988 6.00458C6.86289 6.14852 7.16582 6.20653 7.55469 6.20653C9.02637 6.20653 10.2187 5.05927 10.2187 3.6456C10.2187 2.23192 9.02637 1.0896 7.55469 1.0896C6.08301 1.0896 4.93574 2.23622 4.93574 3.64989ZM8.84375 3.1521C8.84375 3.28807 8.80343 3.42099 8.72788 3.53405C8.65234 3.64711 8.54497 3.73523 8.41934 3.78727C8.29372 3.8393 8.15549 3.85292 8.02212 3.82639C7.88876 3.79986 7.76626 3.73438 7.67011 3.63823C7.57397 3.54209 7.50849 3.41959 7.48196 3.28622C7.45543 3.15286 7.46905 3.01463 7.52108 2.889C7.57312 2.76338 7.66124 2.65601 7.77429 2.58046C7.88735 2.50492 8.02027 2.4646 8.15625 2.4646C8.33859 2.4646 8.51345 2.53703 8.64239 2.66596C8.77132 2.79489 8.84375 2.96976 8.84375 3.1521Z"
        fill={color}
      />
    </svg>
  );
};

KeyIcon.defaultProps = {
  color: "#2D3748",
};

export default KeyIcon;

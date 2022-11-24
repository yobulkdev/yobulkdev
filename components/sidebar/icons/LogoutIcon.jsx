import * as React from "react";

function LogoutIcon({ fill = "#6C7281", ...rest }) {
  return (
    <svg
      width={16}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M8 19c4.411 0 8-3.589 8-8 0-3.35-2.072-6.22-5-7.41v2.222A6 6 0 0114 11c0 3.31-2.691 6-6 6s-6-2.69-6-6a5.999 5.999 0 013-5.188V3.59C2.072 4.78 0 7.65 0 11c0 4.411 3.589 8 8 8z"
        fill={fill}
      />
      <path d="M7 0h2v10H7V0z" fill={fill} />
    </svg>
  );
}

export default LogoutIcon;

import * as React from "react";

function CollapsIcon({ fill = "#6C7281", ...rest }) {
  return (
    <svg
      width={16}
      height={15}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M8.901 1.768L7.134 0 0 7.134l7.134 7.133L8.9 12.5 3.535 7.134l5.366-5.367z"
        fill={fill}
      />
      <path
        d="M13.384 0L6.25 7.134l7.134 7.133L15.15 12.5 9.785 7.134l5.366-5.367L13.384 0z"
        fill={fill}
      />
    </svg>
  );
}

export default CollapsIcon;

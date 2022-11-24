import * as React from "react";

function Logo({ fill = "#3B81F6", ...rest }) {
  return (
    <svg
      width={40}
      height={40}
      fill="none"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M22.5 32.5h10V35h-10v-2.5zm0-5h15V30h-15v-2.5zm0-5h15V25h-15v-2.5z"
        fill={fill}
      />
      <path
        d="M25.686 14.021L20 2.5l-5.686 11.521L1.6 15.87l9.2 8.968L8.628 37.5l8.872-4.664v-2.825L11.95 32.93l1.315-7.67.222-1.296-.94-.916-5.573-5.434 7.7-1.119 1.3-.189.583-1.179L20 8.15l3.444 6.979.582 1.178 1.3.189 9.318 1.356.356-2.476-9.314-1.354z"
        fill={fill}
      />
    </svg>
  );
}

export default Logo;

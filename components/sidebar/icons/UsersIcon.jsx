import * as React from "react";

function UsersIcon({ stroke = "#6C7281", ...rest }) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M12 4.354a4 4 0 110 5.292V4.354zM15 21H3v-1a6 6 0 1112 0v1zm0 0h6v-1a6 6 0 00-9-5.197L15 21zM13 7a4 4 0 11-8 0 4 4 0 018 0v0z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default UsersIcon;

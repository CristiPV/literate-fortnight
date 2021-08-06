import React from "react";

const UserInfo = (props) => {
    const {
        user
    } = props
  return (
    <div className="">
      <p className="w-max m-auto text-green-300 sm:text-3xl text-xs">User: {user.name} balance: {user.funds}</p>
    </div>
  );
};

export default UserInfo;

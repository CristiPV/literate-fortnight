import React from "react";

const UserInfo = (props) => {
    const {
        user
    } = props
  return (
    <div className="flex flex-row">
      <p className="w-max m-auto text-green-300 text-3xl">User: {user.name} balance: {user.funds}</p>
    </div>
  );
};

export default UserInfo;

import React from "react";
import { useAuthDataContext } from "components/AuthDataProvider";
import { Link } from 'react-router-dom'

const UserInfo = () => {
  const { user, onLogout } = useAuthDataContext();

  if (!user) {
    return <Link to="/">Please log in</Link>;
  }

  return (
    <div>
      <p>Hello {user.name}</p>
      <button onClick={onLogout}>Log out</button>
    </div>
  );
};

export default UserInfo;
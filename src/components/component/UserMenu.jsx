"use client"
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../helper/authProvider';

const UserMenu = () => {
  const {
    user: { displayName, photoURL, auth, email },
  } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    auth.signOut();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <div className="flex items-center cursor-pointer" onClick={toggleMenu}>
        <img
          src={photoURL}
          alt="avatar"
          className="w-9 h-9 mr-2 rounded-full"
        />
        <span className="text-white">{displayName}</span>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 text-black bg-white border rounded shadow">
          <button
            className="block w-full py-2 text-left px-4 hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default UserMenu;
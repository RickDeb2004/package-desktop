// create a popup component for 404 page invalid credentials with an ok button

// Path: src/components/component/404.jsx

// Create a new file named 404.jsx in the src/components/component folder and add the following code to it:

import React from "react";
import { Dialog } from "@headlessui/react";

const NotFound = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-70">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="relative bg-white p-4 rounded-md shadow-lg max-w-md w-full">
          <Dialog.Title className="text-lg font-bold text-gray-900">
            <span className="ml-2">BAD CREDENTIALS</span>
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mt-2">
            Invalid email or password. Please try again.
          </Dialog.Description>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              OK
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default NotFound;
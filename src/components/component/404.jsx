import React from "react";
import { Dialog } from "@headlessui/react";

const NotFound = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto bg-black backdrop-blur-lg bg-opacity-50"
    >
      <div className="flex  items-center justify-center min-h-screen">
        <Dialog.Panel className="relative bg-gradient-to-r from-[#ffa500] to-[#ECD06F] p-4 rounded-lg shadow-lg max-w-md w-full">
          <Dialog.Title className="text-lg font-bold text-gray-900">
            <span className="ml-2 font-bold font-sans text-2xl">
              BAD CREDENTIALS !
            </span>
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-800 font-semibold m-2">
            Invalid email or password. Please try again.
          </Dialog.Description>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 w-28 text-sm font-semibold text-black bg-amber-500 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              OK
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default NotFound;

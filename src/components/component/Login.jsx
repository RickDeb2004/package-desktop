import { Input } from "../uivo/input";
import { Button } from "../uivo/button";
import { useEffect, useState } from "react";
import { getAdminData } from "@/helper/controller";
import { get } from "firebase/database";
import NotFound from "./404";

export default function Component({ onLoginSuccess }) {
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); 
  const [open, setOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true); 

    getAdminData((data) => {
     
      setTimeout(() => {
        setLoading(false); 
        if (
          adminData.email === data.email &&
          adminData.password === data.password
        ) {
          onLoginSuccess();
        } else {
          setOpen(true);
        }
      }, 2000); 
    });
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center " style={{background: 'linear-gradient(135deg, #ECD06F, #fff3e0)'}}>
      <div className="max-w-md w-full  rounded-lg p-8 shadow-2xl" style={{background: 'linear-gradient(135deg, #ECD06F, #ffa500)'}}>
        <h2 className="text-3xl font-bold text-black mb-8">
          Login To Continue
        </h2>
        <form className="bg-blend-saturation space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-black">
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm text-black">
              <Input
                name="email"
                value={adminData.email}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 rounded-md leading-5 bg-[#064e3b] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                placeholder="admin@gmail.com"
                type="email"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="text-gray-300" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <Input
                name="password"
                value={adminData.password}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 rounded-md leading-5 bg-[#064e3b] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                placeholder="admin@1234"
                type="password"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="text-gray-300" />
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-white font-mono font-semibold text-[#065f46] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
              disabled={loading} 
              style={{background: 'linear-gradient(135deg, #ECD06F, #ffa500)'}}
            >
              {loading ? "Loading..." : "Login"} 
            </Button>
          </div>
        </form>
      </div>
    </div>
    <NotFound open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

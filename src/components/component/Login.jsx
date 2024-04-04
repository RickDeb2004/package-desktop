"use client";
import { Input } from "../uivo/input"
import { Button } from "../uivo/button"
import Link from "next/link"

export default function Component() {
return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#FAF9F6] to-orange-300">
        <div className="max-w-md w-full bg-black bg-opacity-55  rounded-lg p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8">Login To Continue</h2>
            <form className="bg-blend-saturation space-y-6 ">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Email</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <Input
                            className="block w-full pl-10 pr-3 py-2 rounded-md leading-5 bg-[#064e3b] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                            placeholder="admin@example.com"
                            type="email"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MailIcon className="text-gray-300" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Password</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <Input
                            className="block w-full pl-10 pr-3 py-2 rounded-md leading-5 bg-[#064e3b] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                            placeholder="••••••••"
                            type="password"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <LockIcon className="text-gray-300" />
                        </div>
                    </div>
                </div>
                
                <div>
                    <Button className="w-full bg-white text-[#065f46] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400">
                        Login
                    </Button>
                </div>
            </form>
           
        </div>
    </div>
)
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
  )
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
  )
}

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../helper/authProvider";

// import {firebaseConfig} from '../firebase'
// import { initializeApp } from 'firebase/app';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "News store",
  description: "News store is a news website that provides the latest news from around the world.",
};

// initializeApp(firebaseConfig);

export default function RootLayout({ children }) {
  // initialize firebase
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

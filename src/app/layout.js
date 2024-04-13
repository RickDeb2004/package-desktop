import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../helper/authProvider";




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "News store",
  description: "News store is a news website that provides the latest news from around the world.",
};



export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

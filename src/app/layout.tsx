"use client"; 

import "./globals.css";
import { ReactNode} from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen`}
      >
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;

"use client";
import AuthProvider from "@/context/AuthContext";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  return <>
    <AuthProvider>
      {children}
    </AuthProvider>
  </>;
};

export default AppProvider;

import { ReduxProvider } from "@/redux/Provider/ReduxProvider";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}

export default Layout;

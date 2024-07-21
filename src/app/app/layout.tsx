"use client";
import {useState } from "react";
import { usePathname } from "next/navigation";
import BasicModal from "@/components/ui/BasicModal/BasicModal";
import AddFriendModel from "@/components/ui/AddFriendModel/AddFriendModel";
import { ReduxProvider } from "@/redux/Provider/ReduxProvider";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const [state, setState] = useState(false);



  return (
    <ReduxProvider>
      <div className="relative flex gap-2 bg-white">
       
        <div className="w-full relative md:pl-[85px]">
          <main className="flex content-center">
            <div
              className="container py-10"
            >
              {children}
            </div>
          </main>
        </div>

        {/* <BasicModal
          hide={setState}
          show={state}
          // iconClass="hidden"
          className="!rounded-[33px]"
        >
          <div className="w-[450px] xs:w-[380px] xs1:w-[320px]">
            <AddFriendModel setState={setState} />
          </div>
        </BasicModal> */}
      </div>
    </ReduxProvider>
  );
}

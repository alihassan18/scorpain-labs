import axiosInstance from "@/api/http";
import { Button } from "@/components/common";
import Input from "@/components/common/Forms/Input";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import * as Cookies from "js-cookie";
import { toast } from "react-toastify";
import { getObjectFromLocalStorage } from "@/utils/storage";

interface Iprops {
  setState: Function
};

const AddFriendModel = ({setState} : Iprops) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // const userDataString = Cookies.default.get('user');
  // let userData;
  // if (userDataString) {
  //     userData = JSON.parse(userDataString);
  // }
  const user = getObjectFromLocalStorage("user");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/invite-friend", {
        email: email,
        invited_by: user?._id,
        username:user.username,
        link: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-up`,
      });
      if (response.data) {
        // Cookies.default.set('user', JSON.stringify(response.data));
        
        toast.success("Invitation Sent");
        setLoading(false);
        setState && setState(false);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something wen wrong");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold flex justify-center">
          Invite a Friend
        </h2>
        <p className="flex justify-center">Building Connections That Last</p>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="my-4">
            <Input
              placeholder="Enter Email"
              name="email"
              type="email"
              className="focus:border-black border-[#D0D0D0] !border-[3px] !rounded-[20px] "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="flex items-center w-full !px-3.5 flex-shrink-0 gap-2"
          >
            {loading ? "Loading..." : "SEND INVITE"}
            <span>
              <FaArrowRightLong />
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddFriendModel;

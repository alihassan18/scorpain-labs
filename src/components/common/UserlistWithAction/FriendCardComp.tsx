import Link from "next/link";
import ImageComponent from "../ImageComponent";
import Button from "../Button";
import axiosInstance from "@/api/http";
import { toast } from "react-toastify";
import { useState } from "react";

interface Iprops {
    user: any
    state: number,
    data: any,
    updateUser: Function
}

const FriendCardComp = ({user, data, state: inCommingState, updateUser} : Iprops) => {
    const [state, setState] = useState(inCommingState)
    const [isLoading, setIsLoading] = useState(false)
    const onAdd = async (item: any) => {
        const payload = {
          userId: user?._id,
          userName: user?.first_name + " " + user?.last_name,
          userImage: user?.image,
          friendId: item?._id,
          friendName: item?.first_name + " " + item?.last_name,
          friendEmail: item?.email,
        };
        try {
          const res = await axiosInstance.post(`users/friendRequest/viaEmail`, payload)
          console.log('res.data.user', res)
          if (res.status == 201 && res.data.user) {
            console.log('res.data.user',res.data.user);
            updateUser(res.data.user);
            toast.success('A Friend request has been sent to this user.');
          }
        } catch (error: any) {
          toast.error(error.message);
        } finally {
         
        }
    };

    
    const onRemove = async (item: any) => {
        const payload = {
            friendId: item._id,
        };

        try {
            const res = await axiosInstance.put(`users/${user._id}/removeFriend`, payload)
            if (res.status == 201 && res.data.user) {
                updateUser(res.data.user);
                toast.success('User removed from your firend list.');
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
        
        }
    };

    
    
  const onAction = async (item: any, state: number) => {
    if(item) {
      if(state == 0) {
        setIsLoading(true)
        await onAdd(item);
        setIsLoading(false)
        setState(1);
      }
      if(state == 2) {
        setIsLoading(true)
        await onRemove(item);
        setIsLoading(false)
        setState(0);
      }
    } 
  }

    return (
        <>
            <div className=" p-4  bg-white flex gap-4 sm:flex-row flex-col  border border-borderColor items-center   shadow-md  rounded-[20px]">
                <Link
                    href={
                    data._id === user._id ? `/app/profile` : `/app/profile/${data._id}`
                    }
                >
                    <div className="rounded-full sm:mt-0 -mt-10">
                        <ImageComponent
                            src={ data.image || "https://www.ateamsoftsolutions.com/wp-content/uploads/2020/09/user-dummy.jpg"}
                            figClassName="md:h-[80px] md:w-[80px] sm:h-[60px] sm:w-[60px] h-[50px] w-[50px]"
                            className="rounded-full object-cover"
                            fill
                        />
                    </div>
                </Link>

                <div className="sm:py-2">
                    <Link
                        href={data._id === user._id ? `/app/profile` : `/app/profile/${data._id}` }
                    >
                        <h2 className="font-bold  text-center  sm:text-left max-w-[10.5rem] xs:max-w-[7rem] truncate    2xl:text-xl sm:text-lg text-base xs:text-sm xs1:text-xs text-[#101010]">
                            {data.first_name + " " + data.last_name}
                        </h2>
                        <span className="block text-center sm:text-left text-lightGray sm:text-sm text-xs xs1:text-[text-10px] font-normal leading-[18px]">
                            {`@${data.username}`}
                        </span>
                    </Link>
                    <div className="flex justify-center items-center sm:block sm:mt-0 mt-2">
                        {data._id !== user._id && (
                            <Button
                                className="flex !rounded-[5px] items-center gap-2 xs:!text-xs !py-2 !px-3"
                                onClick={(event: any) => {
                                    console.log('data._id',data._id);
                                    onAction  && onAction(
                                        data, // to,
                                        state 
                                    )
                                }}
                                isLoading={isLoading}
                                disabled={state == 1 ? true : false}
                            >
                                {state == 2 && "Unfriend"}
                                {state == 1 && "Request Sent"}
                                {state == 0 &&
                                <>
                                    <svg
                                    className=""
                                    width="16"
                                    height="16"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        d="M1.93359 20C1.50211 20 1.15234 19.6502 1.15234 19.2188C1.15234 15.2986 4.3416 12.1094 8.26172 12.1094H9.43359C10.2358 12.1094 11.0236 12.2422 11.7749 12.5041C12.1823 12.6461 12.3975 13.0916 12.2554 13.499C12.1134 13.9064 11.6679 14.1216 11.2605 13.9795C10.6749 13.7754 10.0603 13.6719 9.43359 13.6719H8.26172C5.20316 13.6719 2.71484 16.1602 2.71484 19.2188C2.71484 19.6502 2.36508 20 1.93359 20ZM14.043 5.27344C14.043 2.36566 11.6773 0 8.76953 0C5.86176 0 3.49609 2.36566 3.49609 5.27344C3.49609 8.18121 5.86176 10.5469 8.76953 10.5469C11.6773 10.5469 14.043 8.18121 14.043 5.27344ZM12.4805 5.27344C12.4805 7.31965 10.8157 8.98438 8.76953 8.98438C6.72332 8.98438 5.05859 7.31965 5.05859 5.27344C5.05859 3.22723 6.72332 1.5625 8.76953 1.5625C10.8157 1.5625 12.4805 3.22723 12.4805 5.27344ZM18.0664 15.3125H15.7227V12.9688C15.7227 12.5373 15.3729 12.1875 14.9414 12.1875C14.5099 12.1875 14.1602 12.5373 14.1602 12.9688V15.3125H11.8164C11.3849 15.3125 11.0352 15.6623 11.0352 16.0938C11.0352 16.5252 11.3849 16.875 11.8164 16.875H14.1602V19.2188C14.1602 19.6502 14.5099 20 14.9414 20C15.3729 20 15.7227 19.6502 15.7227 19.2188V16.875H18.0664C18.4979 16.875 18.8477 16.5252 18.8477 16.0938C18.8477 15.6623 18.4979 15.3125 18.0664 15.3125Z"
                                        fill="#fff"
                                    />
                                    </svg>
                                    Add Friend
                                </>
                                }
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default FriendCardComp;
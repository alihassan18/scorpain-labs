"use client";

import { Button, ImageComponent } from "@/components/common";
import { Arrow } from "@/components/common/Icons";
import { useEffect, useState } from "react";
import PinField from "react-pin-field";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import authApi from '@/api/endpoints/auth';
import { useMainStore } from "@/zustand/mainStore";
import * as Cookies from 'js-cookie';

const SignuCodeVerification = () => {
    const [isLoading, setisLoading] = useState(false);
    const appStore = useMainStore();
    const user = appStore.user;
    const [pin, setPin] = useState("");
    const [timer, setTimer] = useState(60); // Timer starts at 60 seconds
    const [isResendEnabled, setIsResendEnabled] = useState(false); // Initially false
    const router = useRouter();

    useEffect(() => {
        let interval: number | undefined;

        if (timer > 0) {
            interval = window.setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else {
            setIsResendEnabled(true); // Enable resend button when timer hits 0
            if (interval !== undefined) {
                clearInterval(interval);
            }
        }

        return () => {
            if (interval !== undefined) {
                clearInterval(interval);
            }
        };
    }, [timer]);

    const cookiesUser = Cookies.default.get('user');
    let myUser = cookiesUser ? JSON.parse(cookiesUser) : null;
    const token = Cookies.default.get('access_token');
    const rememberToken = Cookies.default.get('remember_token');

    const onSubmit = async () => {
        setisLoading(true);
        try {
            const data = {
                otp: pin,
                token: rememberToken || ""
            };
            const response = await authApi.otpVerificationEndPoint(data);
            if (!response.data.access_token) {
                toast.error("Invalid/Expire OTP");
                return;
            }
            toast.success('OTP verified successfully');
            if (response.data.record) {
                router.push('/auth/question');
            }
        } catch (error) {
            toast.error("Verification failed. Try again.");
        } finally {
            setisLoading(false);
        }
    };

    const reSendOtp = async () => {
        setIsResendEnabled(false); // Disable resend button
        setTimer(60); // Reset timer to 60 seconds
        try {
            const payload = { email: myUser.email };
            const response = await authApi.otpRegenerateEndPoint(payload);
            if (response.status !== 200) {
                toast.error("Something went wrong");
                return;
            }
            const token = response.data.data.token;
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', token);
            }
            toast.success('OTP sent!');
        } catch (error) {
            console.log(error);
            
        }
    };

    const handlePinChange = (value:any)=>{
        setPin(value)
    }
    return (
        <div className="flex flex-col items-center justify-center w-fit mx-auto mt-20">
            <ImageComponent
                src="/assets/images/auth/loginbg.png"
                fill
                figClassName="w-full h-full !absolute top-0"
                className="object-cover"
                alt=""
            />
            <div className="z-40 mt-24">
                <h2 className="text-center text-4xl 2xl:text-[40px] mt-4 2xl:mt-8 font-semibold">
                    Confirm Your Email
                </h2>
                <p className="text-base text-center mt-4 2xl:mt-6">
                    Did not get the code yet?{" "}
                    {isResendEnabled ? (
                        <span
                        onClick={reSendOtp}
                        className={`text-base font-medium underline text-primary cursor-pointer`}
                    >
                        Resend
                    </span>
                    ):(
                        <span className="text-xl font-medium !cursor-not-allowed">
                        {timer === 0 ? "" : `00:${String(timer).padStart(2, '0')}`}
                       </span>
                    )}
                    {/* <span
                        onClick={reSendOtp}
                        className={`text-base font-medium underline text-primary cursor-pointer ${!isResendEnabled ? "opacity-50 !cursor-not-allowed" : ""}`}
                    >
                        Resend
                    </span> */}
                </p>
               
                <div className="mx-auto grid grid-cols-6 gap-3 mt-5 2xl:mt-10">
                    <PinField
                        type="string"
                        length={6}
                        validate={/^[0-9]$/}
                        onChange={handlePinChange}
                        className="h-10 w-10 sm:h-[50px] sm:w-[50px] 2xl:h-[70px] 2xl:w-[70px] overflow-y-auto rounded-xl 2xl:rounded-[20px] border-2 sm:border-[4px] border-[#D0D0D0] focus:border-0 bg-white text-center text-lg sm:text-2xl 2xl:text-3xl font-medium outline-royalBlue !outline-[8px] outline-offset-0"
                    />
                </div>
                <Button
                    className="mt-4 2xl:mt-7 w-full flex gap-2 2xl:!py-6 !text-xl 2xl:!text-[22px]"
                    type="submit"
                    disabled={pin.length < 6 || isLoading} // Make sure pin length is 6
                    onClick={onSubmit}
                >
                    {isLoading ? "Loading..." : "Submit"}
                    {!isLoading && <Arrow />}
                </Button>
            </div>
        </div>
    );
};

export default SignuCodeVerification;

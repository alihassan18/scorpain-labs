import { Button, ImageComponent } from "@/components/common";
import { Arrow } from "@/components/common/Icons";
import { useState, useEffect } from "react";
import PinField from "react-pin-field";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import authApi from "@/api/endpoints/auth";

interface IProps {
  setScreen(state: number): void;
  setCode: Function;
  email: string;
}

const CodeVerification = ({ setScreen, email, setCode }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [timer, setTimer] = useState(60); // Timer starts at 60 seconds
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const router = useRouter();
  const token = localStorage.getItem("token");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null; // Initialize interval to null

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setIsResendEnabled(true);
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval); // Clear the interval if it's not null
    };
  }, [timer]);

  const onSubmit = async () => {
    const data: any = {
      otp: pin,
      token: token,
    };
    setIsLoading(true);
    try {
      const response = await authApi.otpVerificationEndPoint(data);
      if (response.status !== 200) {
        toast.error("OTP not found");
        return;
      }
      setScreen(3);
      toast.success("OTP verified successfully");
    } catch (error) {
      console.error(error);
      toast.error("Verification failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reSendOtp = async () => {
    if (!isResendEnabled) return;

    const data = { email: email };
    setTimer(60); // Reset timer to 60 seconds
    setIsResendEnabled(false);
    setLoading(true);
    try {
      const response = await authApi.otpRegenerateEndPoint(data);
      if (response.status !== 200) {
        toast.error("Something went wrong");
        return;
      }
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      toast.success("Verification OTP sent to your email!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePinChange = (value:any)=>{
    setPin(value)
}


  return (
    <div className="flex flex-col items-center justify-center w-fit mx-auto pb-10">
      <ImageComponent
        src="/assets/images/auth/loginbg.png"
        fill
        figClassName="w-full h-full !absolute top-0"
        className="object-cover xs:hidden"
        alt=""
      />
      <div className="z-40">
        <h2 className="text-center text-4xl 2xl:text-[40px] mt-4 2xl:mt-8 font-semibold xs:text-[30px] xs:mt-0">
          Confirm Your Email
        </h2>

        <p className="text-base text-center mt-4 2xl:mt-6 flex items-center gap-2 justify-center">
          Did not get the code yet?{" "}
          {
            !isResendEnabled ? (
              <div className="text-base font-medium text-primary !cursor-not-allowed">
              {timer === 0 ? (
                ""
              ) : (
                <p>{`00:${String(timer).padStart(2, '0')}`}</p>
              )}
            </div>
            ):(
              <span
              onClick={reSendOtp}
              className="text-base font-medium underline text-primary cursor-pointer"
            >
              Resend
            </span>
             
            )
          }
         
            <span className="ml-2">
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-[#0000007e] animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                ""
              )}
            </span>
        </p>
       
        <div className="mx-auto grid grid-cols-6 gap-3 mt-5 2xl:mt-4">
          <PinField
            type="string"
            length={6}
            validate={/^[0-9]$/}
            onChange={handlePinChange}
            className="h-10 w-10 sm:h-[50px] sm:w-[50px] 2xl:h-[70px] 2xl:w-[70px] overflow-y-auto rounded-xl 2xl:rounded-[20px] border-2 sm:border-[4px] border-[#D0D0D0] focus:border-0 bg-white text-center text-lg sm:text-2xl 2xl:text-3xl font-medium outline-royalBlue !outline-[8px] outline-offset-0"
          />
        </div>
        <div className="xs:flex xs:justify-center items-center">
          <Button
            className="mt-4 2xl:mt-7 w-full flex gap-2 2xl:!py-6 py-3 xs:!text-sm !text-xl 2xl:!text-[22px] xs:w-[215px]"
            type="submit"
            disabled={pin.length < 5 || isLoading}
            onClick={onSubmit}
          >
            {isLoading ? "Loading..." : "Submit"}
            {!isLoading && (
              <span>
                <Arrow className="xs:h-3 xs:w-3" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeVerification;

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/react";
import { InputOtp } from "@heroui/react";
import OtpInputs from "react-otp-input";
const OtpInput = ({
  numberOfDigits,
  handleChangeOtp,
  otpError,
  setTyping,
  typing,
  resendClicked,
  setResendClicked,
}: {
  numberOfDigits: number;
  handleChangeOtp: (newOtp: string) => void;
  otpError: string | null;
  setTyping: (typing: boolean) => void;
  typing: boolean;
  resendClicked: boolean;
  setResendClicked: (clicked: boolean) => void;
}): any => {
  const [otp, setOtp] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    if (otpError) {
      setOtp("");
    }
  }, [otpError]);

  useEffect(() => {
    if (resendClicked) {
      setOtp("");
      handleChangeOtp("");
      inputsRef.current.forEach((input) => {
        if (input) input.value = "";
      });
      setResendClicked(false);
    }
  }, [resendClicked, handleChangeOtp, setResendClicked]);

  const handleChange = (value: string) => {
    const onlyDigits = value.replace(/\D/g, ""); // Remove non-numeric characters
    if (onlyDigits.length <= numberOfDigits) {
      setOtp(onlyDigits);
      handleChangeOtp(onlyDigits);
      setTyping(true);
    }
  };

  const handleOTPChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;


    let newOtp: any = otp.split("");
    newOtp[index] = value;
    newOtp = newOtp.join("").slice(0, numberOfDigits);

    handleChange(newOtp); // Pass full OTP value

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const digits = pastedData.split("");

    digits.forEach((digit, idx) => {
      if (inputsRef.current[idx]) {
        inputsRef.current[idx]!.value = digit;
      }
    });
    const newOpt: any = digits.join("");
    handleChange(newOpt);

    const nextEmptyIndex = digits.length < 6 ? digits.length : 5;
    inputsRef.current[nextEmptyIndex]?.focus();
  };

  return (
    <article className="w-full">
      <div className="w-2/4	flex items-center gap-2 justify-center mx-auto">
        <div className="flex space-x-2">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              pattern="[0-9]"
              maxLength={1}
              style={{ borderRadius: "20%", fontSize: "22px" }}
              className="w-16 h-16 text-center border rounded cursor-text focus:outline-none focus:ring-2 focus:ring-[#0070f0]"
              onChange={(e) => handleOTPChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
            />
          ))}
        </div>
      </div>
      {otpError && !typing ? (
        <p className={`text-sm mt-4 text-red-700`}>{otpError}</p>
      ) : null}
    </article>
  );
};

export default OtpInput;

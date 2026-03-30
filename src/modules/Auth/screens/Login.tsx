"use client";

import { Button, Input, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import React, { useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { FaEyeSlash } from "react-icons/fa6";
import { TbEyeFilled } from "react-icons/tb";
import { getClientIP } from "@/helpers/clientIP";

const validationSchema = Yup.object().shape({
  identifier: Yup.string().required("Username or Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Minimum 6 characters required"),
});

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (values: {
    identifier: string;
    password: string;
  }) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const res = await signIn("credentials", {
        email: values.identifier,
        password: values.password,
        user_agent: navigator.userAgent,
        ip_address: await getClientIP(),
        redirect: false,
      });

      if (res?.error) {
        setLoginError(res.error);
        return;
      }

      // Fetch updated session
      const updatedSession = await fetch("/api/auth/session").then((r) =>
        r.json()
      );

      // Account inactive check
      if (updatedSession?.user?.account_status === "Inactive") {
        setLoginError(
          "Your account is disabled. Please contact your administrator."
        );
        return;
      }

      // Role-based redirect
      router.push("/dashboard");
    } catch (error) {
      setLoginError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 min-h-screen">
      <div className="flex justify-center items-center flex-col bg-white">
        <div className="text-center">
          {/* <img src="/assets/images/logo.png" alt="Logo" /> */}
          <div className="font-bold text-xl mt-8 text-[#001F3F]">
            Welcome. Please login to continue.
          </div>
        </div>

        <Formik
          initialValues={{ identifier: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange }) => (
            <div className="mt-5 lg:w-1/3 w-10/12">
              <Form>
                <div className="mt-5">
                  <Input
                    label="Username or Email"
                    name="identifier"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <ErrorMessage
                    component="p"
                    name="identifier"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mt-5">
                  <Input
                    label="Password"
                    name="password"
                    type={isVisible ? "text" : "password"}
                    onChange={handleChange}
                    endContent={
                      <button type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                          <FaEyeSlash className="text-xl" />
                        ) : (
                          <TbEyeFilled className="text-xl" />
                        )}
                      </button>
                    }
                  />
                  <ErrorMessage
                    component="p"
                    name="password"
                    className="text-red-500 text-sm"
                  />
                </div>

                {loginError && (
                  <p className="text-red-600 mt-2">{loginError}</p>
                )}

                <div className="text-sm underline text-end mt-2">
                  <Link href="/login/forget-password">
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  color="primary"
                  className="w-full my-5"
                  size="lg"
                  type="submit"
                  isDisabled={isLoading}
                >
                  {!isLoading ? "Login" : <Spinner color="white" />}
                </Button>
              </Form>
            </div>
          )}
        </Formik>
      </div>

      
    </div>
  );
}

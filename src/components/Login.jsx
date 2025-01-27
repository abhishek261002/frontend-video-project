import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice.js";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authservice from "../services/auth.service.js";
import { Input, Button, Logo } from "./index.js";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authservice.login({ ...data });
      if (session) {
        const data = await authservice.getCurrentUser();
        console.log(data);
        if (data) {
          dispatch(storeLogin(data));
        }
        navigate("/");
      }
    } catch (error) {
     
      setError(error?.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don't have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            SIGNUP
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
        <p className=" text-center text-base text-black/60">ENTER EMAIL OR USERNAME</p>
          <div className="space-y-5">
            <Input
              type="text"
              label="Email:"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
              })}
            />
            
             <Input
              type="text"
              label="Username :"
              placeholder="Enter your username"
              {...register("username", {
                required: true,
              })}
            />
            <Input
              type="password"
              label= "Password :"
              placeholder="Enter your password"
              className=""
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BoneButton from "./BoneButton";

export default function Login() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name && !email) {
      setError("Oops! Both name and email are required.");
      return;
    } else if (!name) {
      setError("Please include name.");
      return;
    } else if (!email) {
      setError("Please include email.");
      return;
    }
    setError("");
    try {
      const response = await axios.post(
        "https://frontend-take-home-service.fetch.com/auth/login",
        { name, email },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/search");
      } else {
        setError("Sorry, that did not work. Please try again.");
      }
    } catch (err) {
      setError("Please enter a valid email.");
      console.log(err);
    }
  };

  return (
    <div className="bg-[#efecec] min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-16">
      <h1 className="font-poppins text-center text-3xl sm:text-2xl sm:mt-6 sm:mb-7 md:text-5xl mb-10 lg:mb-18 text-[#D35400]">
        Help a Dog Find a Home!
      </h1>

      <div className="relative w-full max-w-md flex flex-col items-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-4 w-full"
        >
          <div className="flex flex-col w-full gap-2">
            <label className="text-[#D35400]" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded-md bg-white w-full text-lg sm:h-10"
            />

            <label className="text-[#D35400]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-md bg-white w-full text-lg sm:h-10"
            />
          </div>

          <BoneButton
            text="Log In"
            className="mb-12 mt-12 hover:scale-92 sm:scale-85 sm:mt-0 lg:mt-5"
            aria-label="Log in to your account"
          />
        </form>

        {error && (
          <p className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-black text-center w-full sm:-bottom-2 sm:w-140 sm:mb-5 lg:-bottom-8 ">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

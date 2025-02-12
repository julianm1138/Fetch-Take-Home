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
      setError(
        "Oops! Both name and email are required. Please enter name and email. Thank you :)"
      );
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
        setError(
          "Sorry, that did not work. Please check your information and try again."
        );
      }
    } catch (err) {
      setError(
        "We are experiencing technical difficulties please contact support!"
      );
      console.log(err);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('src/assets/loginbackground.png')",
      }}
      className="bg-background min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-16"
    >
      <h1 className="font-poppins text-center text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide leading-tight bg-gradient-to-r from-amber-600 to-amber-700 text-transparent bg-clip-text mb-6 ">
        Help a Dog Find a Home!
      </h1>

      <form
        onSubmit={handleLogin}
        className="relative flex flex-col items-center gap-4 w-full max-w-md"
      >
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded-md bg-amber-200 w-full text-lg"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-md bg-amber-200 w-full text-lg"
            />
          </div>
        </div>

        <div className="mt-6 w-full text-center ">
          <BoneButton text="Log in" />
        </div>
      </form>
      <div className="mt-4">
        {error && (
          <p className="text-black absolute bottom-8 left-1/2 transform -translate-x-1/2 sm:top-[80%] sm:left-[50%] sm:max-w-full md:top-[80%] md:left-[50%]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

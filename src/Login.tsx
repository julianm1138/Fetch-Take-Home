import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Login() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  //e is the event object, React.FormEvent is typescript's custom type to handle the event object in React

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
      setError("Please include email");
      return;
    }
    setError("");
    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
          credentials: "include",
        }
      );

      if (response.ok) {
        navigate("/search");
      } else {
        setError(
          "Sorry, that did not work. Please check your information and try again."
        );
      }
      console.log(response);
    } catch (err) {
      setError(
        "We are experiencing technical difficulties please contact engineering!"
      );
      console.log(err);
    }
  };

  return (
    <div
      style={{ backgroundImage: "url('loginbackground.png')" }}
      className="bg-cover bg-center min-h-screen"
    >
      <h1 className="text-blue-400">Help a Dog Find a Home!</h1>
      <h3 className="text-blue-200">User Login</h3>

      <form onSubmit={handleLogin}>
        <label htmlFor="name">Name:</label> {/* accessibility */}
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email} //bind to state variable
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <button type="submit" className="">
          Log in
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );

  //bone button
}

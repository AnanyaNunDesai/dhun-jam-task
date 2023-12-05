import React, { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const authURL = "https://stg.dhunjam.in/account/admin/login";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const attemptLogin = async () => {
    setLoading(true);

    const loginValues = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(authURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginValues),
      });

      if (!response.ok) {
        setError("The username or password is incorrect.");
        return;
      }

      navigate("/dashboard");
    } catch (e) {
      setError("An error occurred while attempting to contact API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
      </style>

      <div className="h-screen flex flex-col justify-center items-center gap-y-5">
        <h1 className="font-poppins font-bold">Venue Admin Login</h1>
        <form>
          <div className="flex flex-col mt-3 gap-y-5 font-poppins font-light text-white mb-2">
            <input
              className="h-14 bg-black focus:outline-none p-3 rounded-2xl border border-white placeholder-white focus:placeholder-opacity-0 transition-opacity duration-300 ease-in-out"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="flex flex-row relative items-center justify-between">
              <input
                type={passwordVisible ? "text" : "password"}
                className="h-14 w-[600px] bg-black focus:outline-none p-3 pr-12 rounded-2xl border border-white placeholder-white focus:placeholder-opacity-0 transition-opacity duration-300 ease-in-out"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn absolute right-0 mr-5 text-3xl"
                onClick={() => setPasswordVisible(!passwordVisible)}
                type="button"
              >
                {passwordVisible ? <BsEyeSlashFill /> : <BsEyeFill />}
              </button>
            </div>
          </div>
          <p className="text-red-800">{error}</p>
          <button
            onClick={attemptLogin}
            disabled={loading}
            type="button"
            className="font-poppins font-semibold btn bg-buttonColor p-5 w-[600px] rounded-xl mt-10 active:border active:border-[#F0C3F1]"
          >
            Sign in
          </button>
        </form>
        <p className="font-poppins font-extralight">New Registration ?</p>
      </div>
    </main>
  );
}

export default Login;

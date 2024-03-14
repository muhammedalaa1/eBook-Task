import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";

import { useAuth } from "../../context/Auth";
import Inputs from "../Input/Input";

const Login = () => {
  const [loading, setloading] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setloading((prev) => !prev);
    const formdata = new FormData(e.target as any);
    const email = String(formdata.get("email"));
    const password = String(formdata.get("password"));
    await login(email, password);
    (e.target as HTMLFormElement).reset();
    setloading((prev) => !prev);
  }

  return (
    <div>
      {" "}
      <div className="container h-screen ">
        <div className="mt-12 flex h-screen gap-4 md:gap-8 justify-center items-center text-center">
          <img
            src="/undraw_mobile_login_re_9ntv (2).svg"
            alt="Login_img"
            className="w-96 h-auto hidden lg:flex mr-5"
          />

          <form
            className=" flex flex-col  p-12 lg:w-6/12 rounded-xl shadow-lg w-full"
            onSubmit={handleSubmit}
          >
            <h2 className="font-semibold text-2xl">Login</h2>
            <Inputs type="email" title="email" />

            <Inputs type="password" title="Password" />
            <div className="w-full text-center justify-center flex-col items-center mt-4">
              <button
                type="submit"
                className="bg-mainColor border-2 loginBtn  border-mainColor hover:bg-white  hover:text-mainColor/90 text-white  rounded-md  duration-300   transition-colors p-2  w-full mt-4 "
              >
                <SyncLoader
                  color="white"
                  loading={loading}
                  size={7}
                  speedMultiplier={0.7}
                />
                <span
                  className={`relative z-[1000] ${
                    loading ? "hidden" : "inline font-semibold"
                  }`}
                >
                  {" "}
                  Login
                </span>
              </button>
              <h4 className="  text-[#1877f2] font-semibold mt-4">
                Don't have account ? <Link to={"/signup"}>Sign up </Link>
              </h4>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

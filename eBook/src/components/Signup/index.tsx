import { FormEvent, useState } from "react";
import { SyncLoader } from "react-spinners";
import { useAuth } from "../../context/Auth";

const Inputs = ({ title, type }: { type?: string; title?: string }) => {
  return (
    <>
      <label htmlFor={type} className="mt-8 text-start mb-2 font-semibold">
        {title}
      </label>
      <input
        type={type}
        name={type}
        className="border border-black w-full p-2 rounded"
        required
      />
    </>
  );
};
const Signup = () => {
  const [loading, setloading] = useState(false);
  const { signUp } = useAuth();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setloading(!loading);
    const formdata = new FormData(e.target as any);
    const userName = String(formdata.get("userName"));
    const password = String(formdata.get("password"));
    const email = String(formdata.get("email"));
    const phone = String(formdata.get("phone"));
    console.log(userName, password, email, phone);
    await signUp(userName, email, password, phone);
    setloading((prev) => !prev);
  }
  return (
    <div>
      <div className="container h-screen ">
        <div className="h-screen flex   gap-4 md:gap-8 justify-center items-center text-center">
          <img
            src="/undraw_welcome_cats_thqn.svg"
            alt="Login_img"
            className="w-96 h-auto hidden lg:flex"
          />

          <form
            action="submit"
            className=" flex flex-col  p-12 lg:w-6/12 rounded-xl shadow-lg w-9/12"
            onSubmit={handleSubmit}
          >
            <h2 className="font-semibold text-2xl">Please Sign Up</h2>
            <Inputs type="userName" title="User name" />
            <Inputs type="email" title="Email" />
            <Inputs type="password" title="password" />
            <Inputs type="phone" title="phone" />

            <div className="w-full text-center justify-center flex-col items-center">
              <button
                type="submit"
                className="bg-mainColor border-2 loginBtn  border-mainColor hover:bg-white  hover:text-mainColor text-white  rounded-md  duration-300   transition-colors p-2  w-full mt-6 "
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
                  Sign up
                </span>{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

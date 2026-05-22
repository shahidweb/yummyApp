import { useState } from "react";
import { useForm } from "react-hook-form";

type formInput = {
  name?: string;
  email: string;
  password: string;
};

function Login({ onClose }: any) {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formInput>();

  const OnSubmitHandler = (data: formInput) => {
    console.log(data);
    onClose();
  };
  return (
    <div className="modal">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{isLogin ? "Login" : "Sign up"}</h1>
        <span className="text-xl cursor-pointer" onClick={onClose}>
          ✕
        </span>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(OnSubmitHandler)}>
        {!isLogin && (
          <input
            className="mt-3 border border-gray-400 placeholder:text-gray-400 focus:border-orange-600 focus:outline-none w-full p-2 rounded mb-2"
            placeholder="Your name"
            {...register("name")}
          />
        )}
        <input
          className="mt-3 border border-gray-400 placeholder:text-gray-400 focus:border-orange-600 focus:outline-none w-full p-2 rounded mb-2"
          placeholder="email"
          {...register("email", { required: true })}
        />
        <input
          className="mt-3 border border-gray-400 placeholder:text-gray-400 focus:border-orange-600 focus:outline-none w-full p-2 rounded mb-2"
          placeholder="password"
          {...register("password", { required: true })}
        />

        {errors.email && errors.password && (
          <span className="text-red-600 text-sm">All field is required</span>
        )}
        <button className="bg-orange-600 w-full px-5 py-3 mt-3 text-white font-medium cursor-pointer">
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>
      <div className="cursor-pointer mt-3 mb-10">
        <input
          id="agreement"
          className="cursor-pointer h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 me-3"
          type="checkbox"
        />
        <label htmlFor="agreement" className="cursor-pointer">
          By continuing, I agree to the terms of use & privacy policy
        </label>
      </div>
      <p>
        {" "}
        {isLogin ? "Create a account? " : "Already have an account? "}
        <span
          className="cursor-pointer text-orange-600 font-medium"
          onClick={() => {
            (setIsLogin(!isLogin), reset());
          }}
        >
          {isLogin ? "Login" : "Click"} here
        </span>
      </p>
    </div>
  );
}

export default Login;

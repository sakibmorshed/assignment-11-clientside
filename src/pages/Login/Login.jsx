import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { signIn, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  const handleLogin = async (data) => {
    try {
      await signIn(data.email, data.password);
      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleDemoLogin = () => {
    setValue("email", "demo@localchef.com");
    setValue("password", "Demo@123");

    toast.success("Demo credentials filled! Click 'Continue' to login.", {
      duration: 3000,
    });
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      toast.success("Google Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      if (err.code === "auth/operation-not-allowed") {
        toast.error(
          "Google sign-in is not enabled. Please enable it in Firebase Console > Authentication > Sign-in method",
          { duration: 5000 }
        );
      } else if (err.code === "auth/popup-closed-by-user") {
        toast.info("Login popup was closed");
      } else {
        toast.error(err?.message || "Google login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required.</p>
              )}
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                })}
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required.</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must have at least one uppercase, at least one
                  lowercase, at least one number, and at least one special
                  characters
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-lime-500 w-full rounded-md py-3 text-white hover:bg-lime-600 transition"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>

        {/* Demo Login Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-blue-500 text-white rounded-md py-3 hover:bg-blue-600 transition font-medium"
          >
            Fill Demo Credentials
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Note: Create a demo account first or use your own credentials
          </p>
        </div>

        <div className="space-y-1">
          <button className="text-xs hover:underline hover:text-lime-500 text-gray-400 cursor-pointer">
            Forgot password?
          </button>
        </div>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300 dark:bg-gray-700"></div>
          <p className="px-3 text-sm text-gray-500 dark:text-gray-400">
            Login with social account
          </p>
          <div className="flex-1 h-px sm:w-16 bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-md py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Continue with Google
            </span>
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            Social login requires Firebase Console setup. See instructions
            below.
          </p>
        </div>

        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            state={from}
            to="/signup"
            className="hover:underline hover:text-lime-500 text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;

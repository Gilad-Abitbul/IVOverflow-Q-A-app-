import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignup from "../hooks/useSignup";
import { isAxiosError } from "axios";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

const schema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(20, "Full name must be at most 20 characters"),
  nickname: z
    .string()
    .min(3, "Nickname must be at least 3 characters")
    .max(20, "Nickname must be at most 20 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must be at least 6 characters and include uppercase, lowercase, number, and symbol"
    ),
});

type SignupFormInputs = z.infer<typeof schema>;

export default function Signup() {
  const { error, isPending, mutate } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: SignupFormInputs) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName")}
              className={`w-full px-4 py-2 border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Nickname */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Nickname
            </label>
            <input
              type="text"
              {...register("nickname")}
              className={`w-full px-4 py-2 border ${
                errors.nickname ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="johnny"
            />
            {errors.nickname && (
              <p className="text-sm text-red-500 mt-1">
                {errors.nickname.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            {isPending ? "Creating account..." : "Sign Up"}
          </button>

          {/* Server error */}
          {error && (
            <p className="text-center text-sm text-red-500 mt-3">
              {isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : "Signup failed"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

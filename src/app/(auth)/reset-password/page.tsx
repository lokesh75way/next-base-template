"use client";

import { resetPasswordSchema } from "@/utils/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";

type FormData = yup.InferType<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(resetPasswordSchema),
  });

  if (!token) {
    return (
      <div className="text-center mt-10 text-red-500">
        Invalid or missing reset token
      </div>
    );
  }

  const onSubmit = async (data: FormData) => {
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Reset password failed");
      }

      setSuccess("Password reset successfully. Please login.");

      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
        setError(err.message);
      } else {
        console.log("Unknown error", error);
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-indigo-600 py-2 text-white"
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

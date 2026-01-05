import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 characters required")
    .max(16, "Maximum 16 characters allowed"),
});

export const registerSchema = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  name: yup.string().required("Please Enter Name"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 characters required")
    .max(16, "Maximum 16 characters allowed"),
});
export const forgotPasswordSchema = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 characters"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

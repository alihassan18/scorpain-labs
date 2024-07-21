import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    // .email("Email must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Minimum eight characters, at least one letter, one number and one special character"
    ),
});

export const QuickSingupSchema = yup.object().shape({
  fullname: yup.string().required("Fullname is required"),
  email: yup
    .string()
    // .email("Email must be a valid email")
    .required("Email is required"),
});

export const SignUpSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("First Name is required")
    .matches(/^[A-Za-z\s\-]+$/, "First Name include only alphabetic characters")
    .min(3, "Must be more than 3 characters")
    .max(10, "Must be less than 10"),
  last_name: yup
    .string()
    .required("Last Name is required")
    .matches(/^[A-Za-z\s\-]+$/, "Last Name include only alphabetic characters")
    .min(3, "Must be more than 3 characters")
    .max(10, "Must be less than 10"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Must be valid email"
    ),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Add valid password with at least one special character"
    ),
  // confirmPassword: yup
  //   .string()
  //   .required("Confirm Password is required")
  //   .oneOf([yup.ref("password")], "Passwords must match"),
});

export const ForgotSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
});

export const ResetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Minimum eight characters, at least one letter, one number and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

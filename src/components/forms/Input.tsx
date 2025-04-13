import { ErrorMessage } from "@hookform/error-message";
import { forwardRef, InputHTMLAttributes } from "react";
import { FieldError, FieldErrorsImpl } from "react-hook-form";
import { FormData as signupSchema } from "../../schema/signupSchema";
import { FormData as loginSchema } from "../../schema/loginSchema";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: "fullname" | "username" | "email" | "password";
  errors?: FieldErrorsImpl<signupSchema> | FieldErrorsImpl<loginSchema>;
  errorMsg?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, type = "text", errors, className, ...rest }, ref) => {
    const classChecker =
      errors && typeof id === "string"
        ? (errors as Record<string, FieldError | undefined>)[id]
        : false;

    return (
      <>
        <label className="text-slate-50 font-main" htmlFor={id}>
          {label}
        </label>
        <input
          {...rest}
          ref={ref}
          id={id}
          type={type}
          className={`input ${classChecker ? "border-red-500 border-2" : ""} ${
            className || ""
          }`}
        />
        <ErrorMessage
          errors={errors}
          name={id}
          render={({ message }) => <p className="field-error">{message}</p>}
        />
        {/* {isError && <p className="field-error">{errorMsg}</p>} */}
      </>
    );
  }
);

Input.displayName = "Input"; // display name for debugging

export default Input;

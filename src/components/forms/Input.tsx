import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  isError?: boolean;
  errorMsg?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, id, type = "text", isError = false, errorMsg, className, ...rest },
    ref
  ) => {
    console.log("id: ", id);
    console.log("isError: ", isError);
    console.log("errorMsg: ", errorMsg);
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
          className={`input ${isError ? "border-red-500 border-2" : ""} ${
            className || ""
          }`}
        />
        {isError && <p className="field-error">{errorMsg}</p>}
      </>
    );
  }
);

Input.displayName = "Input"; // display name for debugging

export default Input;

import Spinner from "../global/Spinner";

type FormButtonProps = {
  label: string;
  isDisabled?: boolean;
  isLoading?: boolean;
};

const FormButton = ({
  label,
  isDisabled = false,
  isLoading = false,
}: FormButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      className="flex items-center justify-center gap-2 p-3 min-w-44 w-full  bg-blue-500 rounded-full text-slate-50 font-main font-semibold transition-colors hover:bg-blue-600 md:w-fit "
      type="submit"
    >
      {isLoading ? <Spinner text="Processing..." isButton /> : label}
    </button>
  );
};

export default FormButton;

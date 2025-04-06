type FormTitleProps = {
  title: string;
};

const FormTitle = ({ title }: FormTitleProps) => {
  return (
    <div>
      <h2 className="text-slate-50 font-main text-3xl font-medium md:text-4xl">
        {title}
      </h2>
    </div>
  );
};

export default FormTitle;

import React from "react";

type FormProps = {
  inputProps:
    | Array<React.InputHTMLAttributes<HTMLInputElement>>
    | React.InputHTMLAttributes<HTMLInputElement>;
  btnProps: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};
export default function Form({ onSubmit, inputProps, btnProps }: FormProps) {
  const inputs = Array.isArray(inputProps) ? inputProps : [inputProps];
  return (
    <form onSubmit={onSubmit}>
      <div className={"grid grid-rows-2 gap-4"}>
        {inputs.map((input) => (
          <input key={input.placeholder} {...input} />
        ))}
        <button
          type="submit"
          {...btnProps}
          className={`${btnProps.className ?? ""} justify-self-center`}
        >
          {btnProps.title}
        </button>
      </div>
    </form>
  );
}

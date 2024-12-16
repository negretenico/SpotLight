import Form from "../components/Form";
import { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query/keys";
import { QUERY_FUNCTIONS } from "../query/functions";

export default function Login() {
  const mutate = useMutation({
    mutationKey: [QUERY_KEYS.login],
    mutationFn: (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      return QUERY_FUNCTIONS.login({
        body: new FormData(e.target as HTMLFormElement),
      });
    },
  });
  const inputs: ComponentProps<typeof Form>["inputProps"] = [
    {
      placeholder: "Email, username, phone number",
      autoComplete: "off",
      autoCorrect: "off",
      className:
        "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    },
    {
      placeholder: "Password",
      className:
        "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
      type: "password",
      autoComplete: "off",
      autoCorrect: "off",
    },
  ];
  return (
    <div className="container flex justify-center mt-2">
      <div className="grid-rows-2 text-center max-w-lg w-full">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 space-y-4">
          <div>
            <p className="font-bold text-2xl">SpotLight</p>
          </div>
          <Form
            onSubmit={mutate.mutate}
            inputProps={inputs}
            btnProps={{
              title: "Login!",
              className:
                "text-center text-white bg-gradient-to-r from-electric_blue to-lime_green rounded w-full max-w-36 ",
            }}
          />
        </div>
        <div className="grid grid-row-1 shadow-md rounded px-8 pt-6 pb-6 mb-4 space-y-4">
          <p>
            Not a member?{" "}
            <Link to={"/signup"} className="link">
              Sign up!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

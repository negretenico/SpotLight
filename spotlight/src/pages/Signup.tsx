import Form from "../components/Form";
import { Link } from "react-router-dom";
import { ComponentProps } from "react";
import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query/keys";
import { QUERY_FUNCTIONS } from "../query/functions";

export default function Signup() {
  const mutate = useMutation({
    mutationKey: [QUERY_KEYS.register],
    mutationFn: (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      return QUERY_FUNCTIONS.register({
        registerInformation: new FormData(e.target as HTMLFormElement),
      });
    },
  });
  const inputs: ComponentProps<typeof Form>["inputProps"] = [
    {
      placeholder: "Email",
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
    {
      placeholder: "Full name",
      autoComplete: "off",
      autoCorrect: "off",
      className:
        "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    },
    {
      placeholder: "Username",
      autoComplete: "off",
      autoCorrect: "off",
      className:
        "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    },
  ];
  return (
    <div className="container flex justify-center mt-2">
      <div className="grid-rows-2 max-w-lg w-full text-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 space-y-4">
          <div>
            <p className="font-bold text-2xl">SpotLight</p>
            <p className="font-light text-base">
              Sign up to see highlights from your friends and inspirations!
            </p>
          </div>
          <Form
            onSubmit={mutate.mutate}
            inputProps={inputs}
            btnProps={{
              title: "Sign up today!",
              className:
                "text-center text-white bg-gradient-to-r from-electric_blue to-lime_green rounded w-full max-w-36",
            }}
          />
        </div>
        <div className="grid grid-row-1 shadow-md rounded px-8 pt-6 pb-6 mb-4 space-y-4">
          <p>
            Already a member?{" "}
            <Link to={"/"} className="link">
              Login!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

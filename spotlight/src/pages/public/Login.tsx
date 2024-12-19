import Form from "../../components/Form";
import { ComponentProps } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../../mutations/keys";
import { MUTATION_FUNCTIONS } from "../../mutations/functions";
import { LoginRequest } from "../../types/auth";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.login],
    mutationFn: (request: LoginRequest) => {
      return MUTATION_FUNCTIONS.login({
        loginRequest: request,
      });
    },
    onSuccess: (data) => {
      if (!data.accessToken) {
        //TODO: add some custom logging here
        return;
      }
      setToken(data.accessToken);
      navigate("/");
    },
  });
  const inputs: ComponentProps<typeof Form>["inputProps"] = [
    {
      name: "username",
      required: true,
      id: "email",
      placeholder: "Email, username, phone number",
      autoComplete: "off",
      autoCorrect: "off",
      className:
        "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    },
    {
      name: "password",
      id: "password",
      required: true,
      placeholder: "Password",
      className:
        "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
      type: "password",
      autoComplete: "off",
      autoCorrect: "off",
    },
  ];
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const loginRequest = Object.fromEntries(formData.entries()) as LoginRequest;
    mutate(loginRequest);
  };
  return (
    <div className="container flex justify-center mt-2">
      <div className="grid-rows-2 text-center max-w-lg w-full">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 space-y-4">
          <div>
            <p className="font-bold text-2xl">SpotLight</p>
          </div>
          <Form
            onSubmit={handleSubmit}
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

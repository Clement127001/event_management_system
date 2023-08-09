import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({ request }) => {
  //inbuilt functionality by browser
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode");

  if (mode !== "signup" && mode !== "login") {
    console.log("route mismatched");
    throw json({ message: "invalid mode" }, { status: 402 });
  }

  const data = await request.formData();
  const userData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  } else if (!response.ok) {
    throw json({ message: "can't authenticate user" }, { status: 500 });
  }

  const { token } = await response.json();
  localStorage.setItem("token", token);

  return redirect("/");
};

import { redirect } from "react-router-dom";

export default function action() {
  localStorage.removeItem("token");
  return redirect("/");
}

import type { Route } from "./+types/account";
import { Login } from "../pages/account/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Account Login - Artisan Cafe" },
    { name: "description", content: "Login or create an Artisan Cafe account." },
  ];
}

export default function Account() {
  return <Login />;
}

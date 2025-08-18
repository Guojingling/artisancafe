import type { Route } from "./+types/home";
import { Main } from "../pages/home/main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Artisan Canberra Cafe" },
    { name: "description", content: "Welcome to Artisan Canberra Cafe!" },
  ];
}

export default function Home() {
  return <Main />;
}

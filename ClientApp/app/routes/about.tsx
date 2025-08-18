import type { Route } from "./+types/home";
import { Info } from "~/pages/about/info";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Artisan Cafe App" },
    { name: "description", content: "Welcome to Artisan Cafe!" },
  ];
}

export default function About() {
  return <Info />;
}

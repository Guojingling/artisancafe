import type { Route } from "./+types/home";
import { Info } from "~/pages/about/info";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
  return <Info />;
}

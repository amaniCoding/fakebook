import NavBar from "./ui/home/sections/nav-bar";

import Index from "./ui/home";
export default async function Page() {
  return (
    <section className="md:pt-[73px] pt-[55px]">
      <NavBar />
      <Index />
    </section>
  );
}

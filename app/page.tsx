import NavBar from "./ui/home/sections/nav-bar";

import Index from "./ui/home";
export default async function Page() {
  return (
    <section className="bg-gray-100 md:pt-[80px] pt-[55px]">
      <NavBar />
      <Index />
    </section>
  );
}

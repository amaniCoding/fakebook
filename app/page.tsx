import NavBar from "./ui/home/sections/nav-bar";

import Index from "./ui/home";
export default async function Page() {
  return (
    <section className="bg-slate-50 md:pt-[80px] pt-[70px]">
      <NavBar />
      <Index />
    </section>
  );
}

import { Suspense } from "react";

import BirthDays from "../contact/birthdays";
import Search from "../contact/search";
import Contacts from "../contact/contacts";
import ContactSkeleton from "../../skeletons/contact";

export default function ContactSection() {
  return (
    <div className="md:w-[30%] bg-slate-50 opacity-50 md:pl-10 w-full md:block hidden pb-32 h-screen sticky top-24 scroll_content socrollabar">
      <BirthDays />
      <Search />
      <Suspense fallback={<ContactSkeleton />}>
        <Contacts />
      </Suspense>
    </div>
  );
}

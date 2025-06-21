import SideSection from "./sections/side-section";
import FeedSection from "./sections/feed-section";
import ContactSection from "./sections/contact-section";

export default async function Index() {
  return (
    <div className="max-w-[1320px] h-full mx-auto">
      <div className="flex">
        <SideSection />
        <FeedSection />
        <ContactSection />
      </div>
    </div>
  );
}

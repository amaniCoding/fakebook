import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoMdMore } from "react-icons/io";

export default function Search() {
  return (
    <div className="flex items-center justify-between">
      <p>Contacts</p>
      <div className="flex items-center space-x-2">
        <HiMagnifyingGlass className="w-6 h-6" />
        <IoMdMore className="w-6 h-7" />
      </div>
    </div>
  );
}

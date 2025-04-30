import { FaBirthdayCake } from "react-icons/fa";

export default function BirthDays() {
  return (
    <div>
      <p>BirthDays</p>
      <div className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-200">
        <FaBirthdayCake className="fill-blue-600 w-6 h-6" />
        <p>Amanuel Feredes birthdate is today</p>
      </div>
    </div>
  );
}

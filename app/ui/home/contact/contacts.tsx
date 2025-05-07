import { fetchUsers } from "@/app/libs/data/user";
import Image from "next/image";
export default async function Contacts() {
  const users = await fetchUsers();

  return (
    <>
      {users.map((user) => {
        return (
          <div className="w-full opacity-45" key={user.userid}>
            <div className="flex items-center space-x-2 py-2 px-2.5 rounded-md hover:bg-gray-100">
              <Image
                alt="Amanuel Ferede"
                src={user.profilepic}
                width={0}
                height={0}
                sizes="100vh"
                className="w-8 h-8 object-cover rounded-full"
              />
              <p className="">
                {user.fname} {user.lname}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

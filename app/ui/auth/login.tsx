import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <section className="bg-slate-200 h-screen">
      <div className="max-w-full">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <Image
            alt="Amanuel Ferede"
            src={"/feeds/logoc.png"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-full h-full"
          />

          <div className="flex items-center justify-center">
            <div className="lg:w-3/4 w-full h-full">
              <p className="text-5xl font-bold my-2 text-blue-600 lg:pl-0 pl-6">
                Fakebook
              </p>
              <div className="w-full bg-white p-6 lg:shadow-md lg:rounded-xl h-full">
                <div className="flex flex-col space-y-7 py-16">
                  <input
                    type="email"
                    required
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-xl"
                    placeholder="Email or phone number"
                  ></input>
                  <input
                    type="password"
                    required
                    className="py-3 px-4  block w-full border-2 border-gray-200 rounded-xl"
                    placeholder="Password"
                  ></input>
                  <div className="flex flex-row space-x-3">
                    <Link
                      href={"/home"}
                      type="submit"
                      className="py-2 px-4 bg-blue-600 text-center block text-white rounded-xl outline-none "
                    >
                      Login
                    </Link>
                    <Link
                      href={"/home"}
                      type="submit"
                      className="py-2 px-4 border-2 border-gray-800/35 text-center block text-black rounded-xl "
                    >
                      Signup
                    </Link>
                  </div>
                </div>
              </div>

              <div className="text-sm w-full mt-3 lg:pl-0 pl-6">
                <p>All rights reserved 2025</p>

                <p className="text-sm w-full">
                  A simple facebook like platform to connect people{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

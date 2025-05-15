"use client";
interface Props {
  files: string[];
}
export default function FileViewer({ files }: Props) {
  return (
    <div className="w-full h-auto">
      {files.length}

      <div className="flex flex-wrap space-x-2">
        {files.length > 5 && (
          <div className="flex h-full space-x-2">
            <div className="flex flex-col space-y-2">
              {files.slice(0, 3).map((file, index) => {
                return (
                  <div
                    className="w-[230px] h-[10.5rem]"
                    key={index}
                    style={{
                      backgroundImage: "url(" + `${file}` + ")",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                );
              })}
            </div>

            <div className="flex flex-col space-y-2">
              {files.slice(3, 4).map((file, index) => {
                return (
                  <div
                    className="w-[230px] h-[15.5rem] grow"
                    key={index}
                    style={{
                      backgroundImage: "url(" + `${file}` + ")",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                );
              })}
              <div
                className="w-[230px] h-[15.5rem] relative"
                style={{
                  backgroundImage: "url(" + `${files[5]}` + ")",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/65 flex items-center justify-center">
                  <p className="text-white">{files.length - 5} +</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {files.length === 5 && (
          <div className="flex h-full space-x-2">
            <div className="flex flex-col space-y-2">
              {files.slice(0, 3).map((file, index) => {
                return (
                  <div
                    className="w-[230px] h-[10.5rem]"
                    key={index}
                    style={{
                      backgroundImage: "url(" + `${file}` + ")",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                );
              })}
            </div>

            <div className="flex flex-col space-y-2">
              {files.slice(3, 6).map((file, index) => {
                return (
                  <div
                    className="w-[230px] h-[15.5rem] grow"
                    key={index}
                    style={{
                      backgroundImage: "url(" + `${file}` + ")",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        )}
        {files.length === 4 && (
          <div className="flex h-full space-x-2">
            <div className="flex flex-col space-y-2">
              {files.slice(0, 2).map((file, index) => {
                return (
                  <div
                    className="w-[230px] h-[15.5rem]"
                    key={index}
                    style={{
                      backgroundImage: "url(" + `${file}` + ")",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                );
              })}
            </div>

            <div className="flex flex-col space-y-2">
              {files.slice(2, 4).map((file, index) => {
                return (
                  <div
                    className="w-[230px] h-[15.5rem]"
                    key={index}
                    style={{
                      backgroundImage: "url(" + `${file}` + ")",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        )}
        {files.length === 3 && (
          <div className="flex h-full space-x-2">
            <div className="flex flex-col space-y-2">
              {files.slice(0, 2).map((file, index) => {
                return (
                  <div
                    className="w-[230px] h-[15.5rem]"
                    key={index}
                    style={{
                      backgroundImage: "url(" + `${file}` + ")",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                );
              })}
            </div>

            <div
              className="w-[230px] h-[31.5rem]"
              style={{
                backgroundImage: "url(" + `${files[2]}` + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        )}

        {files.length === 2 &&
          files.map((file, index) => {
            return (
              <div
                className="w-[230px] h-[15.5rem]"
                key={index}
                style={{
                  backgroundImage: "url(" + `${file}` + ")",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            );
          })}

        {files.length === 1 &&
          files.map((file, index) => {
            return (
              <div
                className="w-[230px] h-[15.5rem]"
                key={index}
                style={{
                  backgroundImage: "url(" + `${file}` + ")",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            );
          })}
      </div>
    </div>
  );
}

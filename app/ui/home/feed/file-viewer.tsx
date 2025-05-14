"use client";
interface Props {
  files: string[];
}
export default function FileViewer({ files }: Props) {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="grid grid-cols-2 w-full">
        {files.map((file, index) => {
          return (
            <div
              className="w-60 h-60 grow"
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

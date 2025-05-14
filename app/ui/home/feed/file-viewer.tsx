"use client";
interface Props {
  files: string[];
}
export default function FileViewer({ files }: Props) {
  return (
    <div className="w-full max-h-80">
      <div className="flex space-x-2 flex-wrap">
        {files.map((file, index) => {
          return (
            <div
              className="w-60 h-60"
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

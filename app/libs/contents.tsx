"use client";
import { Contnet } from "../types/types";
export default function LoadDetailContentForm(props: {
  detailPostContent: Contnet[];
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    contentIndex: number
  ) => void;
  index: number;
}) {
  return (
    <div>
      <p className="text-slate-700 text-center font-semibold">
        Detail Content of your post{" "}
        <span className="font-bold">({props.index})</span>{" "}
      </p>
      <input
        type="text"
        className="p-2 pl-2 border-2 border-gray-400 block w-full focus:outline-none my-2 rounded-lg"
        name="title"
        placeholder="Title ..."
        onChange={(e) => {
          props.handleOnChange(e, props.index - 1);
        }}
        value={props.detailPostContent[props.index - 1].title}
      ></input>
      <textarea
        className="my-2 w-full focus:outline-none border-2 border-gray-400 pl-2 rounded-lg"
        cols={10}
        placeholder="Description ..."
        name="description"
        onChange={(e) => {
          props.handleOnChange(e, props.index - 1);
        }}
        value={props.detailPostContent[props.index - 1].description}
      ></textarea>
      <textarea
        className="my-2 w-full focus:outline-none border-2 border-gray-400 pl-2 rounded-lg"
        cols={10}
        placeholder="Code snippet ... (optional)"
        name="codeSnippet"
        onChange={(e) => {
          props.handleOnChange(e, props.index - 1);
        }}
        value={props.detailPostContent[props.index - 1].codeSnippet}
      ></textarea>
      <p className="text-sm my-2">Attach Photo (optional)</p>
      <input
        type="file"
        className="file:rounded-md file:outline-none file:my-2"
        name="photo"
      ></input>
    </div>
  );
}

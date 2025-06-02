import { BsHeartPulseFill } from "react-icons/bs";
import { CgSmileMouthOpen } from "react-icons/cg";
import { IoMdThumbsUp } from "react-icons/io";
import { FaAngry, FaLaugh } from "react-icons/fa";
import { IoHeartCircle } from "react-icons/io5";
import { ReactionIconsProps } from "./types";

export default function ReactionIcons({ reactiontype }: ReactionIconsProps) {
  if (reactiontype === "like") {
    return <IoMdThumbsUp className="w-6 h-6 fill-blue-500" />;
  }
  if (reactiontype === "love") {
    return <IoHeartCircle className="w-6 h-6 fill-pink-500" />;
  }

  if (reactiontype === "care") {
    return <BsHeartPulseFill className="w-6 h-6 fill-orange-500" />;
  }
  if (reactiontype === "angry") {
    return <FaAngry className="w-6 h-6 fill-yellow-700" />;
  }
  if (reactiontype === "wow") {
    return <CgSmileMouthOpen className="w-6 h-6 fill-orange-500" />;
  }
  if (reactiontype === "lagh") {
    return <FaLaugh className="w-6 h-6 fill-yellow-700" />;
  }
  return null;
}

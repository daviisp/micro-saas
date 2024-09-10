import { RocketIcon } from "@radix-ui/react-icons";

export function Logo() {
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black hover:scale-110 transition-all ml-5 my-2">
      <RocketIcon className="text-white w-5 h-5" />
    </div>
  );
}

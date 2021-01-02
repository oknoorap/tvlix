import { FC } from "react";
import { ImSpinner2 as Spinner } from "react-icons/im";

type LoaderProps = {
  text: string;
};

const Loader: FC<LoaderProps> = ({ text }) => {
  return (
    <div className="flex text-lg">
      <Spinner className="animate-spin fill-current w-6 h-6 mr-2" /> {text}...
    </div>
  );
};

export default Loader;

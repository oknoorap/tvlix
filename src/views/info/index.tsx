import { useState } from "react";
import { AiOutlineInfoCircle as InfoIcon } from "react-icons/ai";

import InfoModal from "./modal";

const InfoView = () => {
  const [isShowModal, setModalVisibility] = useState<boolean>(false);
  return (
    <>
      <InfoIcon
        className="self-start cursor-pointer w-6 h-6 fill-current text-white ml-auto"
        onClick={() => setModalVisibility(true)}
      />
      {isShowModal && <InfoModal onClose={() => setModalVisibility(false)} />}
    </>
  );
};

export default InfoView;

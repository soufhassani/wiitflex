import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
type Props = {
  msg: string;
  time: number;
  state: "success" | "error";
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  redirect?: boolean;
};

const NotificationModal = ({
  msg,
  state,
  time,
  setActive,
  redirect,
}: Props) => {
  const [timer, setTimer] = useState(0);
  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) setActive(false);
  };

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i > time) return clearInterval(interval);
      setTimer(i);
      i++;
    }, 1000);

    if (i === time) return clearInterval(interval);
  }, []);
  //   const iconsStyle = 'text'
  const isSuccess = state === "success" ? true : false;
  const borderColor = isSuccess
    ? "border-green-500 border-2"
    : "border-red-500 border-2";
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-transparent flex items-center justify-center font-main backdrop-blur z-[999999]"
      onClick={handleCloseModal}
    >
      <div
        className={
          "flex items-center justify-center px-10 py-5 max-w-[600px] w-full max-h-[90vh] h-auto  rounded-3xl  overflow-y-auto bg-zinc-900  scrollbar-thumb-red-500 scrollbar-thin scrollbar-track-transparent scrollbar-corner-transparent" +
          " " +
          borderColor
        }
      >
        <div className="flex items-center gap-10">
          {isSuccess ? (
            <FaCheckCircle className="text-green-500 text-8xl" />
          ) : (
            <IoCloseCircleSharp />
          )}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl">{msg}</h3>
            {redirect && (
              <h3 className="text-gray-400">Redirection in {timer} ...</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;

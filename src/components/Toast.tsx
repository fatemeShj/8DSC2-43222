import { useEffect } from "react";
import Image from "next/image";
import errorIcon from "@/assets/icons/error.svg";
type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`flex px-4 py-1 rounded-full shadow-lg text-[#721C24] ${
        type === "success" ? "bg-green-300" : "bg-[#F8D7DA]"
      }`}
    >
      <Image src={errorIcon} alt="error" className="w-6 h-6" />
      <div> {message}</div>
    </div>
  );
};

export default Toast;

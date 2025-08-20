import {
  AiOutlineExclamationCircle,
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { useState, useEffect } from "react";

export default function Alert({ className, title, message, status, ...props }) {
  const [cssStatus, setCssStatus] = useState({
    bg: "bg-yellow-50",
    text: "text-yellow-800",
  });

  useEffect(() => {
    switch (status) {
      case "error":
        setCssStatus({
          bg: "bg-red-50",
          text: "text-red-800",
          icon: <AiOutlineCloseCircle className="h-5 w-5 text-red-400" />,
        });
        break;
      case "warning":
        setCssStatus({
          bg: "bg-yellow-50",
          text: "text-yellow-800",
          icon: <AiOutlineExclamationCircle className="h-5 w-5 text-yellow-400" />,
        });
        break;
      case "success":
        setCssStatus({
          bg: "bg-green-50",
          text: "text-green-800",
          icon: <AiOutlineCheckCircle className="h-5 w-5 text-green-400" />,
        });
        break;
      default:
        setCssStatus({
          bg: "bg-blue-50",
          text: "text-blue-800",
          icon: <AiOutlineInfoCircle className="h-5 w-5 text-blue-400" />,
        });
        break;
    }
  }, [status]);

  return (
    <div className={`rounded-md ${cssStatus.bg} p-4 ${className}`} {...props}>
      <div className="flex">
        <div className="flex-shrink-0">{cssStatus.icon}</div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${cssStatus.text}`}>
            {title}: <span className="font-normal">{message}</span>
          </h3>
          {/* <div className={`mt-2 text-sm ${cssStatus.text}`}>
            <p></p>
            </div> */}
        </div>
      </div>
    </div>
  );
}

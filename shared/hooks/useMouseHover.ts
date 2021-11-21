import { useState } from "react";

export default function useMouseHover() {
  const [isHover, setIsHover] = useState<boolean>(false);
  const onMouseEnterHandler = () => {
    setIsHover(true);
  }

  const onMouseLeaveHandler = () => {
    setIsHover(false);
  }

  return {
    isHover, onMouseEnterHandler, onMouseLeaveHandler
  }
}
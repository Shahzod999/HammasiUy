import { useEffect, useRef, useState } from "react";

function useAnimateOnChange(value: any, duration = 300) {
  const [animate, setAnimate] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), duration);
      prevValue.current = value;
      return () => clearTimeout(timeout);
    }
  }, [value, duration]);

  return animate;
}

export default useAnimateOnChange;
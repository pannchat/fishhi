import { useFocusEffect } from "@chakra-ui/hooks";
import { useCallback, useEffect, useRef, useState } from "react";

interface IInterSectionObserverProps {
  option: IntersectionObserverInit;
  stopObserveInterSecting?: boolean;
}

export default function useIntersectionObserver(props: IInterSectionObserverProps) {
  const { option, stopObserveInterSecting = false } = props;
  const { root, rootMargin, threshold } = option;
  const targetRef = useRef<HTMLDivElement>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [isInterSecting, setIsInterSecting] = useState<boolean>(false);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      const needToSet = stopObserveInterSecting
        ? entry.isIntersecting && !isInterSecting
        : entry.isIntersecting !== isInterSecting;

      if (needToSet) setIsInterSecting(entry.isIntersecting);
    },
    [stopObserveInterSecting, isInterSecting, setIsInterSecting],
  );

  const intersectionObserverConsturctor = useCallback(
    (param: { option?: IntersectionObserverInit; callback?: (entries: IntersectionObserverEntry[]) => void }) => {
      const { option, callback } = param;

      if (callback) {
        const intersectionObserver = new IntersectionObserver(callback, option);
        if (targetRef.current) {
          intersectionObserver.observe(targetRef.current);
        }
        setObserver(intersectionObserver);
        return () => intersectionObserver.disconnect();
      }
    },
    [],
  );

  useEffect(() => {
    intersectionObserverConsturctor({ option, callback });
  }, [intersectionObserverConsturctor, option, callback]);

  useEffect(() => {
    if (observer && isInterSecting && stopObserveInterSecting) {
      observer.disconnect();
      setObserver(null);
    }
  }, [observer, isInterSecting, stopObserveInterSecting]);

  return {
    targetRef,
    isInterSecting,
  };
}

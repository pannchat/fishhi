import React, { ReactNode, useCallback, useEffect, useState } from "react";
import useIntersectionObserver from "../shared/hooks/useIntersectionObserver";

interface IInfiniteScrollWrapperProps {
  children: ReactNode;
  canFetchMore: boolean;
  hasNextPage?: boolean;
  fetchMore: () => void;
  isLoading?: boolean;
  loadingComponent?: ReactNode;
  keepAliveObserver?: boolean;
  horizontal?: boolean;
  intersectionObserverOption?: IntersectionObserverInit;
}

const InfiniteScrollWrapper = (props: IInfiniteScrollWrapperProps) => {
  const {
    children,
    canFetchMore,
    loadingComponent,
    isLoading,
    keepAliveObserver = true,
    hasNextPage = false,
    horizontal = false,
    intersectionObserverOption,

    fetchMore,
  } = props;

  const [callFetch, setCallFetch] = useState<boolean>(false);
  const onIntersectHandler = useCallback(() => {
    setCallFetch(true);
  }, [setCallFetch]);
  useEffect(() => {
    if (callFetch && canFetchMore && !isLoading) {
      fetchMore();
      setCallFetch(false);
    }
  }, [callFetch, canFetchMore, isLoading, fetchMore]);
  return (
    <div className={`infinite-scroll-wrapper`}>
      {children}
      {canFetchMore && hasNextPage && (
        <Trigger
          onIntersect={onIntersectHandler}
          horizontal={horizontal}
          keepObserverAlive={keepAliveObserver}
          intersectionObserverOption={intersectionObserverOption}
        />
      )}

      <style jsx>{`
        .infinite-scroll-wrapper {
          position: relative;
          z-index: 1;
          width: ${horizontal ? "fit-content" : "auto"};
          height: ${horizontal ? "auto" : "fit-content"};
        }
      `}</style>
    </div>
  );
};

export default InfiniteScrollWrapper;

const Trigger = (props: {
  onIntersect: () => void;
  horizontal: boolean;

  keepObserverAlive: boolean;
  intersectionObserverOption?: IntersectionObserverInit;
}) => {
  const { onIntersect, horizontal, keepObserverAlive, intersectionObserverOption } = props;
  const { isInterSecting, targetRef } = useIntersectionObserver({
    option: intersectionObserverOption,
    stopObserveInterSecting: !keepObserverAlive,
  });
  useEffect(() => {
    if (isInterSecting) {
      onIntersect();
    }
  }, [isInterSecting, targetRef, onIntersect]);
  return (
    <div className={`trigger-target${horizontal ? " --horizontal" : " --vertical"}`} ref={targetRef}>
      <style jsx>{`
        .trigger-target {
          position: absolute;
          height: ${horizontal ? "100%" : "10px"};
          width: ${horizontal ? "10px" : "100%"};
          bottom: 10px;
          z-index: 100;
          background-color: red;
        }

        .trigger-target.--horizontal {
          width: 10px;
          height: 100%;
        }

        .trigger-target.--vertical {
          height: 10px;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

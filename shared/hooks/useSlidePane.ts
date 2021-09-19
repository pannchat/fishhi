import produce from "immer";
import { useCallback, useState } from "react";

export type SlidePaneKey = 'isPaneOpen' | 'isPaneOpenLeft' | 'isPaneOpenBottom'

export function useSlidePane() {
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
    isPaneOpenBottom: false,
  });
  const {isPaneOpen, isPaneOpenLeft, isPaneOpenBottom} =  state

  const onClickPane = useCallback((isOpen: boolean, key: SlidePaneKey) => {
    const nextState = produce(state, draftState => {
      draftState[key] = isOpen
    })
  
    setState(nextState);
  }, [state, setState])
  
  return  {
    isPaneOpen,
    isPaneOpenLeft,
    isPaneOpenBottom,
    onClickPane,
  }
}
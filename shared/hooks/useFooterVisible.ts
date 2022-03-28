import { useRecoilState } from 'recoil';
import { footerVisibleState } from '../store/footerVisible';

export default function useFooterVisible() {
  const [isFooterVisible, setIsFooterVisible] = useRecoilState(footerVisibleState);

  return {
    isFooterVisible,
    setIsFooterVisible,
  };
}

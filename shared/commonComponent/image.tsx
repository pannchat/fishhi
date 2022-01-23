/* eslint-disable react/display-name */
import { AspectRatio } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/skeleton';
import { ImageProps } from 'next/image';
import React, { useCallback, useMemo, useState } from 'react';

interface ICustomImageProps extends Partial<ImageProps> {
  width?: string | number;
  height?: string | number;
  src: string;
  ratio: number;
  useLazy?: boolean;
  useSkeleton?: boolean;
}

const CustomImage = React.forwardRef<HTMLImageElement, ICustomImageProps>((props: ICustomImageProps, ref) => {
  const { src, useLazy, useSkeleton, loading, ...rest } = props;
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const onLoadHandler = () => {
    setIsLoad(true);
  };

  const ImageContent = useCallback(() => {
    return (
      <AspectRatio {...rest} onLoad={onLoadHandler}>
        <Image src={src} width="100%" height="100%" loading={loading} onLoad={onLoadHandler} />
      </AspectRatio>
    );
  }, [src, rest, loading]);

  return <ImageContent />;
});

export default CustomImage;

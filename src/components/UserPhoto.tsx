import { Image, IImageProps } from 'native-base';

type UserPhoto = IImageProps & {
  size: number;
};

export function UserPhoto({ size, ...rest }: UserPhoto) {
  return (
    <Image
      h={size}
      w={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  );
}

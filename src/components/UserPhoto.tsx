import { Image, IImageProps } from 'native-base';

type UserPhoto = IImageProps & {
  size: number;
};

export function UserPhoto({ size, ...rest }: UserPhoto) {
  return (
    <Image
      height={size}
      width={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  );
}

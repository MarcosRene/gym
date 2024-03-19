import { Center, Heading } from 'native-base';

type ScreenHeaderProps = {
  title: string;
};

export function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <Center pb={6} pt={16} bg="gray.600">
      <Heading fontSize="xl" color="gray.100">
        {title}
      </Heading>
    </Center>
  );
}

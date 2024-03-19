import { IPressableProps, Pressable, Text } from 'native-base';

type GroupProps = IPressableProps & {
  name: string;
  isActive?: boolean;
};

export function Group({ name, isActive = false, ...rest }: GroupProps) {
  return (
    <Pressable
      height={10}
      width={24}
      mr={3}
      bg="gray.600"
      rounded="md"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      isPressed={isActive}
      _pressed={{
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      {...rest}
    >
      <Text
        fontSize="xs"
        fontWeight="bold"
        {...(isActive ? { color: 'green.500' } : { color: 'gray.200' })}
        textTransform="uppercase"
      >
        {name}
      </Text>
    </Pressable>
  );
}

import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      h={14}
      mb={4}
      px={4}
      fontSize="md"
      fontFamily="body"
      bg="gray.700"
      color="white"
      borderWidth={0}
      placeholderTextColor="gray.300"
      _focus={{
        bg: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      {...rest}
    />
  );
}

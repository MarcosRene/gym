import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from 'native-base';

type InputProps = IInputProps & {
  errorMessage?: string | null;
};

export function Input({ errorMessage = null, isInvalid, ...rest }: InputProps) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl mb={4} isInvalid={invalid}>
      <NativeBaseInput
        h={14}
        px={4}
        fontSize="md"
        fontFamily="body"
        bg="gray.700"
        color="white"
        borderWidth={0}
        placeholderTextColor="gray.300"
        isInvalid={invalid}
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500',
        }}
        {...rest}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
      />

      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base';

type ButtonProps = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline';
};

export function Button({ title, variant = 'solid', ...rest }: ButtonProps) {
  const variantType = {
    solid: {
      bg: 'green.700',
      borderWidth: 0,
      pressed: {
        bg: 'green.500',
      },
      textColor: 'white',
    },
    outline: {
      bg: 'transparent',
      borderWidth: 1,
      pressed: {
        bg: 'gray.500',
      },
      textColor: 'green.500',
    },
  };

  return (
    <NativeBaseButton
      h={14}
      w="full"
      bg={variantType[variant]?.bg}
      borderWidth={variantType[variant]?.borderWidth}
      borderColor="green.500"
      rounded="sm"
      _pressed={{ bg: variantType[variant].pressed.bg }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={variantType[variant].textColor}
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
}

import { buildMessage, isAlphanumeric, ValidateBy, ValidationOptions } from 'class-validator';

export function isAlphanumericWithSpaces(value: unknown, locale: string): boolean {
  if (!value) {
    return false;
  }
  const valueString = value.toString().replace(/\s/g, '');
  //* : isAlphanumeric expects validator.AlphanumericLocale but such type is not available in class-validator
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return isAlphanumeric(valueString, locale);
}

export const IS_ALPHANUMERIC_WITH_SPACES = '';

export function IsAlphanumericWithSpaces(locale?: string, validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_ALPHANUMERIC_WITH_SPACES,
      constraints: [locale],
      validator: {
        validate: (value, args): boolean => isAlphanumericWithSpaces(value, args.constraints[0]),
        defaultMessage: buildMessage((eachPrefix) => eachPrefix + '$property must contain only letters and numbers', validationOptions),
      },
    },
    validationOptions,
  );
}

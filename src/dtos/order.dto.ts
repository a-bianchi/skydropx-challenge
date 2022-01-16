import "reflect-metadata";
import { Type } from "class-transformer";
import {
  IsAlpha,
  isAlpha,
  isAlphanumeric,
  IsAlphanumeric,
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
  ValidatorOptions,
} from "class-validator";

export interface OrderProperties {
  line: number;
  order_reference?: string;
  address_from_name: string;
  address_from_email: string;
  address_from_street1: string;
  address_from_city: string;
  address_from_province: string;
  address_from_postal_code: number;
  address_from_country_code: string;
  address_to_name: string;
  address_to_email: string;
  address_to_street1: string;
  address_to_city: string;
  address_to_province: string;
  address_to_postal_code: number;
  address_to_country_code: string;
  parcel_length: number;
  parcel_width: number;
  parcel_height: number;
  parcel_dimensions_unit: string;
  parcel_weight: number;
  parcel_weight_unit: string;
}

// export const IsAlphanumericWithSpaces = (
//   locale: string,
//   validatorOptions?: ValidatorOptions
// ) => {
//   // use decorator factory way
//   return (target: object, key: string) => {
//     // get target property

//     isAlphanumeric();
//   };
// };

export class Order implements OrderProperties {
  line: number;

  // Any letter and number. Maximum 32 characters 	optional
  @Matches(/^[0-9a-z]*$/i)
  @MaxLength(32)
  @MinLength(0)
  order_reference?: string;

  // Any letter, number and whitespace character. Maximum 64 characters | required
  @Matches(/^[0-9a-záéíóúñ\s]*$/i)
  // @IsAlphanumericWithSpaces("es-ES")
  @MaxLength(64)
  address_from_name!: string;

  // Valid email format | required
  @IsEmail()
  address_from_email!: string;

  // Any character except (%$&@+|). Maximum 128 characters | required
  @Matches(/^[^%$&@+|]*$/)
  @MaxLength(128)
  address_from_street1!: string;

  // Any letter and whitespace character. Maximum 64 characters | required
  @Matches(/^[a-záéíóúñ\s]*$/i)
  @MaxLength(64)
  address_from_city!: string;

  // Any letter and whitespace character. Maximum 64 characters | required
  @Matches(/^[a-záéíóúñ\s]*$/i)
  @MaxLength(64)
  address_from_province!: string;

  // Any digit (number). Exactly 5 characters | required
  @IsNumber()
  @Min(10000, { message: "El código postal debe tener 5 dígitos" })
  // @Matches(/^[0-9]{5}$/)
  @Type(() => Number)
  address_from_postal_code!: number;

  // Any letter. Exactly 2 characters | required
  @Matches(/^[a-zA-Z]{2}$/)
  address_from_country_code!: string;

  // Any letter, number and whitespace character. Maximum 64 characters | required
  @Matches(/^[0-9a-záéíóúñ\s]*$/i)
  @MaxLength(64)
  address_to_name!: string;

  // Valid email format | required
  @IsEmail()
  address_to_email!: string;

  // Any character except (%$&@+|). Maximum 128 characters | required
  @Matches(/^[^%$&@+|]*$/)
  @MaxLength(128)
  address_to_street1!: string;

  // Any letter and whitespace character. Maximum 64 characters | required
  @Matches(/^[a-záéíóúñ\s]*$/i)
  @MaxLength(64)
  address_to_city!: string;

  // Any letter and whitespace character. Maximum 64 characters | required
  @Matches(/^[a-záéíóúñ\s]*$/i)
  @MaxLength(64)
  address_to_province!: string;

  // Any digit (number). Exactly 5 characters | required
  @IsNumber()
  @Min(10000)
  @Type(() => Number)
  address_to_postal_code!: number;

  // Any letter. Exactly 2 characters | required
  @Matches(/^[a-zA-Z]{2}$/)
  address_to_country_code!: string;

  // Any digit (number) | required
  @IsNumber()
  @Type(() => Number)
  parcel_length: number;

  // Any digit (number) | required
  @IsNumber()
  @Type(() => Number)
  parcel_width!: number;

  // Any digit (number) | required
  @IsNumber()
  @Type(() => Number)
  parcel_height!: number;

  // Any letter. Exactly 2 characters | required
  @Matches(/^[a-zA-Z]{2}$/)
  parcel_dimensions_unit!: string;

  // Any digit (number) | required
  @IsNumber()
  @Type(() => Number)
  parcel_weight!: number;

  // Any letter. Exactly 2 characters | required
  @Matches(/^[a-zA-Z]{2}$/)
  parcel_weight_unit!: string;
}

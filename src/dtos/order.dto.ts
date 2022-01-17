import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsEmail, IsNumber, Matches, MaxLength, Min, MinLength } from 'class-validator';
import { IsAlphanumericWithSpaces } from './validators/isAlphanumericWithSpaces';

export interface OrderProperties {
  lineNumber: number;
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

export class Order implements OrderProperties {
  lineNumber: number;

  // Any letter and number. Maximum 32 characters 	optional
  @Matches(/^[0-9a-z]*$/i, { message: 'order_reference must be alphanumeric' })
  @MaxLength(32, { message: 'order_reference must be less than 32 characters' })
  @MinLength(0, { message: 'order_reference must be at least 0 characters' })
  order_reference?: string;

  // Any letter, number and whitespace character. Maximum 64 characters | required
  @MaxLength(64, { message: 'address_from_name must be less than 64 characters' })
  @IsAlphanumericWithSpaces('es-ES', {
    message: 'address_from_name must be alphanumeric with spaces',
  })
  address_from_name!: string;

  // Valid email format | required
  @IsEmail(undefined, { message: 'address_from_email must be a valid email' })
  address_from_email!: string;

  // Any character except (%$&@+|). Maximum 128 characters | required
  @Matches(/^[^%$&@+|]*$/, { message: 'address_from_street1 must be alphanumeric with spaces' })
  @MaxLength(128, { message: 'address_from_street1 must be less than 128 characters' })
  address_from_street1!: string;

  // Any letter and whitespace character. Maximum 64 characters | required
  @IsAlphanumericWithSpaces('es-ES', {
    message: 'address_from_city must be alphanumeric with spaces',
  })
  @MaxLength(64, { message: 'address_from_city must be less than 64 characters' })
  address_from_city!: string;

  // Any letter and whitespace character. Maximum 64 characters | required
  @IsAlphanumericWithSpaces('es-ES', { message: 'address_from_province must be alphanumeric with spaces' })
  @MaxLength(64, { message: 'address_from_province must be less than 64 characters' })
  address_from_province!: string;

  // Any digit (number). Exactly 5 characters | required
  @IsNumber(undefined, { message: 'address_from_postal_code must be a number' })
  @Min(10000, { message: 'address_from_postal_code must be at least 5 digits' })
  @Type(() => Number)
  address_from_postal_code!: number;

  // Any letter. Exactly 2 characters | required
  @Matches(/^[a-zA-Z]{2}$/, { message: 'address_from_country_code must be a valid country code' })
  address_from_country_code!: string;

  // Any letter, number and whitespace character. Maximum 64 characters | required
  @IsAlphanumericWithSpaces('es-ES', {
    message: 'address_to_name must be alphanumeric with spaces',
  })
  @MaxLength(64, { message: 'address_to_name must be less than 64 characters' })
  address_to_name!: string;

  // Valid email format | required
  @IsEmail(undefined, { message: 'address_to_email must be a valid email' })
  address_to_email!: string;

  // Any character except (%$&@+|). Maximum 128 characters | required
  @Matches(/^[^%$&@+|]*$/, { message: 'address_to_street1 must be alphanumeric with spaces' })
  @MaxLength(128, { message: 'address_to_street1 must be less than 128 characters' })
  address_to_street1!: string;

  // Any letter and whitespace character. Maximum 64 characters | required
  @IsAlphanumericWithSpaces('es-ES', {
    message: 'address_to_city must be alphanumeric with spaces',
  })
  @MaxLength(64, { message: 'address_to_city must be less than 64 characters' })
  address_to_city!: string;

  // Any letter and whitespace character. Maximum 64 characters | required
  @IsAlphanumericWithSpaces('es-ES', {
    message: 'address_to_province must be alphanumeric with spaces',
  })
  @MaxLength(64, { message: 'address_to_province must be less than 64 characters' })
  address_to_province!: string;

  // Any digit (number). Exactly 5 characters | required
  @IsNumber(undefined, { message: 'address_to_postal_code must be a number' })
  @Min(10000, { message: 'address_to_postal_code must be at least 5 digits' })
  @Type(() => Number)
  address_to_postal_code!: number;

  // Any letter. Exactly 2 characters | required
  @Matches(/^[a-zA-Z]{2}$/, { message: 'address_to_country_code must be a valid country code' })
  address_to_country_code!: string;

  // Any digit (number) | required
  @IsNumber(undefined, { message: 'parcel_length must be a number' })
  @Type(() => Number)
  parcel_length: number;

  // Any digit (number) | required
  @IsNumber(undefined, { message: 'parcel_width must be a number' })
  @Type(() => Number)
  parcel_width!: number;

  // Any digit (number) | required
  @IsNumber(undefined, { message: 'parcel_height must be a number' })
  @Type(() => Number)
  parcel_height!: number;

  // Any letter. Exactly 2 characters | required
  @Matches(/^[a-zA-Z]{2}$/, { message: 'parcel_dimensions_unit must be a valid unit' })
  parcel_dimensions_unit!: string;

  // Any digit (number) | required
  @IsNumber(undefined, { message: 'parcel_weight must be a number' })
  @Type(() => Number)
  parcel_weight!: number;

  // Any letter. Exactly 2 characters | required
  @Matches(/^[a-zA-Z]{2}$/, { message: 'parcel_weight_unit must be a valid unit' })
  parcel_weight_unit!: string;
}

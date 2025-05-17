import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber, IsEnum, ValidateNested, IsArray } from 'class-validator';

export class createContact {

    @IsNotEmpty()
    @IsString()
    first_name?: string;

    @IsNotEmpty()
    @IsString()
    last_name?: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsString()
    phone_no?: string;

    @IsNotEmpty()
    @IsString()
    message?: string;

}
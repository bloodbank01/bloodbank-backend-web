import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber, IsEnum, ValidateNested, IsArray, IsUUID } from 'class-validator';

export class createAppointment {

    @IsNotEmpty()
    @IsString()
    first_name?: string;

    @IsNotEmpty()
    @IsString()
    phone_no?: string;

    @IsNotEmpty()
    @IsString()
    last_name?: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    hospital_id?: string;

    @IsNotEmpty()
    @IsString()
    message?: string;

}
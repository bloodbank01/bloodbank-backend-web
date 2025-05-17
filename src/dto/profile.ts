import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber, IsEnum, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

// User DTOs
export class UserDTO {
    @IsNotEmpty()
    @IsString()
    firstName?: string;

    @IsNotEmpty()
    @IsString()
    lastName?: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string; //  optional for updates

    @IsOptional()
    @IsNumber()
    age?: number;

    @IsOptional()
    @IsString()
    bloodGroup?: string;

    @IsOptional()
    @IsString()
    mobileNumber?: string;

    @IsOptional()
    @IsString()
    alternativeMobileNumber?: string;

    @IsOptional()
    @IsString()
    profilePicture?: string;

    @IsOptional()
    @IsString()
    gender?: string;
}

export class SignUpDTO extends UserDTO {
    @IsNotEmpty()
    @IsString()
    password?: string; // Password is required for sign up
}

export class LoginDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsString()
    password?: string;
}

// Address DTO
export class AddressDTO {
    @IsNotEmpty()
    @IsString()
    street?: string;

    @IsNotEmpty()
    @IsString()
    city?: string;

    @IsNotEmpty()
    @IsString()
    state?: string;

    @IsNotEmpty()
    @IsString()
    zipCode?: string;

    @IsNotEmpty()
    @IsEnum(['home', 'work', 'other'])
    type?: string;
}

// Hospital DTO
export class HospitalDTO {
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsString()
    address?: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    contactEmail?: string;

    @IsNotEmpty()
    @IsString()
    contactPhone?: string;
}

// Donation Request DTO
export class DonationRequestDTO {
    @IsNotEmpty()
    @IsNumber()
    hospitalId?: number;

    @IsNotEmpty()
    @IsString()
    @IsEnum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    bloodType?: string;
    // Add other fields as necessary, e.g., medical history
}

// Emergency Request DTO
export class EmergencyRequestDTO {
    @IsNotEmpty()
    @IsNumber()
    addressId?: number;
}
//SubAdmin DTO
export class SubAdminDTO{
  @IsNotEmpty()
  @IsString()
  name?:string;

  @IsNotEmpty()
  @IsEmail()
  email?:string
}

// Blood Inventory DTO
export class BloodInventoryDTO {
    @IsNotEmpty()
    @IsNumber()
    hospitalId?: number;

    @IsNotEmpty()
    @IsString()
    @IsEnum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    bloodType?: string;

    @IsNotEmpty()
    @IsNumber()
    quantity?: number;
}
//Blood Request DTO for user and hospital
export class BloodRequestDTO {
    @IsNotEmpty()
    @IsNumber()
    requesteeId?: number;  // Could be User or Hospital ID

    @IsNotEmpty()
    @IsString()
    @IsEnum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    bloodType?: string;

    @IsNotEmpty()
    @IsNumber()
    quantity?: number;

    @IsNotEmpty()
    @IsEnum(['user', 'hospital'])
    requestType?: string;

    @IsNotEmpty()
    @IsString()
    patientDetails?: string;

    @IsNotEmpty()
    @IsEnum(['high', 'medium', 'low'])
    urgency?: string;
}


import { IsString, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  user!: string;

  @IsEmail()
  email!: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  user?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

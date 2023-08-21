import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	@Length(2, 20)
	name: string;

	@IsOptional()
	email?: string;
}

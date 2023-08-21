import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class RegistrationAuthDto {

	@IsEmail()
	@ApiProperty({
		default: 'test@test.ru',
	})
	email: string;

	@Length(2, 40)
	@ApiProperty({
		default: '123',
	})
	password: string;
}

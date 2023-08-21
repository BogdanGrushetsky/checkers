import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { loginAuthDto } from '../dto/login-auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			usernameField: 'email',
		});
	}

	async validate(email: string, password: string): Promise<any> {
		if (!email || !password) {
			throw new UnauthorizedException();
		}
		const user = await this.authService.validationUser(email, password);

		if (!user) {
			throw new UnauthorizedException('Неверный логин или пароль');
		}

		return user;
	}
}
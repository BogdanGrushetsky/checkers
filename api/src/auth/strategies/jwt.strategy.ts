import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userService: UserService, ConfigService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'jwt-secret',
		});
	}
	async validate({ email }: Pick<User, "email">) {
		const user = await this.userService.findOneByEmail(email)
		if (!user) {
			throw new UnauthorizedException('Неверный логин или пароль');
		}
		return user
	}
}
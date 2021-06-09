import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from "@nestjs/passport";
import { jwtConstants } from "./constants";
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        return {
            username: payload.username,
            id: payload.sub,
        };
    }
}
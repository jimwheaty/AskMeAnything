"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(client, jwtService) {
        this.client = client;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        try {
            const user = await this.client.send({ role: 'user', cmd: 'get' }, { username })
                .pipe(operators_1.timeout(5000), operators_1.catchError(err => {
                if (err instanceof rxjs_1.TimeoutError) {
                    return rxjs_1.throwError(new common_1.RequestTimeoutException());
                }
                return rxjs_1.throwError(err);
            }))
                .toPromise();
            return password === (user === null || user === void 0 ? void 0 : user.password) ? user : null;
        }
        catch (e) {
            common_1.Logger.log(e);
            throw e;
        }
    }
    async login(user) {
        const payload = { user, sub: user.id };
        return {
            userId: user.id,
            access_token: this.jwtService.sign(payload)
        };
    }
    validateToken(jwt) {
        return this.jwtService.verify(jwt);
    }
    getUserFromJWT(jwt) {
        return this.jwtService.decode(jwt).sub;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_CLIENT')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
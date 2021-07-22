"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.REDIS,
        options: {
            url: 'redis://localhost:6379'
        }
    });
    await app.listen(() => console.log('Auth Service is up!'));
}
bootstrap();
//# sourceMappingURL=main.js.map
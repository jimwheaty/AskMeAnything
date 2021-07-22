"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const authMicroservice = app.connectMicroservice({
        transport: microservices_1.Transport.REDIS,
        options: {
            url: 'redis://localhost:6379'
        }
    });
    app.setGlobalPrefix('api');
    app.enableCors();
    app.startAllMicroservices();
    await app.listen(8080);
    console.log(`Q&A Management Service is up!`);
}
bootstrap();
//# sourceMappingURL=main.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    const PORT = 8080;
    await app.listen(process.env.PORT || 8080);
    console.log(`App listening on port ${PORT}. Go to http://localhost:${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
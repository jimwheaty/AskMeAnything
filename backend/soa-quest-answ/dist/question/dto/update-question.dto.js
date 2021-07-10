"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQuestionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_question_dto_1 = require("./create-question.dto");
class UpdateQuestionDto extends mapped_types_1.PartialType(create_question_dto_1.CreateQuestionDto) {
}
exports.UpdateQuestionDto = UpdateQuestionDto;
//# sourceMappingURL=update-question.dto.js.map
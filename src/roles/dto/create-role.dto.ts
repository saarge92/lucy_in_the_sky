import { Length } from "class-validator";

export class CreateRoleDto {
    @Length(2, 255)
    name: string;
}
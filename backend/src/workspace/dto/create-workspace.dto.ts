import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkspaceDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}

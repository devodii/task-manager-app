import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkspaceDTO {
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

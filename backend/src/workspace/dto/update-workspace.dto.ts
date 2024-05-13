import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateWorkspaceDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  name: string;
}

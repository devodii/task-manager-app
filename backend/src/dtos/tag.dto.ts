import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TagDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  color: string;
}

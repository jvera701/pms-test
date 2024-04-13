import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator';

export class CardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsOptional()
  statusId: number;
}

export class CardUpdateDto {
  @IsInt()
  cardId: number;

  @IsInt()
  @IsOptional()
  statusId: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}

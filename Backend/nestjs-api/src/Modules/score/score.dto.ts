import { IsOptional, IsNumber, ValidateIf } from 'class-validator';

export class UpdateScoreDto {
  @ValidateIf((o) => o.geographical !== undefined)
  @IsNumber({}, { message: "Geographical must be a number" })
  @IsOptional()
  geographical?: number;

  @ValidateIf((o) => o.technical !== undefined)
  @IsNumber({}, { message: "Technical must be a number" })
  @IsOptional()
  technical?: number;

  @ValidateIf((o) => o.scientifical !== undefined)
  @IsNumber({}, { message: "Scientifical must be a number" })
  @IsOptional()
  scientifical?: number;
}

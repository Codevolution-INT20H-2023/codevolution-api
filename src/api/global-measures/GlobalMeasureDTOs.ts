import { Measure } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class FromToDTO {
  @IsEnum(Measure, {
    message: 'The from is not an enum',
  })
  @IsNotEmpty({
    message: 'The from is empty',
  })
  from: Measure;

  @IsEnum(Measure, {
    message: 'The to is not an enum',
  })
  @IsNotEmpty({
    message: 'The to is empty',
  })
  to: Measure;
}


export class GlobalMeasureDTO extends FromToDTO {

  @IsNumber({}, {
    message: 'The coefficient is not a number',
  })
  @IsNotEmpty({
    message: 'The coefficient is empty',
  })
  coefficient: number;
}
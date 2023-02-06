import { Measure } from "@prisma/client";

export class FromToData {
  from: Measure;
  to: Measure;
}

export class GlobalMeasureData extends FromToData {
  coefficient: number;
}
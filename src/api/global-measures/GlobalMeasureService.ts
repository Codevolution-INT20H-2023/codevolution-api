import { Injectable } from "@nestjs/common";
import { GlobalMeasureDTO } from "./GlobalMeasureDTOs";
import { GlobalMeasureRepository } from "./GlobalMeasureRepository";
import { Measure } from "@prisma/client";
import { FromToData } from "./GlobalMeasureDatas";

@Injectable()
export class GlobalMeasureService {
  constructor(
    private globalMeasureRepository: GlobalMeasureRepository,
  ) {}

  create(data: GlobalMeasureDTO) {
    return this.globalMeasureRepository.create(data);
  }

  async update(data: GlobalMeasureDTO) {
    await this.globalMeasureRepository.update(data);
  }

  get({ from, to }: FromToData) {
    return this.globalMeasureRepository.get(from, to);
  }

  async delete({ from, to }: FromToData) {
    await this.globalMeasureRepository.delete(from, to);
  }
}
import { Body, Controller, Get, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { GlobalMeasureService } from "./GlobalMeasureService";
import { FromToDTO, GlobalMeasureDTO } from "./GlobalMeasureDTOs";
import { JwtGuard } from "../../security/JwtGuard";

@Controller({
  path: '/globalMeasures',
})
export class GlobalMeasureController {
  constructor(
    private globalMeasureService: GlobalMeasureService
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() body: GlobalMeasureDTO
  ) {
    return this.globalMeasureService.create(body);
  }

  @Patch()
  update(
    @Body() body: GlobalMeasureDTO
  ) {
    return this.globalMeasureService.update(body);
  }

  @Post()
  delete(
    @Body() body: FromToDTO
  ) {
    return this.globalMeasureService.delete(body);
  }

  @Get()
  get(
    @Query() query: FromToDTO
  ) {
    return this.globalMeasureService.get(query);
  }
}
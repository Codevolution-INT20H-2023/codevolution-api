import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
import { IngredientService } from "./IngredientService";
import {
  CreateIngredientDTO,
  IngredientMeasureDTO,
  CreateIngredientMeasuresDTO,
  UpdateIngredientDTO, UpdateIngredientMeasureDTO, UpdateIngredientMeasuresDTO, DeleteMeasuresDTO,
} from "./IngredientDTOs";
import { IngredientMeasureService } from "./ingredient-measures/IngredientMeasureService";
import { Measure } from "@prisma/client";
import { JwtGuard } from "../../security/JwtGuard";
import { IngredientByIdPipe } from "./IngredientByIdPipe";
import { QueryIngredientsDTO } from "../QueryAllDTO";

@Controller({
  path: '/ingredients',
})
export class IngredientController {
  constructor(
    private ingredientService: IngredientService,
    private ingredientMeasureService: IngredientMeasureService,
  ) {}

  @Get()
  getAll(
    @Query() query: QueryIngredientsDTO,
  ) {
    return this.ingredientService.getAll(query);
  }

  @Get('/:ingredientId')
  get(
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
    @Query('measures') measures: boolean,
  ) {
    return this.ingredientService.get(ingredientId, measures);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() body: CreateIngredientDTO,
  ) {
    return this.ingredientService.create(body);
  }

  @UseGuards(JwtGuard)
  @Patch('/:ingredientId')
  update(
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
    @Body() body: UpdateIngredientDTO,
  ) {
    return this.ingredientService.update(ingredientId, body);
  }

  @UseGuards(JwtGuard)
  @Delete('/:ingredientId')
  delete(
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
  ) {
    return this.ingredientService.delete(ingredientId);
  }

  @Get('/:ingredientId/measures')
  async getMeasures(
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
  ) {
    const measures = await this.ingredientMeasureService.getMeasures(ingredientId);

    return { measures };
  }

  @Get('/:ingredientId/measures/:measure')
  getMeasure(
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
    @Param('measure') measure: Measure,
  ) {
    return this.ingredientMeasureService.getMeasure(ingredientId, measure);
  }

  @UseGuards(JwtGuard)
  @Post('/:ingredientId/measures')
  createMeasure(
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
    @Body() body: IngredientMeasureDTO,
  ) {
    return this.ingredientMeasureService.createMeasure(ingredientId, body);
  }

  @UseGuards(JwtGuard)
  @Put('/:ingredientId/measures')
  async createMeasures(
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
    @Body() body: CreateIngredientMeasuresDTO,
  ) {
    const measures = await this.ingredientMeasureService.createMeasures(ingredientId, body.measures);

    return { measures };
  }

  @UseGuards(JwtGuard)
  @Patch('/:ingredientId/measures/:measure')
  updateMeasure(
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
    @Param('measure') measure: Measure,
    @Body() body: UpdateIngredientMeasureDTO
  ) {
    return this.ingredientMeasureService.updateMeasure(ingredientId, measure, body);
  }

  @UseGuards(JwtGuard)
  @Patch('/:ingredientId/measures')
  updateMeasures(
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
    @Body() body: UpdateIngredientMeasuresDTO,
  ) {
    return this.ingredientMeasureService.updateMeasures(ingredientId, body.measures);
  }

  @UseGuards(JwtGuard)
  @Delete('/:ingredientId/measures/:measure')
  deleteMeasure(
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
    @Param('measure') measure: Measure,
  ) {
    return this.ingredientMeasureService.deleteMeasure(ingredientId, measure);
  }

  @UseGuards(JwtGuard)
  @Delete('/:ingredientId/measures')
  deleteMeasures(
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
    @Body() body: DeleteMeasuresDTO,
  ) {
    return this.ingredientMeasureService.deleteMeasures(ingredientId, body.measures);
  }


}
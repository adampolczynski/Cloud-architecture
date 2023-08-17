import { Controller, Get, Query } from '@nestjs/common';
import { ImageGeneratorService } from './image-generator.service';

@Controller('image-generator')
export class ImageGeneratorController {
  constructor(private readonly imageGeneratorService: ImageGeneratorService) {}
  @Get()
  async generate(@Query() query: { text: string }) {
    console.log('generate image query: ', query);
    return this.imageGeneratorService.generateImageFromText(query.text);
  }
}

import { Module } from '@nestjs/common';
import { ImageGeneratorService } from './image-generator.service';
import { ImageGeneratorController } from './image-generator.controller';

@Module({
  providers: [ImageGeneratorService],
  controllers: [ImageGeneratorController],
})
export class ImageGeneratorModule {}

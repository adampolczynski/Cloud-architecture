import { Module } from '@nestjs/common';
import { ImageGeneratorService } from './image-generator.service';
import { ImageGeneratorController } from './image-generator.controller';
import { LogsService } from 'src/logs/logs.service';

@Module({
  providers: [ImageGeneratorService, LogsService],
  controllers: [ImageGeneratorController],
})
export class ImageGeneratorModule {}

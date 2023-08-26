import { Injectable } from '@nestjs/common';
import Replicate from 'replicate';
import { LogsService } from 'src/logs/logs.service';

const DEFAULT_REPLICATE_IMG_MODEL =
  'stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478';

@Injectable()
export class ImageGeneratorService {
  private replicate: Replicate;
  constructor(private readonly logsService: LogsService) {
    this.replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN || '',
    });
  }
  async generateImageFromText(text: string) {
    if (!this.replicate) {
      throw new Error('Replicate connection not estabilished');
    }

    await this.logsService.createOne({
      message: `Generate image from text ${text}`,
    });

    return await this.replicate.run(DEFAULT_REPLICATE_IMG_MODEL, {
      input: {
        prompt: text,
      },
      //     webhook: "https://example.com/your-webhook",
      //     webhook_events_filter: ["completed"]
    });
  }
}

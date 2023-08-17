import { Injectable } from '@nestjs/common';
import Replicate from 'replicate';

const DEFAULT_REPLICATE_IMG_MODEL =
  'stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478';

@Injectable()
export class ImageGeneratorService {
  private replicate: Replicate;
  constructor() {
    this.replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN || '',
    });
  }
  async generateImageFromText(text: string) {
    if (!this.replicate) {
      throw new Error('Replicate connection not estabilished');
    }

    return await this.replicate.run(DEFAULT_REPLICATE_IMG_MODEL, {
      input: {
        prompt: text,
      },
      //     webhook: "https://example.com/your-webhook",
      //     webhook_events_filter: ["completed"]
    });
  }
}

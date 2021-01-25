import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { BufferedFile } from './storage.models';
import { FileUploadSingleImageDto, FileUploadPostDto } from './storage.dtos';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadSingleImageDto,
  })
  @ApiCreatedResponse({ description: 'Return link to get image.' })
  @ApiBadRequestResponse({ description: 'Error save image on server.' })
  async uploadSingle(@UploadedFile() image: BufferedFile) {
    return await this.storageService.uploadSingleImage(image);
  }

  @Post('post')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image_mobile_preview', maxCount: 1 },
      { name: 'image_mobile_description', maxCount: 1 },
      { name: 'image_site_preview', maxCount: 1 },
      { name: 'image_site_description', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadPostDto,
  })
  @ApiCreatedResponse({ description: 'Return links to get images for post.' })
  @ApiBadRequestResponse({ description: 'Error save images on server.' })
  async uploadPost(@UploadedFiles() images: BufferedFile) {
    return this.storageService.uploadPostImages(images);
  }
}

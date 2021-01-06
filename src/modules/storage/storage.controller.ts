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
import { FileUploadSingleDto, FileUploadManyDto } from './storage.dtos';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadSingleDto,
  })
  @ApiCreatedResponse({ description: 'Return link to get file.' })
  @ApiBadRequestResponse({ description: 'Error save file on server.' })
  async uploadSingle(@UploadedFile() image: BufferedFile) {
    return await this.storageService.uploadSingle(image);
  }

  @Post('many')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadManyDto,
  })
  @ApiCreatedResponse({ description: 'Return links to get files.' })
  @ApiBadRequestResponse({ description: 'Error save file on server.' })
  async uploadMany(@UploadedFiles() files: BufferedFile) {
    return this.storageService.uploadMany(files);
  }
}

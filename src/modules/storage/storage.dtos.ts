import { ApiProperty } from '@nestjs/swagger';

export class FileUploadSingleImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}

export class FileUploadPostDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image_mobile_preview: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  image_mobile_description: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  image_site_preview: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  image_site_description: any;
}

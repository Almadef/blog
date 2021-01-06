import { ApiProperty } from '@nestjs/swagger';

export class FileUploadSingleDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}

export class FileUploadManyDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image1: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  image2: any;
}

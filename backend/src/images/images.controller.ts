import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(
    @Body() createImageDto: CreateImageDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Image> {
    if (!image) {
      throw new BadRequestException('Please, upload your image');
    }
    return this.imagesService.create(createImageDto, image);
  }

  @Get()
  findAll(): Promise<Image[]> {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Image> {
    return this.imagesService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateImageDto: UpdateImageDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.imagesService.update(id, updateImageDto, image);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return await this.imagesService.remove(id);
  }
}

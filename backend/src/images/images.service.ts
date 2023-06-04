import * as fs from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageDto } from './dto/image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(body: CreateImageDto, image: ImageDto) {
    let newImageFilename = this.saveFileToFolder(image);

    const newImage = this.imageRepository.create({
      filename: newImageFilename,
      description: body.description,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return await this.imageRepository.save(newImage);
  }

  async findAll(): Promise<Image[]> {
    return await this.imageRepository.find();
  }

  async findOne(id: number): Promise<Image> {
    const findImage = await this.imageRepository.findOne({ where: { id: id } });

    if (!findImage) {
      throw new NotFoundException('Image not found');
    }

    return findImage;
  }

  async update(id: number, body: UpdateImageDto, image: ImageDto) {
    let newImageFilename: string | null = null;

    const foundImage = await this.findOne(id);

    if (image) {
      await this.removeFileFromFolder(foundImage.filename);

      delete foundImage.filename;
      newImageFilename = await this.saveFileToFolder(image);
    }

    const updatedImage = {
      id,
      filename:
        newImageFilename !== null ? newImageFilename : foundImage.filename,
      ...body,
      updated_at: new Date(),
    };

    await this.imageRepository.update({ id }, updatedImage);

    return updatedImage;
  }

  async remove(id: number): Promise<number> {
    const foundImage = await this.findOne(id);

    this.removeFileFromFolder(foundImage.filename);

    await this.imageRepository.delete(id);
    return foundImage.id;
  }

  saveFileToFolder(file: ImageDto) {
    const originalname = file.originalname.split('.');
    const filename = +new Date() + '.' + originalname[originalname.length - 1];
    const dir = 'public/files';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const stream = fs.createWriteStream(
      join(
        `public/files`,

        filename,
      ),
    );
    stream.write(file.buffer);
    stream.end();

    return filename;
  }

  removeFileFromFolder(file) {
    const filePath = `public/files/${file}`;

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`);
        return;
      }
      console.log(`File was successfully deleted`);
    });
  }
}

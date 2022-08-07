import { Module } from '@nestjs/common';
import { DownloaderController } from './downloader.controller';
import {DownloaderService} from "./downloader.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Downloader} from "./downloader.model";

@Module({
  controllers: [DownloaderController],
  providers: [DownloaderService],
  imports: [
      SequelizeModule.forFeature([Downloader])
  ]
})
export class DownloaderModule {}

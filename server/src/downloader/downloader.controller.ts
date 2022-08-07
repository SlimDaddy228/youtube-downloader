import {Body, Controller, Post} from '@nestjs/common';
import {DownloaderService} from "./downloader.service";
@Controller('/downloader')
export class DownloaderController {
    constructor (private downloaderService: DownloaderService) {}

    @Post('/getInformation')
    getInfo(@Body() dto: any) {
        return this.downloaderService.getInformationByUrl(dto)
    }
}
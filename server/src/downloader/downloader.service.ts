import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Downloader} from "./downloader.model";
const YT = require('ytdl-core');
const fs = require('fs')

@Injectable()
export class DownloaderService {
    constructor(@InjectModel(Downloader) private downloaderRepository: typeof Downloader) {}

    async getInformationByUrl(dto: any) {
        return await this.buildInformation(dto.url)
    }

    private removeDuplicate(arr: any) {
        let seen: any = {};

        const removeNull = arr.filter(n => n.qualityLabel)
        return removeNull.filter((item) => seen.hasOwnProperty(item.qualityLabel) ? false : (seen[item.qualityLabel] = true))
    }

    private async buildInformation(url: string) {
        let result: any = {}

        try {
            const info = await YT.getInfo(url)

            result = info.formats.map((item) => {
                const {width, height, qualityLabel, itag: quality, url, hasAudio} = item
                return {width, height, qualityLabel, quality, url, hasAudio}
            })

            result = this.removeDuplicate(result).sort((a, b) => {
                if (a.hasAudio > b.hasAudio)
                    return -1;
                if (a.hasAudio < b.hasAudio)
                    return 1;
                return 0;
            })
        } catch (e) {
            throw new HttpException(`Видео не найдено ${url} ${e}`, HttpStatus.BAD_REQUEST)
        }

        return result
    }
}
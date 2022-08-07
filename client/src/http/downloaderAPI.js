import { $host } from "@/http/index";

export const getInformationByUrl = async (url) => {
    const { data } = await $host.post('api/downloader/getInformation', { url });
    return data
}
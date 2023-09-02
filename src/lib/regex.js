/**
 * @param {string} text
 */
export function containsTikTokLink(text) {
    const regex = /https?:\/\/(?:www\.)?tiktok\.com\/\S*\/video\/(\d+)|https?:\/\/(?:www\.)?vm.tiktok.com\/\S*/gm;
    return regex.test(text);
}

/**
 * @param {string} text
 */
export function containsYoutubeLink(text) {
    const regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/img;
    return regex.test(text);
}

/**
 * @param {string} text
 */
export function containsFacebookLink(text) {
    const regex = /^https:\/\/www\.facebook\.com\/([^\/?].+\/)?video(s|\.php)[\/?].*$/gm;
    return regex.test(text);
}

/**
 * @param {string} text
 */
export function containsInstagramLink(text) {
    const regex = /\/p|reel\/(.*?)\//;
    return regex.test(text);
}
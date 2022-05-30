"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
const { google } = require('googleapis');
function getVideoData(videoId) {
    return __awaiter(this, void 0, void 0, function* () {
        const youtube = google.youtube({
            version: 'v3',
            auth: process.env.YOUTUBE_API_KEY
        });
        const res = yield youtube.videos.list({
            part: 'id, snippet, contentDetails, statistics',
            id: videoId
        });
        const videosData = [];
        for (const item of res.data.items) {
            videosData.push({
                serviceName: 'YouTube',
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high.url,
                viewCount: item.statistics.viewCount,
                likeCount: item.statistics.likeCount
            });
        }
        return videosData;
    });
}
;
module.exports = {
    getVideoData
};

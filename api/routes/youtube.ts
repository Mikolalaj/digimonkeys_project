require('dotenv').config();
const {google} = require('googleapis');

type VideoData = {
    serviceName: 'YouTube' | 'Vimeo';
    title: string;
    thumbnail: string;
    viewCount: number;
    likeCount: number;
}

async function getVideoData(videoId: string): Promise<VideoData[]> {
    const youtube = google.youtube({
        version: 'v3',
        auth: process.env.YOUTUBE_API_KEY
    })

    const res = await youtube.videos.list({
        part: 'snippet, contentDetails, statistics',
        id: [videoId, '4JOAqRS_lms']
    })

    const videosData: VideoData[] = []
    for (const item of res.data.items) {
        videosData.push({
            serviceName: 'YouTube',
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            viewCount: item.statistics.viewCount,
            likeCount: item.statistics.likeCount
        })
    }
    return videosData;
};

module.exports = {
    getVideoData
};


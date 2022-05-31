var express = require('express');
var router = express.Router();
var pool = require('../db');
const { getVideoData } = require('./youtube');

router.get('/', async function(req, res, next) {
    const { sub } = req.user;
    if (!sub) {
        return res.status(401).json({ message: 'Authentication error' });
    }
    
    const {sort, limit, skip, liked} = req.query;
    if (!sort || !limit || !skip || !liked) {
        return res.status(400).json({ message: 'No required request params (sort, limit, skip, liked)' });
    }
    if (sort !== 'asc' && sort !== 'desc') {
        return res.status(400).json({ message: 'Invalid \'sort\' parameter' });
    }
    if (limit < 0 || limit > 100) {
        return res.status(400).json({ message: 'Invalid \'limit\' parameter' });
    }
    if (skip < 0) {
        return res.status(400).json({ message: 'Invalid \'skip\' parameter' });
    }
    if (liked !== 'false' && liked !== 'true') {
        return res.status(400).json({ message: 'Invalid \'liked\' parameter' });
    }

    try {
        const { rows } = await pool.query(`
        SELECT
            video_id as id,
            url as url_id,
            to_char(add_date, 'YYYY-MM-DD HH24:MI') as add_date,
            liked
        FROM videos
        WHERE user_id = '${sub}' ${liked == 'true' ? 'AND liked = \'true\'' : ''}
        ORDER BY add_date ${sort}
        LIMIT ${limit}
        OFFSET ${skip}`);

        for (let i = 0; i < rows.length; i++) {
            let videoData = await getVideoData(rows[i].url_id);
            rows[i] = {...rows[i], ...videoData[0]};
        }
        
        req.body = rows;
        next();
    } catch (error) {
        return res.status(500).json({ message: `Internal server error ${error}` });
    }
});

router.get('/info', async function(req, res, next) {
    const { sub } = req.user;
    if (!sub) {
        return res.status(401).json({ message: 'Authentication error' });
    }

    try {
        const { rows } = await pool.query(`
        SELECT
            COUNT(*) as count,
            COUNT(*) FILTER (where liked = true) as countLiked
        FROM videos
        WHERE user_id = '${sub}'`);
        
        return res.status(200).json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: `Internal server error ${error}` });
    }
});

router.post('/', async function(req, res, next) {
    const { sub } = req.user;
    if (!sub) {
        return res.status(401).json({ message: 'Authentication error' });
    }

    const { url, liked, serviceName } = req.body;
    if (url === 'undefined' || liked === 'undefined' || serviceName === 'undefined') {
        return res.status(400).json({ message: 'No required request body (url, liked, serviceName)' });
    }
    
    const videoData = await getVideoData(url);

    if (videoData.length === 0) {
        return res.status(400).json({ message: 'Invalid url' });
    }

    const { rows } = await pool.query(`
    INSERT INTO videos
        (user_id, url, liked, service_name)
    VALUES
        ('${sub}', '${url}', ${liked}, '${serviceName}')
    RETURNING
        video_id as id,
        url as url_id,
        to_char(add_date, 'YYYY-MM-DD HH24:MI') as add_date,
        liked`);

    rows[0] = {...rows[0], ...videoData[0]};
    
    req.body = rows;
    next();
});

router.post('/demo', async function(req, res, next) {
    const { sub } = req.user;
    if (!sub) {
        return res.status(401).json({ message: 'Authentication error' });
    }

    try {
        await pool.query(`
        INSERT INTO videos
            (user_id, url, liked, service_name)
        VALUES
            ('${sub}', 'yJuV8PDwvC8', true, 'YouTube'),
            ('${sub}', 'IXXxciRUMzE', false, 'YouTube'),
            ('${sub}', 'soRjcajliHE', false, 'YouTube'),
            ('${sub}', 'PNWsW6c6t8g', true, 'YouTube'),
            ('${sub}', 'LrSX_OcpeJg', false, 'YouTube'),
            ('${sub}', 'qolmz4FlnZ0', false, 'YouTube'),
            ('${sub}', 'J0DjcsK_-HY', true, 'YouTube'),
            ('${sub}', 'WJ9-xN6dCW4', true, 'YouTube'),
            ('${sub}', 'L62LtChAwww', true, 'YouTube'),
            ('${sub}', 'QnxpHIl5Ynw', false, 'YouTube'),
            ('${sub}', 'WdrNXRdkuG4', false, 'YouTube'),
            ('${sub}', 'LwXQ7WUh-D0', false, 'YouTube'),
            ('${sub}', '1uFv9Ts7Sdw', true, 'YouTube'),
            ('${sub}', 'xzH6toY_EPw', false, 'YouTube'),
            ('${sub}', 'k-9DOwrLdkg', false, 'YouTube'),
            ('${sub}', 'Tw0zYd0eIlk', true, 'YouTube'),
            ('${sub}', 'bRoVXGRm5-Q', true, 'YouTube'),
            ('${sub}', 'P103bWMdvtA', false, 'YouTube'),
            ('${sub}', '5kYsxoWfjCg', false, 'YouTube')
        `);

        res.status(200).json({ message: 'Demo data added' });
    }
    catch (error) {
        return res.status(500).json({ message: `Internal server error ${error}` });
    }

});

router.patch('/favourite', async function(req, res, next) {
    const { sub } = req.user;
    if (!sub) {
        return res.status(401).json({ message: 'Authentication error' });
    }

    const { videoId, liked } = req.body;
    const response = await pool.query(`
    UPDATE
        videos
    SET
        liked = ${liked}
    WHERE
        video_id = '${videoId}'`);
    
    if (response.rowCount === 0) {
        return res.status(404).json({ message: 'Video not found' });
    }
    else {
        return res.status(200).json({ message: 'Video updated' });
    }
});

router.delete('/', async function(req, res, next) {
    const { sub } = req.user;
    if (!sub) {
        return res.status(401).json({ message: 'Authentication error' });
    }

    const { videoId } = req.body;
    const response = await pool.query(`
    DELETE FROM
        videos
    WHERE
        video_id = '${videoId}'`);
    
    if (response.rowCount === 0) {
        return res.status(404).json({ message: 'Video not found' });
    }
    else {
        return res.status(200).json({ message: 'Video deleted' });
    }
});

router.delete('/all', async function(req, res, next) {
    const { sub } = req.user;
    if (!sub) {
        return res.status(401).json({ message: 'Authentication error' });
    }
    try {
        await pool.query(`
        DELETE FROM
            videos
        WHERE
            user_id = '${sub}'`);
        
        return res.status(200).json({ message: 'All videos deleted' });
    }
    catch (error) {
        return res.status(500).json({ message: `Internal server error ${error}` });
    }
});

module.exports = router;
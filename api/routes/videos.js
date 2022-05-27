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
            url,
            to_char(add_date, 'YYYY-MM-DD HH24:MI') as add_date,
            liked
        FROM videos
        WHERE user_id = '${sub}' ${liked == 'true' ? 'AND liked = \'true\'' : ''}
        ORDER BY add_date ${sort}
        LIMIT ${limit}
        OFFSET ${skip}`);

        for (let i = 0; i < rows.length; i++) {
            let videoData = await getVideoData(rows[i].url);
            rows[i].video_data = videoData[0];
        }
        
        req.body = rows;
        next();
    } catch (error) {
        return res.status(500).json({ message: `Internal server error ${error}` });
    }
});

// router.post('/add', async function(req, res, next) {
//     const { productId, shelfCode, width, amount, comments, featureId } = req.body;
//     const productChildId = uuidv4();
//     const { rows } = await pool.query(`
//     INSERT INTO products_child
//         (product_child_id, product_id, shelf_code, width, amount, comments, feature_id, category)
//     VALUES
//         ('${productChildId}', '${productId}', '${shelfCode}', '${width}', '${amount}', '${comments}', ${ifNull(featureId)}, 'meter')
//     RETURNING
//         product_child_id`);
//     req.body = rows;
//     next();
// });

// router.put('/update', async function(req, res) {
//     const { productChildId, shelfCode, width, amount, comments, featureId } = req.body;
//     const response = await pool.query(`
//     UPDATE
//         products_child
//     SET
//         shelf_code = '${shelfCode}',
//         width = '${width}',
//         amount = ${amount},
//         comments = '${comments}',
//         feature_id = ${ifNull(featureId)}
//     WHERE
//         product_child_id = '${productChildId}'`);
//     res.send(response);
// });


module.exports = router;
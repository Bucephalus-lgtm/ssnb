const Notice = require('../models/notice');

// exports.list = function(req, res) {
//     Notice.find({}).exec(function(err, notices) {
//         res.render('notices', {
//             notices: notices,
//         });
//     });
// }

exports.productById = function (req, res, next, id) {
    Product.findById(id).populate('category').exec(function (err, product) {
        if (err || !product) {
            return res.status(400).json({
                error: 'Product not found'
            });
        }
        req.product = product;
        next();
    });
};

exports.getNoticeById = (req, res, next, id) => {
    Notice.findById(id).exec((err, notice) => {
        if (err || !notice) {
            return res.status(400).json({
                error: 'Notice not found!'
            });
        }
        req.notice = notice;
        next();
    });
}

exports.readNoticeById = (req, res, next) => {
    // if (req.notice) {
    //     console.log('Notice: ', req.notice);
    // } else {
    //     console.log('ok');
    // }
    if (req.notice) {
        res.set('Content-Type', 'application/pdf');
        return res.send(req.notice.file);
    }
    next();

    // 5fb59173ff1fc60017c33547
}
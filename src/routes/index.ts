import { RequestHandler } from "express";
export let article = require('./article');
export let user = require('./user');

export let index: RequestHandler = (req, res, next) => {
    req.models.Article
        .find({ published: true }, 
            null, 
            { sort: { _id: -1 } },
            (error, articles) => {
                if (error) return next(error);
                res.render('index', {articles: articles})
            });
}
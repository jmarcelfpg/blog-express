import { Request, Response, NextFunction, RequestHandler } from "express";

export let show: RequestHandler = (req, res, next) => {
    if (!req.params.slug) return next(new Error('No article slug.'))
    req.models.Article.findOne({ slug: req.params.slug },
        (error, article) => {

            if (error) return next(error)
            if (article && req.session) {
                if (!article.published && !req.session.admin) return res.status(401).send()
                res.render('article', article)
            }
        })
};
export let list: RequestHandler = (req, res, next) => {
    req.models.Article.list((error, articles) => {
        if (error) return next(error);
        res.send({ articles: articles })
    })
};
export let add: RequestHandler = (req, res, next) => {
    if (!req.body.article) return next(new Error('No article payload.'))
    let article = req.body.article
    article.published = false
    req.models.Article.create(article)
        .then((articleResponse) => {
            res.send(articleResponse);
        })
        .catch(next);
};
export let edit: RequestHandler = (req, res, next) => {
    if (!req.params.id) return next(new Error('No article ID.'));
    if (!req.body.article) return next(new Error('No article payload.'));

    // using findById()
    req.models.Article.findById(req.params.id)
        .then((article) => {
            if (article) {
                article.set(req.body.article);
                return article.save();
            }
        })
        .then((savedDoc) => {
            res.send(savedDoc);
        })
        .catch(next);

    //using findByIdAndUpdate
    // req.models.Article.findByIdAndUpdate(
    //     req.params.id,
    //     {$set: req.body.article},
    //     (error, doc) => {
    //         if(error) return next(error)
    //         res.send(doc);
    //     }
    // ) 
};
export let del: RequestHandler = (req, res, next) => {
    if (!req.params.id) return next(new Error('No article ID.'))
    req.models.Article.findById(req.params.id)
        .then((article) => {
            if (!article) return next(new Error('Article not found'))
            return article.remove()
        })
        .then((doc) => {
            res.send(doc)
        })
        .catch(next);
};
export let post: RequestHandler = (req, res, next) => {
    if (!req.body.title) { res.render('post') }
};
export let postArticle: RequestHandler = (req, res, next) => {
    if (!req.body.title || !req.body.slug || !req.body.text) {
        return res.render('post', { error: 'Fill title, slug and text.' })
    }
    const article = {
        title: req.body.title,
        slug: req.body.slug,
        text: req.body.text,
        published: false
    }
    req.models.Article.create(article)
    .then((articleResponse) => {
        res.render('post',
            { error: 'Article was added. Publish it on Admin page.' })
    })
    .catch(next);
};
export let admin: RequestHandler = (req, res, next) => {
    req.models
        .Article.list((error, articles) => {
            if (error) return next(error)
            res.render('admin', { articles: articles })
        });
};
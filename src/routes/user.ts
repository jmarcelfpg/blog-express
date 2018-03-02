import { Request, Response, NextFunction, RequestHandler } from "express";
import {User} from "../models";

export let list: RequestHandler = (req, res, next) => {
    res.send('respond with a resource')
};
export let login: RequestHandler = (req, res, next) => {
    res.render('login')
};
export let logout: RequestHandler = (req, res, next) => {
    if (req.session) {
        req.session.destroy(next)
    }
    res.redirect('/')
};
export let authenticate: RequestHandler = (req, res, next) => {
    if (!req.body.email || !req.body.password)
        return res.render('login', {
            error: 'Please enter your email and password.'
        })
    User.findOne({
        email: req.body.email,
        password: req.body.password
    })
        .then((user) => {
            if (!user) return res.render('login', { error: 'Incorrect email&password combination.' })
            if (req.session) {
                req.session.user = user
                req.session.admin = user.admin
            }
            res.redirect('/admin')
        })
        .catch(next);
};
import mongoose from 'mongoose';
import express from 'express'
export = express;

declare global {
    namespace Express {
        interface Request {
            models: mongoose.BlogModels;
        }
    }
}
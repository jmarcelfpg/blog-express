declare module 'mongoose' {
    import mongoose from 'mongoose';
    export interface UserDocument extends mongoose.Document{
        email: string,
        admin: string,
        password: boolean
    }
    export interface UserModel extends mongoose.Model<UserDocument> {
        // Static methods here
    }
    export interface ArticleDocument extends mongoose.Document{
        title: string,
        slug: string,
        published: boolean,
        text: string
    }
    export interface ArticleModel extends mongoose.Model<ArticleDocument> {
        list: (cb: (error: Error, article: ArticleDocument)=>void)=>void;        
    }
    export interface BlogModels {
        Article: ArticleModel;
        User: UserModel;
    }
}

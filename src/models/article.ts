import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: [function (value){
            return value.length <= 120;
        }, 'Tittle is too long (120 max)'],
        default: 'New Post'
    },
    text: String,
    published: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        set: function (value: string){
            return value.toLowerCase().replace(' ', '-');
        }
    }
})

articleSchema.static({
    list: function(callback: Function){
        this.find({}, null, {sort: {_id: -1}}, callback);
    }
});


export const Article: mongoose.ArticleModel = mongoose.model<mongoose.ArticleDocument, mongoose.ArticleModel>('Article', articleSchema);
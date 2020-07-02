import * as mongoose from 'mongoose';

export interface Comment {
    pmid: number,
    author?: string,
    content: string,
}

const CommentSchema = new mongoose.Schema({
    pmid:{
        type: Number,
        required: true,
    },
    author:{
        type: String,
        required:false,
    },
    content:{
        type: String,
        required:true,
    },
});

export const commentModel = mongoose.model('comment', CommentSchema);
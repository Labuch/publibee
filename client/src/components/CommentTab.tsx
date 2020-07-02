import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { fetchComments, writeComment } from '../api/CommentApi';

const CommentTab: FunctionComponent = (props) => {

    const pmid = props.id

    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const submitComment = async (e) => {
        e.preventDefault();
        const newComment = {
            author: author,
            content: content,
            pmid,
        }
        writeComment(newComment);

    }

    return (
        <form>
            <p>Write your comment</p>
            <input
                type="text"
                value={author}
                placeholder='author'
                onChange={(e) => setAuthor(e.target.value)}
            />
            <input
                type="text"
                value={content}
                placeholder='Type you comment'
                onChange={(e) => setContent(e.target.value)}
            />
            <input onClick={submitComment} type="submit" value="Submit" />

        </form>
    )
}

export default CommentTab;
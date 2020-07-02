import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { IComment } from '../api/CommentApi';

const CommentContainer = styled.div`
    max-height: 100px;
    overflow-y: scroll;
`

const CommentList: FunctionComponent<{ comments: IComment[] }> = (props) => {

    const comments: IComment[] = props.comments;
    return (
        <CommentContainer>
            {comments.map((comment: IComment) => {
                return (<p> {comment.content} by {comment.author}</p>)
            })}
        </CommentContainer>
    )
}

export default CommentList;
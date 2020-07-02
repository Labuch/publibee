import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { IMedlineCitation } from '../api/PubMed';
import CommentTab from './CommentTab';
import CommentList from './CommentList';
import { IComment } from '../api/CommentApi';

const Card = styled.div`
display: flex;
flex-direction: column;
border-radius: 10px;
background-color: white;
padding: 10px;
margin: 15px 10px 0px 10px;
`
const CardTitle = styled.div`
color: #00a8f3;
`
const CardDetail = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
`
const ArticleDetails: FunctionComponent<{ medlineCitation: IMedlineCitation, comment: IComment[] }> = (props) => {

    const medlineCitation: IMedlineCitation = props.medlineCitation;
    const comments: IComment[] = props.comments;
    const renderAuthor = () => {
        const authorList = medlineCitation.Article.AuthorList;
        return (
            <select>
                {Array.isArray(authorList?.Author) ?
                    authorList?.Author.map((author) => {
                        return (<option>{`${author.ForeName}, ${author.LastName}`}</option>)
                    }) :
                    <option>{`${authorList.Author.ForeName}, ${authorList.Author.LastName}`}</option>}
            </select>
        );
    };

    return (
        <Card key={medlineCitation.PMID}>
            <CardTitle><p>{medlineCitation.Article.ArticleTitle}</p></CardTitle>
            <CardDetail>
                <div>{renderAuthor()}</div>
                <div>{medlineCitation.Article.Journal?.Title}</div>
                <div>{medlineCitation.Article.ArticleDate?.Year || 'NaN'} - {medlineCitation.Article.ArticleDate?.Month || 'NaN'}</div>
            </CardDetail>
            <CommentList comments={comments} />
            <CommentTab id={medlineCitation.PMID} />
        </Card>
    );

};

export default ArticleDetails;
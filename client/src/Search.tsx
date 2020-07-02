import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { fetchArticles, fetchArticleIds, PubMedArticle } from './api/PubMed';
import { fetchComments, IComment } from './api/CommentApi';
import ArticleDetails from './components/ArticleDetails';

const Layout = styled.div`
padding:20px;
display:flex;
flex-direction:column;
height:100vh;
`
const ArticleList = styled.div`
background-color: #9e9e9e42;
`

const InputSearch = styled.input`
border-radius: 15px;
outline: none;
width:700px;
height: 2.5em; 
border: solid 1px grey;
`

export default function Search() {

    //SET INITIAL STATE OF THE SEARCH PAGE
    const [searchTerm, setSearchTeam] = useState('');
    const [articlesContent, setArticles] = useState<PubMedArticle[]>([]);
    const [comments, setComments] = useState<IComment[]>([]);

    const callSearchFunction = async (e) => {
        e.preventDefault();
        const articleIds = await fetchArticleIds(searchTerm);
        if (articleIds) {
            const articles: PubMedArticle[] = await fetchArticles(articleIds);
            setArticles(articles);
            const comments: IComment[] = await fetchComments(articleIds);
            setComments(comments);
        }
        setSearchTeam('');
    }

    const getCommentByPmid = (id: number): IComment[] => {
        return comments.filter((comment: IComment) => comment.pmid === id)
    }

    return (
        <Layout>
            <form>
                <h1>Publibee</h1>
                <p>Search on PubMed with an intuitive interface. Pin Articles to resume your work from anywhere</p>
                <InputSearch
                    type="text"
                    value={searchTerm}
                    placeholder='Search PubMed'
                    onChange={(e) => setSearchTeam(e.target.value)}
                />
                <input onClick={callSearchFunction} type="submit" value="Search" />

            </form>
            <ArticleList>
                {articlesContent.map((article: PubMedArticle) => {
                    return (<ArticleDetails medlineCitation={article.MedlineCitation} comments={getCommentByPmid(article.MedlineCitation.PMID)} />);
                })}

            </ArticleList>

        </Layout>
    );

}
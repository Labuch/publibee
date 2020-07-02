import axios from 'axios';

const BASE_URL = 'http://localhost:3050/comments';

// Interface that describe one comment for a pub med article 
export interface IComment {
  pmid: number,
  author?: string,
  content: string,
}

// Function that fetch all the comments written for the pubmed's articles 
export async function fetchComments(ids: number[]) {
  const response = await axios.get(`${BASE_URL}?id=${ids.join()}`);
  if (!response) throw new Error(response);
  return response.data;
}

// Function that write a comment 
export async function writeComment(comment: IComment) {
  const response = await axios.post(`${BASE_URL}`, comment);
  return response.data;
}

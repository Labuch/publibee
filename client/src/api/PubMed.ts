import * as convert from 'xml-js';


const BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
const API_KEY = '9b82706607e092f5cffaa3f779be3214c708'

export interface PubMedArticle {
  MedlineCitation: IMedlineCitation,
}
export interface IMedlineCitation {
  Article: IPubMedArticle,
  PMID: number,
}
// Interface that describe the metadata of one article from the Pub med database 
export interface IPubMedArticle {
  Abstract: { AbstractText: string },
  ArticleDate: {
    Year: number,
    Month: number,
    Day: number,
  }
  ArticleTitle: string,
  Journal: { Title: string },
  AuthorList: {
    Author: [
      {
        ForeName: string,
        LastName: string,
      } 
    ] | {
      ForeName: string,
      LastName: string,
    } ;
  }
}


function nativeType(value) {
  const nValue = Number(value);
  if (!isNaN(nValue)) {
    return nValue;
  }
  const bValue = value.toLowerCase();
  if (bValue === 'true') {
    return true;
  } else if (bValue === 'false') {
    return false;
  }
  return value;
}
// Function that get the value of text attribut and put it as the value of his parent element 
const removeJsonTextAttribute = function (value, parentElement) {
  try {
    var keyNo = Object.keys(parentElement._parent).length;
    var keyName = Object.keys(parentElement._parent)[keyNo - 1];
    parentElement._parent[keyName] = nativeType(value);
  } catch (e) { }
}


// Function that fetch all the articles which have id in the pubmed database from the given list 
export async function fetchArticles(ids: number[]): Promise<PubMedArticle[]> {
  const response = await fetch(`${BASE_URL}efetch.fcgi?db=pubmed&retmode=xml&api_key${API_KEY}&id=${ids.join()}`);
  if (!response.ok) throw new Error(response.statusText);
  const xml = await response.text();
  const xmlOptions = {
    compact: true,
    ignoreComment: true,
    spaces: 4,
    textKey: 'value',
    ignoreAttributes: true,
    textFn: removeJsonTextAttribute
  };
  const data = JSON.parse(convert.xml2json(xml, xmlOptions));
  console.log(data.PubmedArticleSet);
  return data.PubmedArticleSet.PubmedArticle;
}

// Function that fetch a list of article's id that the search api pub med returned
export async function fetchArticleIds(searchTerm: string) {
  const response = await fetch(`${BASE_URL}esearch.fcgi?db=pubmed&retmode=json&api_key${API_KEY}&term=${searchTerm}`);
  if (!response.ok) throw new Error(response.statusText);
  const data = await response.json();
  return data.esearchresult.idlist;
}

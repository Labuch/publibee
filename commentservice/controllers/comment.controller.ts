import * as express from 'express';
import Controller from './controller.interface'
import { commentModel, Comment }from '../models/comment';

class CommentsController implements Controller
{

    public path = '/comments';
    public router = express.Router();
    private comment = commentModel;
   
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this. getPostsByIds);
        this.router.post(this.path, this.createPost);
    }
    private getPostsByIds = (request: express.Request, response: express.Response) => {
      const params = request.query;
      const idList = params?.id?.split(',') || [''];
      this.comment.find({
          pmid: {
           $in: idList
          }
        })
        .then((posts) => {
          response.send(posts);
      })
    }
    
    private createPost(request: express.Request, response: express.Response) {
        const postData: Comment = request.body;
        const createdPost = new commentModel(postData);
        createdPost.save()
          .then(savedPost => {
            response.send(savedPost);
          })
    }
}
export default CommentsController; 

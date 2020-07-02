
import 'dotenv/config';
import App from './app';
import CommentsController from './controllers/comment.controller';
 
 
const app = new App(
  [
    new CommentsController(),
  ],
);
 
app.listen();
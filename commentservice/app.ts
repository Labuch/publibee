
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';

import Controller from './controllers/controller.interface';

class App {
    public app: express.Application;
   
    constructor(controllers: Controller[]) {
      this.app = express();

      this.connectToTheDatabase();
      this.initializeMiddlewares();
      this.initializeControllers(controllers);
    }
   
    public listen() {
      this.app.listen(3050, () => {
        console.log(`App listening on the port 3050`);
      });
    }
   
    private initializeMiddlewares() {
      this.app.use(bodyParser.json());
      this.app.use(cors());
    }
   
    private initializeControllers(controllers: Controller[]) {
      controllers.forEach((controller) => {
        this.app.use('/', controller.router);
      });
    }
   
    private connectToTheDatabase() {

        const  MONGO_USER = 'commentApi';
        const MONGO_PASSWORD = 'GDU2YZE4DN673HBEI37623';
        const MONGO_PATH = '@ds249025.mlab.com:49025/publibee'
        
        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    }
  }
   
export default App;






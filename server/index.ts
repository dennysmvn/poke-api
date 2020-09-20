import './common/env';
import Server from './common/server';
import routes from './routes';
import Graceful from './common/graceful';

new Graceful().shutdown();
const PORT = parseInt(process.env.PORT || '3000', 10);
export default new Server().connectToDatabase().router(routes).configurationAfterRouter().listen(PORT);

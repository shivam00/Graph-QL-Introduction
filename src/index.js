import server from './server';
import { PORT } from './config/constants';

const main = async () => {
  try {
    const app = await server();

    app.listen(PORT, () => {
      console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
    });
  } catch (error) {
    throw error;
  }
};

main();

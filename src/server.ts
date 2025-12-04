import app from './app';
import { sequelize } from './config/db';

const PORT = process.env.LISTEN_PORT;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:3000', // Pas aan naar je frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Zorg ervoor dat cookies en headers goed worden meegestuurd
};

const configureCors = cors(corsOptions);

export default configureCors;

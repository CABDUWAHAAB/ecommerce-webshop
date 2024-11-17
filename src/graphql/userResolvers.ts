import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

const resolvers = {
  Query: {
    getUsers: async () => {
      return User.find();
    },
    getUser: async (_: any, { id }: { id: string }) => {
      return User.findById(id);
    },
  },

  Mutation: {
    register: async (_: any, { name, email, password }: { name: string; email: string; password: string }) => {
      console.log("Initiating registration for:", email);
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          console.error("Registration failed: User already exists:", email);
          throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        const token = generateToken(savedUser.id);

        return {
          token,
          user: savedUser,
        };
      } catch (error: any) {
        console.error("Registration error:", error.message);
        throw new Error('Registration failed: ' + (error.message || 'Unknown error'));
      }
    },

    login: async (_: any, { email, password }: { email: string; password: string }) => {
      console.log("Attempting login for:", email);
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        console.error("Login failed: User not found:", email);
        throw new Error('User not found');
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        console.error("Login failed: Invalid password for user:", email);
        throw new Error('Invalid password');
      }

      const token = generateToken(user.id);

      return {
        token,
        user,
      };
    },
  },
};

export default resolvers;

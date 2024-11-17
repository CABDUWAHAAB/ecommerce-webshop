import Product, { IProduct } from '../models/Product';

const productResolver = {
  Query: {
    getProducts: async () => {
      return await Product.find();
    },
    getProduct: async (_: any, { id }: { id: string }) => {
      return await Product.findById(id);
    },
  },

  Mutation: {
    // Product toevoegen
    addProduct: async (_: any, { name, description, price, stock }: { name: string, description: string, price: number, stock: number }) => {
      const newProduct = new Product({
        name,
        description,
        price,
        stock,
      });

      const savedProduct = await newProduct.save();
      return savedProduct;
    },

    // Product bijwerken
    updateProduct: async (_: any, { id, name, description, price, stock }: { id: string, name?: string, description?: string, price?: number, stock?: number }) => {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, description, price, stock },
        { new: true }
      );
      return updatedProduct;
    },

    // Product verwijderen
    deleteProduct: async (_: any, { id }: { id: string }) => {
      await Product.findByIdAndDelete(id);
      return true;
    },
  },
};

export default productResolver;

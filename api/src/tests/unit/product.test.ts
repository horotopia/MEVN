const mockingoose =require('mockingoose');
import { Product, ProductModel } from '../../models';

describe('ProductService', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    it('should validate', async () => {
      const product = new ProductModel({
        name: 'Pikachu',
        description: 'Pokémon électrique',
        type: 'électricité',
        evolutionLevel: 2,
        evolutionReference: 'Pichu',
        weight: 6000,
        height: 40,
        age: 4,
        price: 50000,
        category: 'pokémon',
        stock: 5,
      });

      await product.validate();

      expect(product.toObject()).toHaveProperty('name');
      expect(product.toObject()).toHaveProperty('description');
      expect(product.toObject()).toHaveProperty('type');
      expect(product.toObject()).toHaveProperty('evolutionLevel');
      expect(product.toObject()).toHaveProperty('evolutionReference');
      expect(product.toObject()).toHaveProperty('weight');
      expect(product.toObject()).toHaveProperty('height');
      expect(product.toObject()).toHaveProperty('age');
      expect(product.toObject()).toHaveProperty('price');
      expect(product.toObject()).toHaveProperty('category');
      expect(product.toObject()).toHaveProperty('stock');
    });


    it('should create a new product successfully', async () => {
      const product: Partial<Product> = {
        name: 'Pikachu',
        description: 'Pokémon électrique',
        type: 'électricité',
        evolutionLevel: 2,
        evolutionReference: 'Pichu',
        weight: 6000,
        height: 40,
        age: 4,
        price: 50000,
        category: 'pokémon',
        stock: 5,
      };

      mockingoose(ProductModel).toReturn(product, 'save');

      const result = await ProductModel.create(product);
      expect(result).toMatchObject({
        name: 'Pikachu'
      });
    });
  });

  describe('findProductById', () => {
    it('should find a product by id', async () => {
      const mockProduct = {
        _id: '507f191e810c19729de860ea',
        name: 'Pikachu',
        description: 'Pokémon électrique',
        type: 'électricité',
        evolutionLevel: 2,
        evolutionReference: 'Pichu',
        weight: 6000,
        height: 40,
        age: 4,
        price: 50000,
        category: 'pokémon',
        stock: 5,
      };

      mockingoose(Product).toReturn(mockProduct, 'findOne');

      const result = await productService.findProductById('507f191e810c19729de860ea');

      expect(result).toEqual(expect.objectContaining(mockProduct));
    });

    it('should return null if product not found', async () => {
      mockingoose(Product).toReturn(null, 'findOne');

      const result = await productService.findProductById('507f191e810c19729de860ea');

      expect(result).toBeNull();
    });
  });

  describe('updateProduct', () => {
    it('should update a product successfully', async () => {
      const mockProduct = {
        _id: '507f191e810c19729de860ea',
        name: 'Pikachu',
        description: 'Pokémon électrique',
        type: 'électricité',
        evolutionLevel: 2,
        evolutionReference: 'Pichu',
        weight: 6000,
        height: 40,
        age: 4,
        price: 50000,
        category: 'pokémon',
        stock: 5,
      };

      const updatedProduct = {
        ...mockProduct,
        name: 'Raichu',
      };

      mockingoose(Product).toReturn(updatedProduct, 'findOneAndUpdate');

      const result = await productService.updateProduct('507f191e810c19729de860ea', { name: 'Raichu' });

      expect(result).toEqual(expect.objectContaining(updatedProduct));
    });

    it('should throw an error if product not found', async () => {
      mockingoose(Product).toReturn(null, 'findOneAndUpdate');

      await expect(productService.updateProduct('507f191e810c19729de860ea', { name: 'Raichu' })).rejects.toThrow('Product not found');
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product successfully', async () => {
      const mockProduct = {
        _id: '507f191e810c19729de860ea',
        name: 'Pikachu',
        description: 'Pokémon électrique',
        type: 'électricité',
        evolutionLevel: 2,
        evolutionReference: 'Pichu',
        weight: 6000,
        height: 40,
        age: 4,
        price: 50000,
        category: 'pokémon',
        stock: 5,
      };

      mockingoose(Product).toReturn(mockProduct, 'findOneAndDelete');

      const result = await productService.deleteProduct('507f191e810c19729de860ea');

      expect(result).toEqual(expect.objectContaining(mockProduct));
    });

    it('should return null if product not found', async () => {
      mockingoose(Product).toReturn(null, 'findOneAndDelete');

      const result = await productService.deleteProduct('507f191e810c19729de860ea');

      expect(result).toBeNull();
    });
  });
});

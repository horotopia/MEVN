import { ProductService } from '../../services/mongoose/product.service';
import { MongooseService } from '../../services/mongoose/mongoose.service';
import mockingoose from 'mockingoose';
import { Product } from '../../models';

describe('ProductService', () => {
  let productService: ProductService;
  let mongooseService: MongooseService;

  beforeAll(() => {
    mongooseService = new MongooseService();
    productService = new ProductService(mongooseService);
  });

  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe('createProduct', () => {
    it('should create a new product successfully', async () => {
      const mockProduct = {
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

      mockingoose(Product).toReturn(mockProduct, 'save');

      const result = await productService.createProduct(mockProduct);

      expect(result).toEqual(expect.objectContaining(mockProduct));
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

// import { OrdersService } from '../../services/mongoose/orders.service';
// import { MongooseService } from '../../services/mongoose/mongoose.service';
// import mockingoose from 'mockingoose';
// import { Orders } from '../../models';

// describe('OrdersService', () => {
//   let ordersService: OrdersService;
//   let mongooseService: MongooseService;

//   beforeAll(() => {
//     mongooseService = new MongooseService();
//     ordersService = new OrdersService(mongooseService);
//   });

//   beforeEach(() => {
//     mockingoose.resetAll();
//   });

//   describe('createOrder', () => {
//     it.skip('should create a new order successfully', async () => {
//       const mockOrder = {
//         userId: '507f191e810c19729de860ea',
//         items: [
//           { productId: '507f191e810c19729de860eb', quantity: 2, price: 10 },
//         ],
//         totalAmount: 20,
//         status: 'pending',
//       };

//       mockingoose(Orders).toReturn(mockOrder, 'save');

//       const result = await ordersService.createOrder(mockOrder);

//       expect(result).toEqual(expect.objectContaining(mockOrder));
//     });

//     it.skip('should throw an error if total amount is invalid', async () => {
//       const mockOrder = {
//         userId: '507f191e810c19729de860ea',
//         items: [
//           { productId: '507f191e810c19729de860eb', quantity: 2, price: 10 },
//         ],
//         totalAmount: 30, // Invalid total amount
//         status: 'pending',
//       };

//       await expect(ordersService.createOrder(mockOrder)).rejects.toThrow('Invalid total amount');
//     });
//   });

//   describe('findOrdersById', () => {
//     it.skip('should find an order by id', async () => {
//       const mockOrder = {
//         _id: '507f191e810c19729de860ea',
//         userId: '507f191e810c19729de860eb',
//         items: [
//           { productId: '507f191e810c19729de860ec', quantity: 2, price: 10 },
//         ],
//         totalAmount: 20,
//         status: 'pending',
//       };

//       mockingoose(Orders).toReturn(mockOrder, 'findOne');

//       const result = await ordersService.findOrdersById('507f191e810c19729de860ea');

//       expect(result).toEqual(expect.objectContaining(mockOrder));
//     });

//     it.skip('should return null if order not found', async () => {
//       mockingoose(Orders).toReturn(null, 'findOne');

//       const result = await ordersService.findOrdersById('507f191e810c19729de860ea');

//       expect(result).toBeNull();
//     });
//   });

//   describe('updateOrder', () => {
//     it.skip('should update an order successfully', async () => {
//       const mockOrder = {
//         _id: '507f191e810c19729de860ea',
//         userId: '507f191e810c19729de860eb',
//         items: [
//           { productId: '507f191e810c19729de860ec', quantity: 2, price: 10 },
//         ],
//         totalAmount: 20,
//         status: 'pending',
//       };

//       const updatedOrder = {
//         ...mockOrder,
//         status: 'completed',
//       };

//       mockingoose(Orders).toReturn(updatedOrder, 'findOneAndUpdate');

//       const result = await ordersService.updateOrder('507f191e810c19729de860ea', { status: 'completed' });

//       expect(result).toEqual(expect.objectContaining(updatedOrder));
//     });

//     it.skip('should throw an error if order not found', async () => {
//       mockingoose(Orders).toReturn(null, 'findOneAndUpdate');

//       await expect(ordersService.updateOrder('507f191e810c19729de860ea', { status: 'completed' })).rejects.toThrow('Order not found');
//     });
//   });

//   describe('deleteOrder', () => {
//     it.skip('should delete an order successfully', async () => {
//       const mockOrder = {
//         _id: '507f191e810c19729de860ea',
//         userId: '507f191e810c19729de860eb',
//         items: [
//           { productId: '507f191e810c19729de860ec', quantity: 2, price: 10 },
//         ],
//         totalAmount: 20,
//         status: 'pending',
//       };

//       mockingoose(Orders).toReturn(mockOrder, 'findOneAndDelete');

//       const result = await ordersService.deleteOrder('507f191e810c19729de860ea');

//       expect(result).toEqual(expect.objectContaining(mockOrder));
//     });

//     it.skip('should throw an error if order not found', async () => {
//       mockingoose(Orders).toReturn(null, 'findOneAndDelete');

//       await expect(ordersService.deleteOrder('507f191e810c19729de860ea')).rejects.toThrow('Order not found');
//     });
//   });
// });

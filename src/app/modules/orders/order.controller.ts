import { NextFunction, Request, Response } from 'express';
import { OrderService } from './order.service';
import { Types } from 'mongoose';

//controller for posting an order in database
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;
    if (!Types.ObjectId.isValid(order.product)) {
      throw new Error('ID is not valid. Provide a mongodb _id');
    }
    const newOrder = await OrderService.createOrderIndb(order);
    res.status(200).json({
      success: true,
      data: newOrder,
    });
  } catch (err) {
    next(err);
  }
};

//controller for getting total revenue from database
const getRevenue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalRevenue = await OrderService.CalculateRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: {
        totalRevenue,
      },
    });
  } catch (err) {
    next(err);
  }
};
export const OrderController = {
  createOrder,
  getRevenue,
};

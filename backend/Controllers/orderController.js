import { AsyncError } from "../middleware/catchAsyncError.js";
import { orderModel } from "../Models/orderModel.js";
import { ProductModels } from "../Models/productModel.js";
import { ErrorHandler } from "../Utils/errorHandler.js";

// create Order ----------http://localhost:8080/cart/order/new

export const newOrder = AsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  let order = await orderModel.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(200).json({ sucess: true, order });
});

//Get Single Order  http://localhost:8080/cart/order/:id

export const getSingleOrder = AsyncError(async (req, res, next) => {
  let id = req.params.id;
  let order = await orderModel.findById(id).populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler(`Order Not Found This Id ${id}`, 404));
  }

  res.status(200).json({ sucess: true, order });
});

// (login User Current )Get Loggged User Order  ===========  http://localhost:8080/cart/myorders

export const myOrder = AsyncError(async (req, res, next) => {
  let id = req.user.id;

  const orders = await orderModel.find({ user: id });
  res.status(200).json({ sucess: true, orders });
});

// Admin : Get all Orders --/orders---------------------(Admin)

export const orders = AsyncError(async (req, res, next) => {
  const orders = await orderModel.find();

  let totalAmount = 0;

  orders.forEach((e) => {
    totalAmount += e.totalPrice;
  });

  res.status(200).json({ sucess: true, totalAmount, orders });
});



// Admin : Update Order---Product Quantity (Stock)-Order Status---- /updateorder/:id

export const updateOrder = AsyncError(async (req, res, next) => {
  let id = req.params.id;
  let order = await orderModel.findById(id);


  if (order.orderStatus == "Delivered") {
    return next(new ErrorHandler("Order Has Been Already Delivered", 404));
  }
  //   Update the Select Product Stock For Each Items =====
  order.orderItems.forEach(async (e) => {
    await updateStock(e.product, e.quantity);
  });

  order.orderStatus = req.body.orderStatus;

  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({ sucess: true });
});

async function updateStock(productId, quantity) {
  const product = await ProductModels.findById(productId);

  product.stock = product.stock - quantity;

  product.save({ validateBeforeSave: false });
}


// Admin : Delete Order /order/:id


export const orderDelete=AsyncError(async (req,res,next)=>{

    let id = req.params.id;
    let order = await orderModel.findById(id);

    if (!order) {
        return next(new ErrorHandler(`Order Not Found This Id ${id}`, 404));
      }

      await orderModel.deleteOne({_id:id})

      res.status(200).json({
        success: true,
        message: "Order Deleted",
      });
})
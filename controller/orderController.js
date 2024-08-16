const Order = require("../models/orderSchema");
const Plat = require("../models/platSchema");
// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};





// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user plats");
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user plats");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};






exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Recalculer le totalAmount en fonction des plats actuels
    const plats = await Plat.find({ '_id': { $in: updatedOrder.plats } });

    // Vérifiez et calculez le total
    updatedOrder.totalAmount = plats.reduce((total, plat) => {
      const prix = plat.prix;
      if (typeof prix === 'number' && !isNaN(prix)) {
        return total + prix;
      } else {
        console.error(`Invalid price for plat with ID ${plat._id}: ${prix}`);
        return total;
      }
    }, 0);

    // Enregistrer la commande mise à jour
    await updatedOrder.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};





// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



//get order par userid =Obtenir toutes les commandes d'un utilisateur spécifique par ID utilisateur
exports.getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate("plats");
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// // Obtenir toutes les commandes d'un utilisateur par son nom d'utilisateur
// exports.getOrdersByUsername = async (req, res) => {
//   try {
//     const user = await User.findOne({ nom: req.params.username });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const orders = await Order.find({ user: user._id }).populate("plats");
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };




// Obtenir toutes les commandes contenant un plat spécifique
exports.getOrdersByPlatId = async (req, res) => {
  try {
    const orders = await Order.find({ plats: req.params.platId }).populate("user");
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
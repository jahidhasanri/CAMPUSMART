/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import useAxios from "../../Hooks/useAxios";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
const axiosInstance = useAxios();
  // Load cart items
  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/cart?email=${user.email}`)
        .then((res) => setCartItems(res.data))
        .catch((error) => console.log(error));
    }
  }, [user]);

  // Increase Quantity
  const increaseQty = async (id, quantity) => {
    const newQty = quantity + 1;

    await axiosInstance.patch(`/cart/${id}`, {
      quantity: newQty,
    });

    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: newQty } : item
    );

    setCartItems(updated);
  };

  // Decrease Quantity
  const decreaseQty = async (id, quantity) => {
    if (quantity <= 1) return;

    const newQty = quantity - 1;

    await axiosInstance.patch(`/cart/${id}`, {
      quantity: newQty,
    });

    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: newQty } : item
    );

    setCartItems(updated);
  };

  // Delete Item
  const deleteItem = async (id) => {
    await axios.delete(`/cart/${id}`);

    const remaining = cartItems.filter((item) => item._id !== id);

    setCartItems(remaining);

    toast.success("Item removed from cart");
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">My Cart</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">

          <thead className="bg-gray-200">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>

                <td>
                  <img
                    src={item.image}
                    className="w-[60px] h-[60px] object-cover"
                  />
                </td>

                <td>{item.title}</td>

                <td>${item.price}</td>

                <td>
                  <div className="flex items-center gap-2">

                    <button
                      onClick={() =>
                        decreaseQty(item._id, item.quantity)
                      }
                      className="px-3 py-1 bg-gray-300"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQty(item._id, item.quantity)
                      }
                      className="px-3 py-1 bg-gray-300"
                    >
                      +
                    </button>

                  </div>
                </td>

                <td>${item.price * item.quantity}</td>

                <td>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Price */}
      <div className="mt-6 text-right text-xl font-semibold">
        Total Price: ${totalPrice}
      </div>
    </div>
  );
};

export default Cart;
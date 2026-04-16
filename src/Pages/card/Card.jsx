/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";


import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { user ,fetchCart} = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
const axiosInstance = useAxios();
const navigate = useNavigate();
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
  try {
    const newQty = quantity + 1;

    const res = await axiosInstance.patch(`/cart/${id}`, {
      quantity: newQty,
    });

    if (res.data.modifiedCount > 0) {
      const updated = cartItems.map((item) =>
        item._id === id ? { ...item, quantity: newQty } : item
      );

      setCartItems(updated);
    }
  } catch (error) {
    console.log(error);
  }
};



  // Decrease Quantity
const decreaseQty = async (id, quantity) => {
  if (quantity <= 1) return;

  try {
    const newQty = quantity - 1;

    const res = await axiosInstance.patch(`/cart/${id}`, {
      quantity: newQty,
    });

    if (res.data.modifiedCount > 0) {
      const updated = cartItems.map((item) =>
        item._id === id ? { ...item, quantity: newQty } : item
      );

      setCartItems(updated);
    }
  } catch (error) {
    console.log(error);
  }
};



  // Delete Item
  const deleteItem = async (id) => {
    await axiosInstance.delete(`/cart/${id}`);

    const remaining = cartItems.filter((item) => item._id !== id);

    setCartItems(remaining);

    toast.success("Item removed from cart");
    fetchCart();
  };



  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


//   payment
  const handlePayment = async () => {

  if (cartItems.length === 0) {
    toast.error("Your cart is empty");
    return;
  }

  try {
    const response = await axiosInstance.post("/finalOrder", {
      orders: cartItems,
  userInfo:{
      name:user?.displayName,
      email:user?.email,
    },
  total: totalPrice
    });

    if (response.data.url) {
      window.location.replace(response.data.url);
    }

  } catch (error) {
    console.error("Payment Error:", error);
    toast.error("Payment failed!");
  }
};




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
      <div className="mt-6 text-right text-xl font-semibold">
        Total Price: ${totalPrice}
      </div>

            <div className="mt-8 flex justify-center gap-10 items-center">

  {/* Continue Shopping */}
  <button
    onClick={() => navigate("/all-posts")}
    className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
  >
    Continue Shopping
  </button>

  {/* Proceed To Checkout */}
  <button
     onClick={handlePayment}
    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
  >
    Proceed To Checkout
  </button>

</div>

    

    </div>
  );
};

export default Cart;
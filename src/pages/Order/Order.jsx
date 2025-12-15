import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { useForm, Watch } from "react-hook-form";
import Swal from "sweetalert2";

const Order = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [meal, setMeal] = useState({});
  const [chefInfo, setChefInfo] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { error },
  } = useForm({
    defaultValues: {
      quantity: 1,
      address: "",
    },
  });

  const quantity = watch("quantity");

  useEffect(() => {
    if (meal?.chefEmail) {
      axiosSecure.get(`/users/${meal.chefEmail}`).then((res) => {
        setChefInfo(res.data);
      });
    }
  }, [meal?.chefEmail, axiosSecure]);

  // fetch meal details by id
  useEffect(() => {
    if (!id) return;
    let canceled = false;
    axiosSecure
      .get(`/meals/${id}`)
      .then((res) => {
        const fetched = res.data?.meal || res.data || {};
        if (!canceled) setMeal(fetched);
      })
      .catch((err) => {
        console.error("Failed to fetch meal", err);
      });
    return () => {
      canceled = true;
    };
  }, [id, axiosSecure]);

  const onSubmit = async (data) => {
    const orderData = {
      userEmail: user?.email,
      userName: user?.displayName,

      mealName: meal?.title,
      mealImage: meal?.image,
      chefName: meal.chefName,
      chefEmail: meal?.chefEmail,
      chefId: chefInfo?.chefId,
      price: meal?.price,
      quantity: data.quantity,
      totalPrice: meal?.price * data.quantity,
      address: data.address,
      status: "pending",
      paymentStatus: "unpaid",
      orderedAt: new Date(),
    };
    const result = await Swal.fire({
      title: "Confirm Order?",
      text: "You are about to place this order",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes,place it!",
    });
    if (!result.isConfirmed) return;

    axiosSecure
      .post("/orders", orderData)
      .then(() => {
        Swal.fire({
          title: "Order Placed Successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(`/meal/${id}`);
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong!", "error");
      });
  };
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Order: {meal?.title}
        </h2>

        {/* Meal Info */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <img
            src={meal?.image}
            alt=""
            className="w-full md:w-1/2 rounded-lg object-cover"
          />
          <div className="flex-1 space-y-3">
            <h3 className="text-2xl font-semibold">{meal?.title}</h3>
            <p className="text-gray-600">{meal?.description}</p>
            <p className="text-lg font-medium">
              Price: ${Number(meal?.price || 0).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">Chef: {meal?.chefName}</p>
          </div>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="font-semibold">Your Name</label>
            <input
              type="text"
              value={user?.displayName}
              disabled
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Address */}
          <div>
            <label className="font-semibold">Delivery Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              {...register("address", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="font-semibold">Quantity</label>
            <input
              type="number"
              min="1"
              {...register("quantity", { required: true, min: 1 })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Total */}
          <div className="text-xl font-semibold">
            Total: $
            {((Number(meal?.price) || 0) * (Number(quantity) || 0)).toFixed(2)}
          </div>

          <button className="btn bg-red-600 text-white hover:bg-red-700 w-full text-lg">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;

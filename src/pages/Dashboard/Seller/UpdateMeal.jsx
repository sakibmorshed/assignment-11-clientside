import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateMeal = () => {
  const meal = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updateMeal = {
      foodName: form.foodName.value,
      price: Number(form.price.value),
      ingredients: form.ingredients.value,
      deliveryTime: form.deliveryTime.value,
      rating: Number(form.rating.value),
    };

    await axiosSecure.patch(`/meals/${meal._id}`, updateMeal);
    Swal.fire("Meal updated successfully");
    navigate("/dashboard/myMeals");
  };
  return (
    <form onSubmit={handleUpdate} className="max-w-xl mx-auto p-6">
      <b>Food Name : </b>
      <input
        name="foodName"
        placeholder="Food Name..."
        defaultValue={meal.foodName}
        className="input input-bordered w-full mb-3"
      />
      <b>Food Price : </b>
      <input
        name="price"
        placeholder="Food price..."
        defaultValue={meal.price}
        type="number"
        className="input input-bordered w-full mb-3"
      />
      <b>Food Rating : </b>
      <input
        name="rating"
        placeholder="Food rating..."
        defaultValue={meal.rating}
        type="number"
        className="input input-bordered w-full mb-3"
      />
      <b>Food Delivery-Time : </b>
      <input
        name="deliveryTime"
        placeholder="Food deliveryTime..."
        defaultValue={meal.estimatedDeliveryTime}
        className="input input-bordered w-full mb-3"
      />
      <b>Food Ingredients : </b>
      <textarea
        name="ingredients"
        placeholder="Food ingredient..."
        defaultValue={meal.ingredients}
        className="textarea textarea-bordered w-full mb-3"
      ></textarea>

      <button className="btn btn-primary w-full">Update Meal</button>
    </form>
  );
};

export default UpdateMeal;

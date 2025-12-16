import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: meals = [], refetch } = useQuery({
    queryKey: ["myMeals", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/chef/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This meal will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/meals/${id}`);
      Swal.fire("Meal has been removed Successfully!");
      refetch();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-red-600">
        My Meals
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal._id} className="card bg-base-100 hover:shadow-2xl">
            <figure>
              <img src={meal.foodImage} alt={meal.foodName} />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{meal.foodName}</h2>

              <p>
                <strong>Price:</strong> ${meal.price}
              </p>
              <p>
                <strong>Rating:</strong> ⭐ {meal.rating}
              </p>
              <p>
                <strong>Ingredients:</strong> {meal.ingredients}
              </p>
              <p>
                <strong>Delivery:</strong> {meal.deliveryTime} mins
              </p>

              <div className="divider"></div>

              <p>
                <strong>Chef:</strong> {meal.chefName}
              </p>
              <p>
                <strong>Chef ID:</strong> {meal.chefId}
              </p>

              <div className="card-actions justify-between mt-4">
                <Link
                  to={`/dashboard/updateMeal/${meal._id}`}
                  className="btn btn-sm bg-green-600"
                >
                  Update
                </Link>

                <button
                  onClick={() => handleDelete(meal._id)}
                  className="btn btn-sm bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMeals;

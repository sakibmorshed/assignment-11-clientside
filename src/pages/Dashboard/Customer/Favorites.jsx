import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router";
import {
  Heart,
  Trash2,
  ShoppingCart,
  Calendar,
  DollarSign,
  ChefHat,
  Sparkles,
} from "lucide-react";

const Favorites = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: favorites = [], refetch } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/favorites/${user.email}`);
      return result.data;
    },
  });

  const handleRemove = async (id) => {
    if (!confirm("Remove from Favorites?")) return;

    await axiosSecure.delete(`/favorites/${id}`);
    toast.success("Removed!");
    refetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gradient-to-br from-red-500 to-pink-600 p-3 rounded-2xl shadow-lg">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                My Favorites
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {favorites.length} {favorites.length === 1 ? "meal" : "meals"}{" "}
                saved for later
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {favorites.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 p-8 rounded-full mb-6">
              <Heart className="w-20 h-20 text-red-500 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
              Start adding meals to your favorites to save them for later!
            </p>
            <Link
              to="/meals"
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Browse Meals
            </Link>
          </div>
        )}

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((f) => (
            <div
              key={f._id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              {/* Top Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-red-500/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
              </div>

              {/* Gradient Overlay Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 dark:from-red-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative p-6">
                {/* Meal Icon/Avatar */}
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-12 h-12 text-red-600 dark:text-red-400" />
                  </div>
                </div>

                {/* Meal Name */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {f.mealName}
                </h3>

                {/* Details */}
                <div className="space-y-3 mb-5">
                  {/* Chef */}
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                      <ChefHat className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Chef
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {f.chefName}
                      </p>
                    </div>
                  </div>

                  {/* Price & Date Row */}
                  <div className="flex items-center justify-between gap-3">
                    {/* Price */}
                    <div className="flex items-center gap-2 flex-1">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                        <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Price
                        </p>
                        <p className="font-bold text-green-600 dark:text-green-400">
                          ${f.price}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 flex-1">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                        <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Added
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {new Date(f.addedTime).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/meal/${f.mealId}`}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Order Now
                  </Link>

                  <button
                    onClick={() => handleRemove(f._id)}
                    className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-2.5 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 hover:scale-105"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Bottom Shine Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;

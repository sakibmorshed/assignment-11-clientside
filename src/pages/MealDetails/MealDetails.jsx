import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Card from "../../components/Home/Card";

const MealDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/meals/${id}`
      );
      return result.data;
    },
  });

  // Fetch related meals (same chef)
  const { data: relatedMeals = [] } = useQuery({
    queryKey: ["relatedMeals", meal.chefId],
    enabled: !!meal.chefId,
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/meals`);
      const meals = result.data.meals || [];
      return meals
        .filter((m) => m.chefId === meal.chefId && m._id !== meal._id)
        .slice(0, 4);
    },
  });

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/reviews/${id}`);
      return result.data;
    },
  });

  const handleSubmitReview = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const newReview = {
      foodId: id,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      reviewerEmail: user.email,
      rating,
      comment,
    };

    await axiosSecure.post("/reviews", newReview);

    toast.success("Review added!");
    setIsOpen(false);
    setRating(5);
    setComment("");

    refetch();
  };

  const handleFavorite = async () => {
    if (!user) {
      return navigate("/login");
    }

    const fav = {
      userEmail: user.email,
      mealId: meal._id,
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
    };
    const res = await axiosSecure.post("/favorites", fav);

    if (res.data.message === "Already added") {
      return toast.error("Already in favorites!");
    }
    toast.success("Added to favorites");
  };

  if (isLoading) return <LoadingSpinner />;

  const {
    foodName,
    foodImage,
    chefName,
    price,
    ingredients,
    estimatedDeliveryTime,
    chefExperience,
    chefId,
  } = meal;

  return (
    <Container>
      {/* Main Meal Details Section */}
      <div className="max-w-5xl mx-auto p-6 mt-20">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl font-semibold mb-6 mt-6 text-center bg-black/50 text-white py-2 w-60 rounded-md">
            {foodName}
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-neutral-400 hover:bg-neutral-50 dark:hover:bg-gray-700 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Food Images */}
          <div className="space-y-4">
            <div className="relative rounded-md overflow-hidden">
              <img
                src={foodImage}
                alt={foodName}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[foodImage, foodImage, foodImage].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${foodName} view ${idx + 1}`}
                  className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 text-lg dark:text-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {foodName}
            </h2>

            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Chef:
                </span>{" "}
                {chefName}
              </p>
              <p>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Price:
                </span>{" "}
                <span className="text-red-600 dark:text-red-400 font-bold text-2xl">
                  ${price}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Rating:
                </span>{" "}
                ⭐{" "}
                <span className="text-yellow-500">{meal.rating || rating}</span>
              </p>
            </div>

            <div className="border-t pt-4 dark:border-gray-700">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                A delicious and authentic {foodName} prepared by {chefName} with
                years of experience. Made with fresh, high-quality ingredients
                and traditional cooking methods.
              </p>
            </div>

            <div className="border-t pt-4 dark:border-gray-700">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                Key Information
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Ingredients:
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {" "}
                    {ingredients}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Delivery Time:
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {" "}
                    {estimatedDeliveryTime}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Chef Experience:
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {" "}
                    {chefExperience}
                  </span>
                </p>
              </div>
            </div>

            <Link
              to={`/order/${meal._id}`}
              className="inline-block mt-4 bg-red-600 text-white rounded-full hover:bg-red-800 font-semibold px-8 py-3 transition"
            >
              Order Now
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleFavorite}
            className="bg-red-600 text-white rounded-lg hover:bg-red-800 px-5 py-2 transition"
          >
            Add to Favorite
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Give Review
          </button>
        </div>
      </div>

      {/* More from this Chef Section - Modern Design */}
      {relatedMeals.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          {/* Section Header */}
          <div className="text-center mb-10">
            <p className="text-red-600 dark:text-red-400 font-semibold text-sm uppercase tracking-wider mb-2">
              Discover
            </p>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              More Dishes
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore other delicious dishes crafted by our talented chefs.
            </p>
          </div>

          {/* Horizontal Scrollable Cards */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {relatedMeals.map((relatedMeal) => (
                <div
                  key={relatedMeal._id}
                  className="flex-shrink-0 w-72 sm:w-80 snap-start"
                >
                  {/* Modern Card Design */}
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedMeal.foodImage}
                        alt={relatedMeal.foodName}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                      {/* HOT Badge */}
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        🔥 HOT
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">
                          {relatedMeal.rating || "5.0"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate">
                        {relatedMeal.foodName}
                      </h4>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        By {relatedMeal.chefName}
                      </p>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Starting from
                          </p>
                          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                            ${relatedMeal.price}
                          </p>
                        </div>

                        <Link
                          to={`/meal/${relatedMeal._id}`}
                          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator - Only visible on desktop */}
            <div className="hidden md:flex justify-center mt-6 gap-2">
              {relatedMeals.map((_, idx) => (
                <div
                  key={idx}
                  className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"
                ></div>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <Link
              to={`/meals`}
              className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold hover:gap-3 transition-all"
            >
              View All Dishes
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Reviews & Ratings
          </h3>

          {reviews.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No reviews yet! Be the first to review this meal.
            </p>
          ) : (
            <div className="space-y-6">
              {reviews.map((r) => (
                <div
                  key={r._id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md flex gap-4 items-start"
                >
                  <img
                    src={r.reviewerImage}
                    alt={r.reviewerName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-red-500 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {r.reviewerName}
                      </h4>
                      <span className="text-yellow-500 font-bold whitespace-nowrap">
                        ⭐ {r.rating}.0
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 italic">
                      "{r.comment}"
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(r.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Add Review
            </h3>

            <label className="block font-semibold text-gray-900 dark:text-white mb-2">
              Rating (1–5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded mb-4 dark:bg-gray-700 dark:text-white"
            />

            <label className="block font-semibold text-gray-900 dark:text-white mb-2">
              Comment
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded mb-4 dark:bg-gray-700 dark:text-white resize-none"
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default MealDetails;

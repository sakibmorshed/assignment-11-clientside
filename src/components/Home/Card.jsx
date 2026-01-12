import { Link } from "react-router";

const Card = ({ meal }) => {
  return (
    <div className="bg-white  rounded-3xl p-4 sm:p-6 shadow-xl shadow-gray-200/50 dark:shadow-none transition-transform hover:-translate-y-2 w-full">
      {/* Image */}
      <div className="relative mb-6 flex justify-center">
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full shadow-2xl"
        />

        {/* HOT Badge */}
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          HOT
        </div>
      </div>

      {/* Content */}
      <div className="text-center flex flex-col h-full">
        {/* Food Name */}
        <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
          {meal.foodName}
        </h3>

        {/* Chef */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          By: {meal.chefName} (ID: {meal.chefId})
        </p>

        {/* Rating */}
        <div className="flex justify-center gap-1 mb-4 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < Math.round(meal.rating) ? "★" : "☆"}</span>
          ))}
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
            {meal.rating}
          </span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
            ${meal.price}
          </span>

          <Link
            to={`/meal/${meal._id}`}
            className="px-4 py-2 font-bold rounded-xl text-sm transition-all
            border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;

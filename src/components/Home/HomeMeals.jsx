import Card from "./Card";
import Container from "../Shared/Container";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SkeletonLoader from "../Shared/SkeletonLoader";
import { motion } from "framer-motion";
import { cardUp } from "../CardAnimation/CardAnimation";

const HomeMeals = () => {
  const { data = {}, isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/meals`);
      return result.data;
    },
  });

  const meals = data.meals || [];

  console.log(meals);

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mt-20"
      >
        <h2 className="text-3xl font-semibold text-red-600 dark:text-red-500">
          Comfort Food Classics
        </h2>
        <p className="text-xl text-gray-500 dark:text-gray-400 my-4">
          Eat well, live better.
        </p>
      </motion.div>

      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 gap-y-8 sm:gap-y-10">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : meals.slice(0, 6).map((meal) => (
              <motion.div
                key={meal._id}
                variants={cardUp}
                initial="hidden"
                animate="visible"
                className="w-full"
              >
                <Card meal={meal} />
              </motion.div>
            ))}
      </div>
    </Container>
  );
};

export default HomeMeals;

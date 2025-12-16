import Card from "./Card";
import Container from "../Shared/Container";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { motion } from "framer-motion";
import { cardUp } from "../CardAnimation/CardAnimation";

const HomeMeals = () => {
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/meals`);
      return result.data;
    },
  });

  console.log(meals);
  if (isLoading) return <LoadingSpinner />;
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mt-20"
      >
        <h2 className="text-3xl font-semibold text-red-600">
          Comfort Food Classics
        </h2>
        <p className="text-xl text-gray-500 my-4">Eat well, live better.</p>
      </motion.div>

      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 gap-y-10">
        {meals.slice(0, 6).map((meal) => (
          <motion.div
            key={meal._id}
            variants={cardUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-80px",
            }}
          >
            <Card meal={meal} />
          </motion.div>
        ))}
      </div>
    </Container>
  );
};

export default HomeMeals;

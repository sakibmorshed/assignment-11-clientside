import Card from "./Card";
import Container from "../Shared/Container";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";

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
      <div className="text-center mt-20">
        <h2 className="text-3xl text-center font-semibold text-red-600">
          Comfort Food Classics
        </h2>
        <p className="text-xl text-gray-500 truncate my-4 text-center">
          Eat well, live better.
        </p>
      </div>
      <div>
        {meals && meals.length > 0 ? (
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 gap-y-10 justify-around">
            {meals.slice(0, 6).map((meal) => (
              <Card key={meal._id} meal={meal} />
            ))}
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default HomeMeals;

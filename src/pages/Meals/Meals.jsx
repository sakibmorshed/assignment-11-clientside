import React, { useState } from "react";
import Container from "../../components/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Card from "../../components/Home/Card";
import { cardUp } from "../../components/CardAnimation/CardAnimation";
import { motion } from "framer-motion";

const Meals = () => {
  const [sortOrder, setSortOrder] = useState("none");
  const [page, setPage] = useState(1);
  const { data = {}, isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/meals?page=${page}`
      );
      return result.data;
    },
  });

  const meals = data.meals || [];
  const totalPages = data.totalPages || 1;

  console.log(meals);
  if (isLoading) return <LoadingSpinner />;

  const sortedItem = () => {
    if (sortOrder === "price-asc") {
      return [...meals].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-dsc") {
      return [...meals].sort((a, b) => b.price - a.price);
    } else {
      return meals;
    }
  };
  return (
    <Container>
      <div className="mt-30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold text-red-600">
            The Meals Board
          </h2>
          <p className="text-xl text-gray-500 my-4">
            Quick access to your next favorite dish. View all chef-recommended
            specials and order today.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <span className="font-semibold text-2xl text-red-600">Sorting :</span>

          <label className="form-control w-full max-w-xs">
            <select
              className="select select-bordered text-gray-500 border-black"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="none">Sort by price</option>
              <option value="price-asc">Low-to-High</option>
              <option value="price-dsc">High-to-Low</option>
            </select>
          </label>
        </div>

        {sortedItem().length > 0 && (
          <div
            key={sortOrder}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10"
          >
            {sortedItem().map((meal) => (
              <motion.div
                key={meal._id}
                variants={cardUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                <Card meal={meal} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-2 mt-10 mb-10">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`btn btn-sm ${page === num + 1 ? "btn-primary" : ""}`}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </Container>
  );
};

export default Meals;

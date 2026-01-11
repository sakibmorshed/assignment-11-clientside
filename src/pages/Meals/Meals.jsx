import React, { useState, useEffect } from "react";
import Container from "../../components/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SkeletonLoader from "../../components/Shared/SkeletonLoader";
import Card from "../../components/Home/Card";
import { motion } from "framer-motion";
import { cardUp } from "../../components/CardAnimation/CardAnimation";

const Meals = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [rawQuery, setRawQuery] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [filterPriceRange, setFilterPriceRange] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  // debounce raw input before applying to the query key
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(rawQuery.trim());
    }, 400);

    return () => clearTimeout(handler);
  }, [rawQuery]);

  const { data = {}, isLoading } = useQuery({
    queryKey: [
      "meals",
      page,
      searchQuery,
      filterRating,
      filterPriceRange,
      sortOrder,
    ],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals`, {
        params: {
          page,
          search: searchQuery,
          rating: filterRating,
          price: filterPriceRange,
          sort: sortOrder,
        },
      });
      console.log("Backend response:", res.data);
      return res.data;
    },
    keepPreviousData: true,
  });

  const meals = data.meals || [];
  const totalPages = data.totalPages || 1;

  console.log({ page, searchQuery, filterRating, filterPriceRange, sortOrder });

  return (
    <Container>
      <div className="mt-24">
        {/* Search */}
        <input
          type="text"
          placeholder="Search meals or chefs..."
          value={rawQuery}
          onChange={(e) => {
            setRawQuery(e.target.value);
            setPage(1);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchQuery(rawQuery.trim());
            }
          }}
          className="w-full max-w-xl mx-auto block px-4 py-3 border rounded-lg"
        />

        {/* Visible feedback for debugging / UX */}
        <div className="text-center text-sm text-gray-600 mt-4">
          {searchQuery ? (
            <span>
              Showing <strong>{meals.length}</strong> results for "{searchQuery}
              "
            </span>
          ) : (
            <span>Showing popular meals</span>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <select
            onChange={(e) => setFilterRating(e.target.value)}
            className="select select-bordered"
          >
            <option value="all">Rating</option>
            <option value="4.5">4.5+</option>
            <option value="4.0">4.0+</option>
            <option value="3.5">3.5+</option>
          </select>

          <select
            onChange={(e) => setFilterPriceRange(e.target.value)}
            className="select select-bordered"
          >
            <option value="all">Price</option>
            <option value="low">Under $20</option>
            <option value="medium">$20 - $50</option>
            <option value="high">Above $50</option>
          </select>

          <select
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-bordered"
          >
            <option value="none">Sort</option>
            <option value="price-asc">Price Low → High</option>
            <option value="price-dsc">Price High → Low</option>
            <option value="rating-dsc">Rating High → Low</option>
          </select>
        </div>

        {/* Cards */}
        {isLoading ? (
          <div className="grid grid-cols-4 gap-6 mt-10">
            {[...Array(8)].map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            {meals.map((meal) => (
              <motion.div
                key={meal._id}
                variants={cardUp}
                initial="hidden"
                whileInView="visible"
              >
                <Card meal={meal} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="btn"
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn ${page === i + 1 && "btn-primary"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="btn"
          >
            Next
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Meals;

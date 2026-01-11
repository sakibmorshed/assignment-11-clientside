import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaRegCalendarAlt, FaStar } from "react-icons/fa";
import Container from "../Shared/Container";

const HomeReview = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const result = await axiosSecure.get("/reviews");
      return result.data;
    },
  });

  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <Container>
      <div className="text-center mt-20">
        <h2 className="text-3xl font-semibold text-red-600">
          What Our Customers Are Saying
        </h2>
        <p className="text-xl text-gray-500 my-4">
          Real reviews from real food lovers
        </p>
      </div>

      <div className="relative overflow-hidden my-16">
        <div className="flex w-max animate-scroll gap-6">
          {duplicatedReviews.map((r, index) => (
            <div
              key={index}
              className="relative bg-white shadow-xl rounded-xl p-6 min-w-[350px] border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={r.reviewerImage}
                  alt={r.reviewerName}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-red-500"
                />

                <div>
                  <h3 className="font-bold text-lg">{r.reviewerName}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FaRegCalendarAlt />
                    <span>{new Date(r.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < r.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  ({r.rating}.0)
                </span>
              </div>

              <p className="text-gray-600 italic">"{r.comment}"</p>

              <div className="absolute top-4 right-6 text-7xl opacity-10">
                ❝
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation CSS */}
      <style>
        {`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        `}
      </style>
    </Container>
  );
};

export default HomeReview;

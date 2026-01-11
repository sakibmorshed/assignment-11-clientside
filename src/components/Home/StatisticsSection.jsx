import { motion } from "framer-motion";
import { Users, UtensilsCrossed, Star, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const StatisticsSection = () => {
  const { data: stats } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/stats`
      );
      return result.data;
    },
  });

  const statistics = [
    {
      icon: Users,
      number: stats?.totalUsers || 0,
      label: "Active Customers",
    },
    {
      icon: UtensilsCrossed,
      number: stats?.pendingOrders || 0,
      label: "Meals Served",
    },
    {
      icon: Star,
      number: "4.8",
      label: "Customer Rating",
    },
    {
      icon: Award,
      number: "100+",
      label: "Expert Chefs",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Our <span className="text-orange-500">Achievements</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            We don’t just serve food — we serve experiences
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center shadow-xl hover:border-orange-500/40"
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-orange-500/20">
                <stat.icon className="w-8 h-8 text-orange-500" />
              </div>

              {/* Number */}
              <h3 className="text-4xl font-bold text-white mb-2">
                {stat.number}
              </h3>

              {/* Label */}
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;

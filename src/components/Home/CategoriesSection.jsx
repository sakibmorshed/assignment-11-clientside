import { motion } from "framer-motion";
import { Link } from "react-router";

const CategoriesSection = () => {
  const categories = [
    { name: "Traditional", image: "/hero.jpeg", count: 45 },
    { name: "Fast Food", image: "/hero2.jpeg", count: 32 },
    { name: "Desserts", image: "/hero3.jpg", count: 28 },
    { name: "Healthy", image: "/hero.jpeg", count: 35 },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Categories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover meals by category
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-lg">{category.count} Meals</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/meals"
            className="inline-block px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition font-semibold"
          >
            View All Meals
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

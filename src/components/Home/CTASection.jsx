import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-28 bg-gradient-to-br from-[#1c1c1c] via-[#2a2a2a] to-[#1c1c1c] overflow-hidden">
      {/* Red brand glow */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Ready for Your Next
            <span className="block text-orange-500">Delicious Experience?</span>
          </h2>

          <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
            Hand-crafted meals from expert chefs, delivered fast and fresh to
            your door.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
            {/* Primary Button */}
            <Link
              to="/meals"
              className="group inline-flex items-center justify-center px-10 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-lg transition shadow-xl shadow-red-600/30"
            >
              Explore Menu
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>

            {/* Secondary Button */}
            <Link
              to="/dashboard/profile"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition font-semibold text-lg"
            >
              Become a Chef
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

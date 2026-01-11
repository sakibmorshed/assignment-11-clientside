import Container from "../../components/Shared/Container";
import { motion } from "framer-motion";
import { ChefHat, Users, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <Container>
      <div className="pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About LocalChef
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Connecting food lovers with talented local chefs in your community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              LocalChef was born from a simple idea: everyone deserves access to
              amazing, home-cooked meals made by passionate local chefs. We
              believe in supporting local culinary talent while bringing
              convenience and quality to your dining experience.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Whether you're a busy professional, a food enthusiast, or someone
              who loves supporting local businesses, LocalChef brings the
              restaurant experience to your home.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What We Offer
            </h2>
            <ul className="space-y-3 text-lg text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <ChefHat className="w-6 h-6 text-red-600 dark:text-red-400 mr-3 mt-1" />
                <span>Access to talented local chefs in your area</span>
              </li>
              <li className="flex items-start">
                <Users className="w-6 h-6 text-red-600 dark:text-red-400 mr-3 mt-1" />
                <span>Community-driven platform for food lovers</span>
              </li>
              <li className="flex items-start">
                <Award className="w-6 h-6 text-red-600 dark:text-red-400 mr-3 mt-1" />
                <span>Quality-assured meals with transparent ratings</span>
              </li>
              <li className="flex items-start">
                <Heart className="w-6 h-6 text-red-600 dark:text-red-400 mr-3 mt-1" />
                <span>Supporting local businesses and culinary talent</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Whether you're a chef looking to share your passion or a food lover
            seeking amazing meals, LocalChef is the place for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition font-semibold"
            >
              Sign Up as Customer
            </a>
            <a
              href="/dashboard/profile"
              className="px-8 py-3 border-2 border-red-600 text-red-600 dark:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition font-semibold"
            >
              Become a Chef
            </a>
          </div>
        </motion.div>
      </div>
    </Container>
  );
};

export default About;

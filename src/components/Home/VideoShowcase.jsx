import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const VideoShowcase = () => {
  return (
    <section className="bg-gray-100 py-20 px-4 overflow-hidden mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-red-500">
            Experience Our Kitchen
          </h2>
          <p className="text-gray-400 mt-3">
            Real moments. Real cooking. Real passion.
          </p>
        </motion.div>

        {/* Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Card 1 */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="card bg-black shadow-xl overflow-hidden"
          >
            <figure className="relative">
              <video
                src="/videos/cooking1.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </figure>

            <div className="card-body text-white">
              <h3 className="card-title text-2xl">Handmade Perfection</h3>
              <p className="text-gray-400">
                Every meal is crafted with love and fresh ingredients.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="card bg-black shadow-xl overflow-hidden"
          >
            <figure className="relative">
              <video
                src="/videos/cooking2.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </figure>

            <div className="card-body text-white">
              <h3 className="card-title text-2xl">Chef’s Special Touch</h3>
              <p className="text-gray-400">
                Experience the art of professional home cooking.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;

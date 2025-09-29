import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-12 bg-black border-t border-white/20 relative">

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright */}
            <p className="text-white/70 text-sm">
              © 2025 Humera Naaz. All rights reserved.
            </p>
          </div>

        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
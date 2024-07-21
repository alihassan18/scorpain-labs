import React from "react";
import { motion } from "framer-motion";

const FramerMotion = () => {
  return (
    <div className="absolute  top-0  w-full h-full">
      <motion.img
        src="/assets/images/congratulation.svg"
        initial={{ y: "100%" }}
        animate={{ y: "-130%" }}
        transition={{ duration: 3 }}
        alt="Animated Image"
      />
    </div>
  );
};

export default FramerMotion;

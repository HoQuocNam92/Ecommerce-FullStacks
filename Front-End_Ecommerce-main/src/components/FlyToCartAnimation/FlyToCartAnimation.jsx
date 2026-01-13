/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export default function FlyToCartAnimation({ flyItem }) {
    if (!flyItem) return null;

    const { imgSrc, start, end } = flyItem;

    return (
        <motion.img
            src={imgSrc}
            alt="flying item"
            initial={{
                position: "fixed",
                width: 200,
                height: 200,
                borderRadius: "50%",
                top: start.y - 100,
                right: start.x,
                zIndex: 9999,
                opacity: 1,
            }}
            animate={{
                top: end.y,
                right: end.x,
                width: 80,
                height: 80,
                opacity: 0,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        />
    );
}

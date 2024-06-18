import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "./RecommendationTrack.module.css";
import { Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const TopArtistsContainer = ({ artists }: { artists: any }) => {
  console.log(artists);
  return (
    <motion.ul
      className={styles.container}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {artists.map((artist: any) => (
        <motion.li key={artist.id} className={styles.item} variants={item}>
          <Image
            src={artist.images[1].url}
            alt={artist.name}
            width={100}
            height={100}
            className={styles.image}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default TopArtistsContainer;

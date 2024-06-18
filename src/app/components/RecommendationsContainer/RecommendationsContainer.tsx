import { motion } from "framer-motion";
import React from "react";
import RecommendationTrack from "../RecommendationTrack/RecommendationTrack";
import styles from "./RecommendationContainer.module.css";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Image from "next/image";
import { millisecondsToMinutesConverter } from "@/app/utils/millisecondsToMinutesConverter";
import Link from "next/link";

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

const RecommendationsContainer = ({
  recommendations,
}: {
  recommendations: any;
}) => {
  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <TableContainer className={styles.container}>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Track</Th>
              <Th>Artist</Th>
              <Th>Album</Th>
              <Th isNumeric>Duration</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recommendations.map((track: any) => (
              <motion.tr
                variants={item}
                key={track.id}
                className={styles.trackRow}
              >
                <Td>
                  <Link href={track.uri} className={styles.link}>
                    <div className={styles.trackNameData}>
                      <Image
                        src={track.album.images[1].url}
                        alt={track.name}
                        width={50}
                        height={50}
                        className={styles.image}
                      />
                      {track.name}
                    </div>
                  </Link>
                </Td>
                <Td>
                  {track.artists.map((artist: any) => (
                    <span key={artist.id}>{artist.name}</span>
                  ))}
                </Td>
                <Td>{track.album.name}</Td>
                <Td>{millisecondsToMinutesConverter(track.duration_ms)}</Td>
              </motion.tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};

export default RecommendationsContainer;

"use client";
import Image from "next/image";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Code,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { redirectToAuthCodeFlow } from "./auth/redirectToAuthCodeFlow";
import { getAccessToken } from "./auth/getAccessToken";
import { fetchProfile } from "./auth/fetchProfile";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { getTopItems } from "./utils/getTopItems";
import { getRecommendations } from "./utils/getRecommendations";
import RecommendationsContainer from "./components/RecommendationsContainer/RecommendationsContainer";
import BlurLight from "./components/BlurLight/BlurLight";

export default function Home() {
  const [profile, setProfile] = useState<any>();
  const [topArtists, setTopArtists] = useState();
  const [recommendations, setRecommendations] = useState();
  const clientId = "a2560c35564942a5b8ae74f3e717b2ec";
  const params = useSearchParams();
  const code = params.get("code");

  const handleLogin = async () => {
    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      const accessToken = await getAccessToken(clientId, code);
      localStorage.setItem("accessToken", accessToken);
      const fetchedProfile = await fetchProfile(accessToken);
      setProfile(fetchedProfile);
      console.log(fetchedProfile);
    }
  };

  const getTopArtists = async () => {
    const artists = await getTopItems(localStorage.getItem("accessToken")!);
    setTopArtists(artists.items);
  };

  const getRecommendationsBasedOnUsersTop = async () => {
    let recommendationsArray;
    if (topArtists) {
      recommendationsArray = await getRecommendations(topArtists);
    } else {
      const usersTop = await getTopItems(localStorage.getItem("accessToken")!);
      const usersTopArtists = usersTop.items;
      recommendationsArray = await getRecommendations(usersTopArtists);
    }
    setRecommendations(recommendationsArray.tracks);
  };
  if (recommendations) {
    console.log(recommendations);
  }
  return (
    <div className={styles.container}>
      {profile ? (
        <div className="">
          <Heading>recsify</Heading>
          <div className={styles.profileSection}>
            <Image
              src={profile.images[1].url}
              alt={profile.display_name}
              width={profile.images[1].width}
              height={profile.images[1].height}
              className={styles.image}
            />
            <div className={styles.profileMain}>
              <div>
                <Heading>{profile.display_name}</Heading>
                <Badge colorScheme="green">{profile.product}</Badge>
              </div>
              <div className="">
                <Text>
                  Lets find some new stuff you should immediately listen to.
                </Text>
                <Text>
                  Find yout new favourites and listen them right in yout Spotify
                  application.
                </Text>
              </div>
              <Button
                colorScheme="whatsapp"
                onClick={getRecommendationsBasedOnUsersTop}
              >
                Only for you
              </Button>
              <Button
                colorScheme="whatsapp"
                onClick={getTopArtists}
                variant="outline"
              >
                Wanna wrap up your top artists?
              </Button>
            </div>
            {/* {topArtists && <TopArtistsContainer artists={topArtists} />} */}
          </div>
          {/* <Flex>
            <Avatar src={profile.images[1].url} />
            <Box ml="3">
              <Text fontWeight="bold">
                {profile.display_name}
                <Badge ml="1" colorScheme="green">
                  {profile.product}
                </Badge>
              </Text>
              <Text fontSize="sm">
                {profile.type.charAt(0).toUpperCase() + profile.type.slice(1)}
              </Text>
            </Box>
          </Flex> */}
          {/* <button onClick={getTopArtists}>Get top</button> */}
          {/* <button onClick={getRecommendationsBasedOnUsersTop}>Get recs</button> */}
          {/* {topArtists && (
            <div className={styles.topArtists}>
              {topArtists.map((artist) => (
                <div key={artist.id}>
                  <Card
                    image={artist.images[1].url}
                    name={artist.name}
                    link={artist.uri}
                  />
                </div>
              ))}
            </div>
          )} */}
          <div style={{ marginTop: 20 }}>
            {recommendations && (
              <RecommendationsContainer recommendations={recommendations} />
            )}
          </div>
        </div>
      ) : (
        <Button colorScheme="teal" size="lg" onClick={handleLogin}>
          Login
        </Button>
      )}
      <BlurLight left={-200} bottom={0} />
      <BlurLight right={-100} top={0} />
    </div>
  );
}

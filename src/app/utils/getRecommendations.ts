import { genres } from "../constants";

export const getRecommendations = async (usersTopArtists) => {
  const seeds = usersTopArtists.map((artist) => artist.id).join(",");
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/recommendations?seed_artists=${seeds}&limit=10`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data");
  }
};

export const getRecommendations = async (usersTopArtists: any) => {
  const seeds = usersTopArtists.map((artist: any) => artist.id).join(",");
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

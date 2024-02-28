export const getTopItems = async (token: string) => {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/top/artists?limit=5",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const artists = response.json();
    return artists;
  } catch (error) {
    return "Error fetching recomendations";
  }
};

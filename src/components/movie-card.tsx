import { Movie } from "@/types/movie";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
type MovieCardProps = {
  movie: Movie;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export default function MovieCard({ movie, onPress, isFavorite,
  onToggleFavorite }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  const year = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: posterUrl }} style={styles.poster} />

      <View style={styles.content}>
        <Pressable
          onPress={onToggleFavorite}
          style={styles.favoriteButton}
        >
          <MaterialCommunityIcons
            name={isFavorite ? "heart" : "heart-outline"}
            size={22}
            color={isFavorite ? "#ef4444" : "#777"}
          />
        </Pressable>
        <Text numberOfLines={1} style={styles.title}>{movie.title}</Text>
        <Text style={styles.info}><AntDesign name="star" size={14} color="#ffa534" /> {movie.vote_average.toFixed(1)} • {year}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {movie.overview || ""}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
  },
  poster: {
    width: 90,
    height: 130,
    borderRadius: 14,
    backgroundColor: "#ddd",
  },
  content: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#777",
    lineHeight: 20,
  },
});
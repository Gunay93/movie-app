import { getMovieById } from '@/services/movie-service';
import { Movie } from '@/types/movie';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

export default function MovieDetailScreen() {
    const { id } = useLocalSearchParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof id === "string") {
            loadMovie(id);
        }
    }, [id]);

    const loadMovie = async (movieId: string) => {
        try {
            const data = await getMovieById(movieId);
            setMovie(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const year = movie?.release_date
        ? movie?.release_date.split("-")[0]
        : "N/A";

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 10 }}>
                    Film yüklənir...
                </Text>
            </View>
        );
    }

    if (!movie) {
        return (
            <View style={styles.center}>
                <MaterialCommunityIcons
                    name="movie-off-outline"
                    size={80}
                    color="#999"
                />
                <Text style={styles.notFoundTitle}>Film tapılmadı</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <Stack.Screen
                options={{
                    title: movie?.title,
                }}
            />

            <Image
                source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
                contentFit="cover"
                contentPosition="top" style={styles.poster} />

            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.info}><AntDesign name="star" size={14} color="#ffa534" /> {movie.vote_average.toFixed(1)} • {year}</Text>

            <Text style={styles.description}>{movie.overview || ""}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 18,
        backgroundColor: "#fff",
    },
    notFoundTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginTop: 12,
    },
    poster: {
        width: '100%',
        height: 350,
        borderRadius: 24,
        marginBottom: 22
    },
    content: {
        padding: 18,
        paddingBottom: 80,
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        marginBottom: 8,
    },

    info: {
        fontSize: 16,
        color: "#777",
        marginBottom: 20,
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "#444",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
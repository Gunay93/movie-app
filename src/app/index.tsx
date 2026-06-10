import MovieCard from "@/components/movie-card";
import SearchInput from "@/components/search-input";
import { getPopularMovies } from "@/services/movie-service";
import { getFavoriteIds, saveFavoriteIds } from "@/storage/favorite-storage";
import { Movie } from "@/types/movie";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMovies = async (pageNumber = 1) => {
    try {
      const data = await getPopularMovies(pageNumber);

      if (pageNumber === 1) {
        setMovies(data);
      } else {
        setMovies((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loadMoreMovies = async () => {
    if (isLoadingMore || showFavorites || search.trim()) return;

    setIsLoadingMore(true);

    const nextPage = page + 1;

    try {
      await loadMovies(nextPage);
      setPage(nextPage);
    } finally {
      setIsLoadingMore(false);
    }
  };
  useEffect(() => {
    const init = async () => {
      await loadMovies();
      await loadFavorites();
      setLoading(false);
    };

    init();
  }, []);
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFavorite =
      !showFavorites || favoriteIds?.includes(movie.id);

    return matchesSearch && matchesFavorite;
  });

  const loadFavorites = async () => {
    const ids = await getFavoriteIds();
    setFavoriteIds(ids);
  };

  useEffect(() => {
    saveFavoriteIds(favoriteIds);
  }, [favoriteIds]);

  const toggleFavorite = (id: number) => {
    setFavoriteIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleRefresh = async () => {
    setRefreshing(true);
  
    try {
      setPage(1);
      await loadMovies(1);
    } finally {
      setRefreshing(false);
    }
  };
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Filmlər yüklənir...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filmlər <MaterialCommunityIcons name="movie-open-outline" size={24} color="black" /></Text>
      <Text style={styles.subtitle}>Məhşur filmlər</Text>
      <SearchInput
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.filters}>
        <Pressable
          onPress={() => setShowFavorites(false)}
          style={[
            styles.filterButton,
            !showFavorites && styles.activeFilter,
          ]}
        >
          <Text style={
            !showFavorites
              ? styles.activeFilterText
              : styles.filterText
          }>All Movies</Text>
        </Pressable>

        <Pressable
          onPress={() => setShowFavorites(true)}
          style={[
            styles.filterButton,
            showFavorites && styles.activeFilter,
          ]}
        >
          <Text style={
            showFavorites
              ? styles.activeFilterText
              : styles.filterText
          }>Favorites</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredMovies}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingMore ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : null
        }
        alwaysBounceVertical
        contentContainerStyle={[
          styles.listContent,
          filteredMovies.length === 0 && styles.emptyListContent,
        ]}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="movie-search-outline"
              size={70}
              color="#999"
            />
            <Text style={styles.emptyTitle}>Film tapılmadı</Text>
            <Text style={styles.emptySubtitle}>Başqa axtarış cəhd edin</Text>
          </View>
        }
        renderItem={({ item }) => (
          <MovieCard
            isFavorite={favoriteIds.includes(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
            movie={item}
            onPress={() => router.push({
              pathname: "/movie/[id]",
              params: {
                id: item.id,
              },
            })}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  filters: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#eee",
  },
  filterText: {
    color: "#111",
    fontWeight: "500",
  },

  activeFilterText: {
    color: "#fff",
    fontWeight: "600",
  },
  activeFilter: {
    backgroundColor: "#111",
    color: '#fff'
  },
  header: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 22,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },
  listContent: {
    paddingBottom: 50,
    flexGrow: 1,
  },
  emptyListContent: {
    justifyContent: "center",
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#777",
    marginTop: 6,
  },
});
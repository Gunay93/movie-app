import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchInput({
  value,
  onChangeText,
}: SearchInputProps) {
  return (
    <View style={styles.wrapper}>
      <MaterialCommunityIcons name="movie-search" size={22} color="#777" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Axtarış..."
        placeholderTextColor="#999"
        style={styles.input}
      />

      {value.length > 0 && (
        <Pressable onPress={() => onChangeText("")}>
          <MaterialCommunityIcons name="close-circle" size={22} color="#777" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 22,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: "#111",
    outlineStyle: "none",
  } as any,
});
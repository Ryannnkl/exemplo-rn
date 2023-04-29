import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

import ListRepos from "./components/ListRepositories";

export default function App() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);

  const getGithubData = () => {
    setLoading(true);
    fetch(`https://api.github.com/users/${userName}/repos`)
      .then((res) => {
        res.json().then((data) => {
          setLoading(false);
          setRepositories(data);
        });
      })
      .catch(console.warn);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Github username"
          onChangeText={setUserName}
        />
        <Pressable style={styles.searchButton} onPress={getGithubData}>
          <Feather name="search" size={24} color="#FFF" />
        </Pressable>
      </View>
      {loading && <ActivityIndicator size="large" />}
      {repositories.length > 0 && <ListRepos repos={repositories} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    flexDirection: "row",
    gap: 4,
    paddingVertical: 20,
  },
  searchButton: {
    backgroundColor: "#333",
    padding: 4,
    borderRadius: 2,
  },
  searchInput: {
    borderColor: "#444",
    borderWidth: 0.5,
    width: 200,
    paddingHorizontal: 4,
    borderRadius: 2,
  },
});

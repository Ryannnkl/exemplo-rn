import { FlatList, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface IProps {
  repos: any[];
}

export default function ListRepos({ repos }: IProps) {
  const renderRepo = (repo: any) => {
    return (
      <View style={styles.repoItem}>
        <View style={styles.repoTitleContainer}>
          <Text style={styles.repoTitle}>{repo.name}</Text>
          <View style={styles.repoStarsContainer}>
            <Feather name="star" color="#444" />
            <Text>{repo.stargazers_count}</Text>
          </View>
        </View>
        <Text style={styles.repoDesc}>{repo.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={repos}
        renderItem={({ item }) => renderRepo(item)}
        keyExtractor={(item) => item.node_id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    bottom: 0,
    paddingTop: 20,
    paddingHorizontal: 6,
  },
  repoItem: {
    flexDirection: "column",
    padding: 12,
    borderRadius: 4,
    marginBottom: 6,
    borderColor: "#22222220",
    borderWidth: 0.5,
  },
  repoTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  repoStarsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  repoTitle: {
    color: "#333",
  },
  repoDesc: {
    color: "#777",
  },
});

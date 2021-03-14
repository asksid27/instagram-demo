import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet, Button } from "react-native";

import firebase from "firebase";
require("firebase/firestore");

import { connect } from "react-redux";

function Feed(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let posts = [];
    if (props.usersLoaded == props.follow.length) {
      for (let i = 0; i < props.follow.length; i++) {
        const user = props.users.find((el) => el.uid === props.follow[i]);
        if (user != undefined) {
          posts = [...posts, ...user.posts];
        }
      }
      posts.sort((x, y) => x.creation - y.creation);
      setPosts(posts);
    }
  }, [props.usersLoaded]);

  return (
    // <View style={styles.container}>
    <FlatList
      numColumns={1}
      horizontal={false}
      data={posts}
      renderItem={({ item }) => {
        return (
          <View style={{ flex: 1 }}>
            <Text style={{ flex: 10, padding: 5, margin: 5 }}>
              {item.user.name}
            </Text>
            <Image
              source={{
                uri: item.downloadURL,
              }}
              style={{ flex: 1, aspectRatio: 1.5 }}
            />
          </View>
        );
      }}
    />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  users: store.usersState.users,
  follow: store.userState.follow,
  usersLoaded: store.usersState.usersLoaded,
});

export default connect(mapStateToProps, null)(Feed);

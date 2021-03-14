import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

import firebase from "firebase";
require("firebase/firestore");

import { connect } from "react-redux";

function Profile(props) {
  const [userPost, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(props.currentUser);
      setUserPosts(props.posts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("does not exist");
          }
        });
      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPosts(posts);
        });
    }
  }, [props.route.params.uid]);

  if (user === null) {
    return <View></View>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.name}</Text>
      </View>
      <View style={{ flex: 20 }}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPost}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image source={{ uri: item.downloadURL }} style={styles.image} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    flex: 1,
    margin: 10,
    marginTop: 30,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);

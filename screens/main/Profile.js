import React, {useState, useEffect} from "react";
import { SafeAreaView, Text, Image, FlatList, View, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import firebase from 'firebase';
require('firebase/firestore');


function Profile(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    const { currentUser, posts } = props;
    console.log({ currentUser, posts })
    if (props.route.params.uid === firebase.auth().currentUser.uid){
      setUser(currentUser)
    setUserPosts(posts)
    }
    else {
      firebase
      .firestore()
      .collection("users")
      .doc(props.route.params.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
        } else {
         
          console.log("snapshot does not exist");
        }
      });
      firebase
      .firestore()
      .collection("posts")
      .doc(props.route.params.uid)
      .collection("UserPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return{id, ...data}
        })
       setUserPosts(posts);

      });
    }
if(props.following.indexOf(props.route.params.uid)> -1){
  setFollowing(true);
} else {
  setFollowing(false)
}

}, [props.route.params.uid, props.following])

   
  const onFollow = () => {
    firebase.firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .set({})
    
  }
  const onUnfollow = () => {
    firebase.firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .delete()
    
  }



  if (user === null) {
    return <View></View>
  }
  

  return (
    <SafeAreaView style={styles.infoContainer}>
      <View>
      <Text>
        {user.name}
         </Text>
      <Text>
        {user.email}
      </Text>
      </View>
      {props.route.params.uid !== firebase.auth().currentUser.uid ? (
        <View>
          {following ? (
            <Button
              title="Following" 
            onPress={() =>onUnfollow()}/>
          ): (
          <Button title="Follow"
          onPress={() =>onFollow()}/>
          )}
        </View>
      ) : null}
      
         <View style={styles.containerGallery}>
           <FlatList
           numColumns={3}
           horizontal={false}
           data={userPosts}
           renderItem={({item}) => (
             <View  style={styles.imageContainer}>
             <Image
             style={styles.image} 
             source={{uri: item.downloadURL}}
             />
             </View>
           )}
           ></FlatList>
         </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  infoContainer:{
    margin:10
    
  },
  containerGallery:{

  },
  imageContainer:{
flex: 1/3
  },
  image:{
    flex:1,
    aspectRatio: 1/1,
  }
})
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following
})

export default connect(mapStateToProps, null)(Profile)
import React, {useState, useEffect} from "react";
import { SafeAreaView, Text, Image, FlatList, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import firebase from 'firebase';
require('firebase/firestore');


function Profile(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
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
}, [props.route.params.uid])

   
  
  if (user === null) {
    return <View></View>
  }
  

  return (
    <SafeAreaView style={styles.infoContainer}>
      <Text>
        {user.name}
         </Text>
      <Text>
        {user.email}
         </Text>
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
const mapStateToProps = (store) =>({currentUser: store.userState.currentUser, posts: store.userState.posts})

export default connect(mapStateToProps, null)(Profile)
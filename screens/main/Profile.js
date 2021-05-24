import React from "react";
import { SafeAreaView, Text, Image, FlatList, View, StyleSheet } from "react-native";
import { connect } from "react-redux";


 function Profile(props) {
   const {currentUser, posts} = props;
   console.log({currentUser, posts});
  return (
    <SafeAreaView style={styles.infoContainer}>
      <Text>
        {currentUser.name}
         </Text>
      <Text>
        {currentUser.email}
         </Text>
         <View style={styles.containerGallery}>
           <FlatList
           numColumns={3}
           horizontal={false}
           data={posts}
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
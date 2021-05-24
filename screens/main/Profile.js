import React from "react";
import { SafeAreaView, Text, Image, FlatList, View, StyleSheet } from "react-native";
import { connect } from "react-redux";


 function Profile(props) {
   const {currentUser, posts} = props;
   console.log({currentUser, posts});
  return (
    <SafeAreaView>
      <Text>
        {currentUser.name}
         </Text>
      <Text>
        {currentUser.email}
         </Text>
         <View>
           <FlatList
           numColumns={3}
           horizontal={false}
           data={posts}
           renderItem={({item}) => (
             <Image
             style={styles.image} 
             source={{uri: item.downloadURL}}
             />
           )}
           ></FlatList>
         </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  image:{
    flex:1,
    aspectRatio: 1/1,
  }
})
const mapStateToProps = (store) =>({currentUser: store.userState.currentUser, posts: store.userState.posts})

export default connect(mapStateToProps, null)(Profile)
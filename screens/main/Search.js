import React, {useState} from 'react'
import { Text, View, TextInput, FlatList, SafeAreaView, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase';
require('firebase/firestore');
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Search(props) {
    const [users, setUsers] = useState([]);
    const fetchUsers = (search)=>{
        firebase.firestore()
            .collection('users')
            .where('name', '>=', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{id, ...data}
                })
                setUsers(users);
        })
    }
    return (
        <TouchableWithoutFeedback style={styles.touchable}  onPress={()=>{Keyboard.dismiss()}} >
        <SafeAreaView  >
            <TextInput style={styles.searchInput} onChangeText={(search) => fetchUsers(search)} placeholder="Type to search" />
            <FlatList style={styles.flatlist} numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.eachFlatItem} onPress={() =>props.navigation.navigate("Profile", {uid: item.id})}>
                        <Text>{item.name}</Text>
                        </TouchableOpacity>
                )}
            />
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    searchInput:{
        borderWidth: 1,
        borderColor: "grey",
        marginVertical: 50,
        alignSelf: "center",
        justifyContent: "center",
        width: "95%",
        height: 40,
        borderRadius: 10,
        paddingLeft: 10,
    },
    touchable:{
        flex:1,
    },
    flatlist:{
        height:"100%",
    },
    eachFlatItem:{
        marginVertical: 2,
        paddingLeft: 10,
        backgroundColor: "white",
        height: 40,
        justifyContent: "center",
        width: "95%",
        alignSelf: "center", 
        borderLeftWidth:1,
        borderLeftColor: "grey"
    }
});
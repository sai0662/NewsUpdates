import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
function Home(props) {
  const [state, setState] = useState({
    loading: true,
    data: [],
    postData: [],
    commentsData: [],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    var myData = [];
    firestore()
      .collection('newposts')
      .get()
      .then(snapShot => {
        console.log('getData', snapShot);
        snapShot.docs.map(each => {
          console.log('data', each.data(), each.id);
          myData.push({...each.data(), id: each.id});
          setState(prev => ({...prev, loading: false, data: myData}));
        });
      })
      .catch(error => {
        console.log('error', error);
        setState(prev => ({...prev, loading: false}));
        //toast.show('network problem', toast.LONG);
      });
  };
  return (
    <View>
      {state.data.map(data => (
        <View>
          <Text>{data.title}</Text>
        </View>
      ))}
    </View>
  );
}

export default Home;

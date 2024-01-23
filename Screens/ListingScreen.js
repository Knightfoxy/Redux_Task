import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser, deleteUser} from '../Redux/Features/Counter/userSlice';
import ShowUserItem from '../Components/UserDisplay';

function Listing({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const showAlert = data => {
    Alert.alert('Action', 'Choose action:', [
      {
        text: 'Edit',
        onPress: () =>
          navigation.navigate('FormScreen', {
            data: data,
            editMode: true,
          }),
      },
      {
        text: 'Delete',
        onPress: () => {
          dispatch(deleteUser(data));
        },
        style: 'destructive',
      },
    ]);
  };

  const editDataAction = editableData => {
    console.log('Button Tapped', editableData);
    showAlert(editableData);
  };

  if (user.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noDataText}>No Data Found</Text>
        <Text style={styles.noDataText}>Hit 'Add' to add data to list</Text>
      </SafeAreaView>
    );
  } else {
    console.log(user);
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={user}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ShowUserItem user={item} onPressEdit={editDataAction} />
          )}
          style={styles.flatList}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  noContentTitle: {
    fontSize: 24,
    fontWeight: '600',
    justifyContent: 'center',
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: 'purple',
    marginHorizontal: '40%',
    height: 46,
    borderRadius: 25,
  },
  noDataText: {
    color: 'black',
    textAlign: 'center',
    top: 60,
    fontWeight: '600',
    fontSize: 15,
  },
  flatList: {
    flex: 1,
  },
});

export default Listing;

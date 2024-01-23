import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

function ShowUserItem({user, onPressEdit}) {
  console.log('rendering item');
  const onPressEditData = () => {
    onPressEdit(user);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dataBgView}>
        <Text style={styles.noDataText}>Email: {user.email}</Text>
        <Text style={styles.noDataText}>PhoneNum: {user.phoneNum}</Text>
        <Text style={styles.noDataText}>
          Date Of Birth: {user.selectedDate}
        </Text>
      </View>
      <View style={styles.editButtonBg}>
        <TouchableOpacity style={styles.editButton} onPress={onPressEditData}>
          <Image
            source={require('/Users/ai/Desktop/ReactN_Projects/reduxTask/reduxTask/Assets/editDots.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 94,
    top: 20,
    margin: 10,
    marginHorizontal: 25,
    backgroundColor: '#F2E6FF',
    borderRadius: 15,
  },
  dataBgView: {
    flex: 1,
    top: 4,
  },
  noDataText: {
    color: 'black',
    textAlign: 'left',
    top: 10,
    paddingLeft: 20,
    height: 24,
    fontWeight: '600',
    fontSize: 15,
  },
  editButtonBg: {
    flex: 0.12,
    flexDirection: 'column',
  },
  editButton: {
    height: 50,
    width: 30,
    top: 10,
  },
});

export default ShowUserItem;

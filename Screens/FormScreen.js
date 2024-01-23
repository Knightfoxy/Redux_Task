import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {addUser, updateUser} from '../Redux/Features/Counter/userSlice';
import {useDispatch} from 'react-redux';
import DateTimePicker from 'react-native-ui-datepicker';

function FormScreen({navigation, route}) {
  const dispatch = useDispatch();

  const {data, editMode} = route.params;
  const [email, setEmail] = useState(data.email);
  const [phoneNum, setPhoneNum] = useState(data.phoneNum);
  const [id, setUpdateId] = useState(data.id);
  const [selectedDate, setSelectedDate] = useState(data.selectedDate);
  const [displayDatePicker, setDisplayDatePicker] = useState(false);

  const handleValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (email === '' && phoneNum === '') {
      Alert.alert('Error', 'Please enter email and phone number.');
    } else if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
    } else if (!phoneRegex.test(phoneNum)) {
      Alert.alert('Error', 'Please enter a valid phone number.');
    } else {
      if (editMode) {
        const data = {email, phoneNum, id, selectedDate};
        console.log('updateCalled', id);
        dispatch(updateUser(data));
      } else {
        const id = Math.random();
        const data = {email, phoneNum, id, selectedDate};
        console.log('addCalled', data);
        dispatch(addUser(data));
      }
      navigation.navigate('Listing');
    }
  };

  const toggleDatePicker = () => {
    setDisplayDatePicker(true);
  };

  const onChangeDate = date => {
    const dateOnly = extractDateOnly(date);
    setSelectedDate(dateOnly);
    setDisplayDatePicker(false);
  };

  function extractDateOnly(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const day = dateTime.getDate().toString().padStart(2, '0');
    const dateOnlyString = `${year}-${month}-${day}`;
    return dateOnlyString;
  }

  return (
    <SafeAreaView
      style={styles.container}
      onStartShouldSetResponder={() => setDisplayDatePicker(false)}>
      <View style={styles.inputView}>
        <View style={styles.sectionInputView}>
          <Text style={styles.inputHeader}>Email: </Text>
          <TextInput
            style={styles.inputViewStyle}
            placeholder="Enter your email"
            onChangeText={text => {
              setEmail(text);
              setDisplayDatePicker(false);
            }}
            value={email}></TextInput>
        </View>
        <View style={styles.sectionInputView}>
          <Text style={styles.inputHeader}>Phone Number: </Text>
          <TextInput
            style={styles.inputViewStyle}
            placeholder="Enter your phone number"
            onChangeText={text => {
              setPhoneNum(text);
              setDisplayDatePicker(false);
            }}
            value={phoneNum}
            keyboardType="numeric"></TextInput>
        </View>
        <View style={styles.sectionInputView}>
          <Text style={styles.inputHeader}>Date of Birth: </Text>
          <TouchableOpacity
            style={styles.inputViewStyle}
            onPress={toggleDatePicker}>
            <Text style={styles.DOB}>{selectedDate}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleValidation}>
            <Text style={styles.buttonTextView}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      {displayDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          maximumDate={Date.now()}
          onValueChange={date => onChangeDate(date)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputView: {
    margin: 20,
    backgroundColor: '#F2E6FF',
    height: Dimensions.get('window').height / 2.3,
    borderRadius: 40,
    flexDirection: 'column',
  },
  sectionInputView: {
    top: 20,
    marginHorizontal: 20,
    flexDirection: 'column',
  },
  inputViewStyle: {
    backgroundColor: 'white',
    margin: 10,
    height: 40,
    borderRadius: 10,
    padding: 10,
  },
  inputHeader: {
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
  },
  saveButton: {
    margin: 10,
    backgroundColor: '#6600CC',
    height: 40,
    borderRadius: 10,
  },
  buttonTextView: {
    color: 'white',
    textAlign: 'center',
    top: 11,
    fontWeight: '600',
    fontSize: 15,
  },
  DOB: {
    paddingTop: 2,
    justifyContent: 'center',
  },
});

export default FormScreen;

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import Header from '../../components/Header';

const AddStudent = () => {
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    regNum: '',
    department: '',
    email: '',
    phone: '',
    dob: '',
    programType: '',
    startYear: '',
    passedOutYear: '',
  });

  const handleInputChange = (field, value) => {
    setStudentDetails(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const {
      name,
      regNum,
      department,
      email,
      phone,
      dob,
      programType,
      startYear,
      passedOutYear,
    } = studentDetails;

    if (
      !name ||
      !regNum ||
      !department ||
      !email ||
      !phone ||
      !dob ||
      !programType ||
      !startYear ||
      !passedOutYear
    ) {
      Alert.alert('Error', 'Please fill in all the details.');
      return;
    }

    Alert.alert('Success', 'Student details added successfully!');
    setStudentDetails({
      name: '',
      regNum: '',
      department: '',
      email: '',
      phone: '',
      dob: '',
      programType: '',
      startYear: '',
      passedOutYear: '',
    });
  };

  return (
    <View style={styles.container}>
      <Header topic="add student" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={studentDetails.name}
          onChangeText={text => handleInputChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Registration Number"
          value={studentDetails.regNum}
          onChangeText={text => handleInputChange('regNum', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Department"
          value={studentDetails.department}
          onChangeText={text => handleInputChange('department', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={studentDetails.email}
          onChangeText={text => handleInputChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={studentDetails.phone}
          onChangeText={text => handleInputChange('phone', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={studentDetails.dob}
          onChangeText={text => handleInputChange('dob', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Start Year (YYYY)"
          keyboardType="numeric"
          value={studentDetails.startYear}
          onChangeText={text => handleInputChange('startYear', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Passed-Out Year (YYYY)"
          keyboardType="numeric"
          value={studentDetails.passedOutYear}
          onChangeText={text => handleInputChange('passedOutYear', text)}
        />

        <Button title="Add Student" onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};

export default AddStudent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff', 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Add a subtle border for separation
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    color: '#6200ea', // Color for the back button text
    fontSize: 16,
  },
  headerTitle: {
    color: '#000', // Set title color to black for better visibility
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = () => {
    if (newPassword === confirmPassword) {
      Alert.alert('Success', 'Password successfully reset!');
    } else {
      Alert.alert('Error', 'Passwords do not match.');
    }
  };

  return (
    <LinearGradient colors={['#6200EE', '#FF6F61']} style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Reset Password</Text>

          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: Math.min(30, width * 0.08),
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    fontSize: Math.min(16, width * 0.04),
    color: '#333',
    elevation: 2, // Slight shadow for input boxes
    marginBottom: height * 0.02,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FF6F61',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: Math.min(18, width * 0.045),
    fontWeight: 'bold',
  },
});


// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Dimensions,
//   KeyboardAvoidingView,
//   ScrollView,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {useSelector, useDispatch} from 'react-redux';
// import {updateResetPasswordForm, resetPassword} from '../../slices/authSlices/resetPasswordSlice';

// const {width, height} = Dimensions.get('window');

// const ResetPassword = () => {
//   const dispatch = useDispatch();
//   const {resetPasswordForm, loading, errors} = useSelector();

//   const handleResetPassword = () => {
//     const {newPassword, confirmPassword} = resetPasswordForm;
//     if (newPassword !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match.');
//       return;
//     }
//     dispatch(resetPassword({password: newPassword}));
//   };

//   const handleInputChange = (field, value) => {
//     dispatch(updateResetPasswordForm({field, value}));
//   };

//   return (
//     <LinearGradient colors={['#6200EE', '#FF6F61']} style={styles.container}>
//       <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
//         <ScrollView contentContainerStyle={styles.scrollView}>
//           <Text style={styles.title}>Reset Password</Text>

//           <TextInput
//             style={styles.input}
//             placeholder="New Password"
//             placeholderTextColor="#ccc"
//             secureTextEntry
//             value={resetPasswordForm.newPassword}
//             onChangeText={value => handleInputChange('newPassword', value)}
//           />
//           {errors.newPassword && (
//             <Text style={styles.errorText}>{errors.newPassword}</Text>
//           )}

//           <TextInput
//             style={styles.input}
//             placeholder="Confirm Password"
//             placeholderTextColor="#ccc"
//             secureTextEntry
//             value={resetPasswordForm.confirmPassword}
//             onChangeText={value => handleInputChange('confirmPassword', value)}
//           />
//           {errors.confirmPassword && (
//             <Text style={styles.errorText}>{errors.confirmPassword}</Text>
//           )}

//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleResetPassword}
//             disabled={loading}>
//             <Text style={styles.buttonText}>
//               {loading ? 'Resetting...' : 'Reset Password'}
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </LinearGradient>
//   );
// };

// export default ResetPassword;

// const styles = StyleSheet.create({
//   container: {flex: 1},
//   scrollView: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: Math.min(30, width * 0.08),
//     fontWeight: 'bold',
//     color: '#FFF',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 15,
//     backgroundColor: '#FFF',
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   button: {
//     width: '100%',
//     padding: 15,
//     backgroundColor: '#FF6F61',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {color: '#FFF', fontSize: 18, fontWeight: 'bold'},
//   errorText: {color: 'red', marginBottom: 10},
// });

import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateSignupForm, signupUser,setSignupErrors, signupState } from '../../slices/authSlices/signupSlice';

const Signup = ({ navigation }) => {
  const dispatch = useDispatch();
  const { signupForm, loading } = useSelector(signupState);

  const handleChange = (field, value) => {
    dispatch(updateSignupForm({ field, value }));
  };

  const handleSubmit = async () => {
    const { username, email, password } = signupForm;

    dispatch(signupUser({ username, email, password }))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Signup successful. You can now log in!');
        navigation.navigate('login');
      })
      .catch((err) => {
         console.log(err);
        if (err.errors) {
          dispatch(setSignupErrors({ errors: err.errors }));     
        } else {
          Alert.alert('Signup Failed', err.error || 'Something went wrong.');
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        {/* Username Field */}
        <View style={styles.inputContainer}>
          {signupForm.errors.username && <Text style={styles.errorText}>{signupForm.errors.username}</Text>}
          <TextInput
            style={[styles.input, signupForm.errors.username && styles.inputError]}
            placeholder="Username"
            placeholderTextColor="gray"
            value={signupForm.username}
            onChangeText={(value) => handleChange('username', value)}
          />
        </View>

        {/* Email Field */}
        <View style={styles.inputContainer}>
          {signupForm.errors.email && <Text style={styles.errorText}>{signupForm.errors.email}</Text>}
          <TextInput
            style={[styles.input, signupForm.errors.email && styles.inputError]}
            placeholder="Email"
            placeholderTextColor="gray"
            value={signupForm.email}
            onChangeText={(value) => handleChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Field */}
        <View style={styles.inputContainer}>
          {signupForm.errors.password && <Text style={styles.errorText}>{signupForm.errors.password}</Text>}
          <TextInput
            style={[styles.input, signupForm.errors.password && styles.inputError]}
            placeholder="Password"
            placeholderTextColor="gray"
            value={signupForm.password}
            onChangeText={(value) => handleChange('password', value)}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, loading.signup && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading.signup}
        >
          <Text style={styles.buttonText}>
            {loading.signup ? 'Signing up...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        {/* Footer Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate('login')}>
            <Text style={styles.footerLink}> Log In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    textAlign: 'right',
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: { backgroundColor: '#aaa' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: { fontSize: 14, color: '#666' },
  footerLink: {
    fontSize: 14,
    color: '#007BFF',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});

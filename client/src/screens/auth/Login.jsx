import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateLoginForm,
  loginUser,
  loginState,
  setLoginErrors,
  getUserAuth,
} from '../../slices/authSlices/loginSlice';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loginForm, loginLoading } = useSelector(loginState);

  const handleChange = (field, value) => {
    dispatch(updateLoginForm({ field, value }));
  };

  const handleSubmit = () => {
    const { email, password } = loginForm;

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('home');
      })
      .catch(err => {
        if (err.errors) {
          console.log(err.errors);
          dispatch(setLoginErrors({ errors: err.errors }));
        } else {
          Alert.alert('Login Failed', err.error || 'Something went wrong.');
        }
      });
  };

  useEffect(() => {
    const getToken = async () => {
      dispatch(getUserAuth())
        .unwrap()
        .then(() => {
          navigation.navigate('home');
        })
        .catch(err => {
          console.log(err);
        });
    };
    getToken()
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        {/* Email Field */}
        <View style={styles.inputContainer}>
          {loginForm.errors.email && (
            <Text style={styles.errorText}>{loginForm.errors.email}</Text>
          )}
          <TextInput
            style={[styles.input, loginForm.errors.email && styles.inputError]}
            placeholder="Email"
            placeholderTextColor="gray"
            value={loginForm.email}
            onChangeText={value => handleChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Field */}
        <View style={styles.inputContainer}>
          {loginForm.errors.password && (
            <Text style={styles.errorText}>{loginForm.errors.password}</Text>
          )}
          <TextInput
            style={[
              styles.input,
              loginForm.errors.password && styles.inputError,
            ]}
            placeholder="Password"
            placeholderTextColor="gray"
            value={loginForm.password}
            onChangeText={value => handleChange('password', value)}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, loginLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loginLoading}>
          <Text style={styles.buttonText}>
            {loginLoading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        {/* Footer Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('signup')}>
            <Text style={styles.footerLink}> Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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

export default Login;

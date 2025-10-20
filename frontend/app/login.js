import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { FORM_PLACEHOLDERS } from '../constants';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('helloworld@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // TODO: Add actual authentication logic here
    signIn(); // Update the global auth state
    router.push('/'); // Navigate to home
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.scrollView}>
        <View style={styles.loginContainer}>
          <View style={styles.logoStarRight}>
            <Ionicons name="star" size={36} color={colors.primary} />
          </View>

          <Text style={styles.loginTitle}>Log in</Text>

          <View style={styles.inputContainer}>
            <Text style={commonStyles.label}>Email address</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={commonStyles.input}
                value={email}
                onChangeText={setEmail}
                placeholder={FORM_PLACEHOLDERS.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {email ? (
                <View style={styles.checkIcon}>
                  <Ionicons name="checkmark" size={16} color={colors.white} />
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={commonStyles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={commonStyles.input}
                value={password}
                onChangeText={setPassword}
                placeholder={FORM_PLACEHOLDERS.password}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color={colors.gray[400]}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or Login with</Text>

          <TouchableOpacity style={styles.googleButton}>
            <MaterialIcons name="g-translate" size={24} color={colors.google} />
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.signupLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: 24,
  },
  logoStarRight: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  loginTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 48,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    position: 'relative',
  },
  checkIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 24,
    height: 24,
    backgroundColor: colors.black,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  loginButton: {
    backgroundColor: colors.black,
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 32,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: colors.gray[500],
    marginBottom: 24,
  },
  googleButton: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 48,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: colors.gray[500],
    fontSize: 14,
  },
  signupLink: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
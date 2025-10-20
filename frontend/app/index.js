import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.homeContainer}>
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <View style={styles.logoBadge}>
              <View style={styles.logoIcon}>
                <Ionicons name="location" size={16} color={colors.blue[900]} />
              </View>
              <Text style={styles.logoText}>L&F</Text>
            </View>
            <View style={styles.logoStar}>
              <Ionicons name="star" size={24} color={colors.primary} />
            </View>
          </View>
        </View>

        <Text style={styles.title}>Lost and Found</Text>
        <Text style={styles.subtitle}>Found your lost product</Text>

        {!isSignedIn ? (
          <>
            <TouchableOpacity
              style={commonStyles.primaryButton}
              onPress={() => router.push('/login')}
            >
              <Text style={commonStyles.primaryButtonText}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[commonStyles.secondaryButton, styles.createButton]}
              onPress={() => {}}
            >
              <Text style={commonStyles.secondaryButtonText}>Create account</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={commonStyles.primaryButton}
            onPress={() => router.push('/post-find')}
          >
            <Text style={commonStyles.primaryButtonText}>Post a Find</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoWrapper: {
    position: 'relative',
  },
  logoBadge: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: colors.blue[900],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoStar: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray[500],
    marginBottom: 48,
    textAlign: 'center',
  },
  createButton: {
    marginTop: 16,
  },
});
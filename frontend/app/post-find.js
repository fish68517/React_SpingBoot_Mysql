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
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { FORM_PLACEHOLDERS, CATEGORIES } from '../constants';

export default function PostFindScreen() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [dateFound, setDateFound] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = () => {
    // TODO: Add form submission logic here
    console.log('Form submitted');
    router.back();
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.scrollView}>
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Post your find</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color={colors.gray[500]} />
            </TouchableOpacity>
          </View>

          {/* Item Picture */}
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>Item Picture</Text>
            <Text style={styles.formHint}>
              Make sure at least one picture has been uploaded!
            </Text>
            <View style={styles.imageUploadRow}>
              {[1, 2, 3].map((i) => (
                <TouchableOpacity key={i} style={styles.imageUploadBox}>
                  <Ionicons name="image-outline" size={32} color={colors.gray[300]} />
                  <View style={styles.editBadge}>
                    <Feather name="edit-2" size={12} color={colors.white} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Category */}
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>Lost Item category</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>
                {category || FORM_PLACEHOLDERS.category}
              </Text>
              <Ionicons name="chevron-down" size={20} color={colors.gray[400]} />
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>Item description</Text>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
              placeholder={FORM_PLACEHOLDERS.description}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Date Found */}
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>Date found</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowCalendar(!showCalendar)}
            >
              <Text style={styles.dateInputText}>
                {dateFound || FORM_PLACEHOLDERS.date}
              </Text>
              <Ionicons name="calendar-outline" size={20} color={colors.primary} />
            </TouchableOpacity>

            {showCalendar && (
              <View style={styles.calendarContainer}>
                <View style={styles.calendarHeader}>
                  <TouchableOpacity>
                    <Ionicons name="chevron-back" size={20} color={colors.black} />
                  </TouchableOpacity>
                  <Text style={styles.calendarMonth}>September 2024</Text>
                  <TouchableOpacity>
                    <Ionicons name="chevron-forward" size={20} color={colors.black} />
                  </TouchableOpacity>
                </View>
                <View style={styles.calendarGrid}>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <Text key={i} style={styles.calendarDay}>
                      {day}
                    </Text>
                  ))}
                </View>
                <Text style={styles.calendarNote}>
                  Calendar dates will appear here
                </Text>
              </View>
            )}
          </View>

          {/* Found Location */}
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>Found location</Text>
            <View style={styles.mapContainer}>
              <View style={styles.mapPlaceholder}>
                <Ionicons name="location" size={40} color={colors.primary} />
              </View>
              <View style={styles.locationInfo}>
                <Ionicons name="location" size={20} color={colors.primary} />
                <Text style={styles.locationText}>
                  109, Freedom Way, Off Lekki Phase, Victoria Island, Lagos.
                </Text>
              </View>
            </View>
          </View>

          {/* Pick Up Location */}
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>Pick up location</Text>
            <View style={styles.mapContainer}>
              <View style={styles.mapPlaceholder}>
                <Ionicons name="location" size={40} color={colors.primary} />
              </View>
              <View style={styles.locationInfoWhite}>
                <Ionicons name="location" size={20} color={colors.primary} />
                <Text style={styles.locationText}>
                  109, Freedom Way, Off Lekki Phase, Vic...
                </Text>
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <View style={styles.submitCheckIcon}>
              <Ionicons name="checkmark" size={16} color={colors.white} />
            </View>
            <Text style={styles.submitButtonText}>Submit the Form</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 24,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  formSection: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  formHint: {
    fontSize: 12,
    color: colors.gray[500],
    marginBottom: 16,
  },
  imageUploadRow: {
    flexDirection: 'row',
    gap: 16,
  },
  imageUploadBox: {
    width: 96,
    height: 96,
    borderWidth: 2,
    borderColor: colors.gray[200],
    borderRadius: 12,
    backgroundColor: colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  editBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    backgroundColor: colors.gray[800],
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 12,
    padding: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.black,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    height: 128,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 12,
    padding: 16,
  },
  dateInputText: {
    fontSize: 16,
    color: colors.gray[400],
  },
  calendarContainer: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 12,
    padding: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarMonth: {
    fontSize: 16,
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  calendarDay: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray[500],
    marginBottom: 8,
  },
  calendarNote: {
    textAlign: 'center',
    color: colors.gray[400],
    fontSize: 12,
  },
  mapContainer: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    height: 192,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.orangeLight,
    gap: 8,
  },
  locationInfoWhite: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.white,
    gap: 8,
  },
  locationText: {
    flex: 1,
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  submitCheckIcon: {
    width: 24,
    height: 24,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

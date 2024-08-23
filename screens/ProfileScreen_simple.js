import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const ProfileScreen_simple = ({ navigation }) => {
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  const handleLogout = () => {
    // Add your logout logic here, e.g., clearing tokens or user data
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerAction}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home'); // Navigate to the home page
              }}>
              <FeatherIcon
                color="#000"
                name="arrow-left"
                size={24} />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>Settings</Text>

          <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
            <TouchableOpacity
              onPress={() => {
                // Handle additional options
              }}>
              <FeatherIcon
                color="#000"
                name="more-vertical"
                size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.section, { paddingTop: 4 }]}>
            <Text style={styles.sectionTitle}>Account</Text>

            <View style={styles.sectionBody}>
              <TouchableOpacity
                onPress={() => {
                  // Handle profile press
                }}
                style={styles.profile}>
                <Image
                  alt=""
                  source={{
                    uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                  }}
                  style={styles.profileAvatar} />

                <View style={styles.profileBody}>
                  <Text style={styles.profileName}>Afwerki Ghirmay</Text>

                  <Text style={styles.profileHandle}>
                    afe.programmer@gmail.com
                  </Text>
                </View>

                <FeatherIcon
                  color="#bcbcbc"
                  name="chevron-right"
                  size={22} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal details</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // Handle first name press
                  }}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>First name</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>Afe</Text>

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>

              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // Handle last name press
                  }}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>Last name</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>Ghirmay</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Email</Text>

                  <View style={styles.rowSpacer} />
                </View>
              </View>

              <View style={[styles.rowWrapper, styles.rowLast]}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Phone number</Text>

                  <View style={styles.rowSpacer} />

                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('QuestionsUpload'); // Navigate to the QuestionsUpload screen
                  }}

                  style={styles.row}>
                  <Text style={styles.rowLabel}>Quiz the community</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>

              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Alert');
                  }}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>Add alert</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>

              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Work');
                  }}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>Add work</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>
              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Segmentation');
                  }}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>Segmentation</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>
              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Segmentation');
                  }}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>Important learning</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>
              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ProjectProposal');
                  }}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>Add project proposal</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>

              <View style={[styles.rowWrapper, styles.rowLast]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('RentHouse');
                  }}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>Add rent house</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>
              
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionBody}>
              <View
                style={[
                  styles.rowWrapper,
                  styles.rowFirst,
                  styles.rowLast,
                  { alignItems: 'center' },
                ]}>
                <TouchableOpacity
                  onPress={handleLogout}
                  style={styles.row}>
                  <Text style={[styles.rowLabel, styles.rowLabelLogout]}>
                    Log Out
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text style={styles.contentFooter}>If you have any questions about this app please get in touch with me: Afe.programmer@gmail.com</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen_simple;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor:'#e6f0fa',
  },
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
  },
  /** Content */
  content: {
    paddingHorizontal: 16,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: '#a69f9f',
  },
  /** Section */
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: '500',
    color: '#a69f9f',
    textTransform: 'uppercase',
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  /** Profile */
  profile: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileBody: {
    marginRight: 'auto',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292929',
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '400',
    color: '#858585',
  },
  /** Row */
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ababab',
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    color: '#dc2626',
  },
});

import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const items = [
  {
    img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
    name: 'Nick Miller',
    message: 'Looking forward to our collaboration!',
  },
  {
    img: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    name: 'Ashley',
    message: 'Amazing!! 🔥🔥🔥',
  },
  {
    img: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Max',
    message: 'Appreciate the opportunity to connect and share insights.',
  },
  {
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
    name: 'Schmidt',
    message: "Let's bring creativity to the forefront of our discussions.",
  },
  {
    img: 'https://images.unsplash.com/photo-1553240799-36bbf332a5c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Dwight',
    message: 'Excited to explore opportunities for collaboration.',
  },
  {
    img: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Amy',
    message: 'Eager to contribute and make a positive impact.',
  },
];

items.push(...items);

export default function Example() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerAction} />

            <View style={styles.headerAction}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <FeatherIcon
                  color="#266EF1"
                  name="edit"
                  size={21} />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.headerTitle}>Messages</Text>
        </View>

        <ScrollView>
          {items.map(({ name, message, img }, index) => {
            return (
              <View key={index} style={styles.cardWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.card}>
                  <Image
                    alt=""
                    resizeMode="cover"
                    source={{ uri: img }}
                    style={styles.cardImg} />

                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{name}</Text>

                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={styles.cardContent}>
                      {message}
                    </Text>
                  </View>

                  <View style={styles.cardIcon}>
                    <FeatherIcon
                      color="#ccc"
                      name="chevron-right"
                      size={20} />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Header */
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  /** Card */
  card: {
    height: 66,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: '#DFDFE0',
    marginLeft: 16,
  },
  cardImg: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    marginRight: 12,
  },
  cardBody: {
    maxWidth: '100%',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  cardContent: {
    fontSize: 15,
    fontWeight: '500',
    color: '#737987',
    lineHeight: 20,
    marginTop: 4,
  },
  cardIcon: {
    alignSelf: 'flex-start',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
});
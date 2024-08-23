import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Modal,
  Button,
} from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Link } from 'expo-router';

const MezmurScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    {
      img: "https://plus.unsplash.com/premium_photo-1677439907866-938da05a0ee0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "ሀኪም ሰብለ በእርግዝና ዙሪያ ለሴቶች ትምህርት መስጠት ትፈልጋለች።",
      author: "አፍወርቅ",
      authorImg: "https://media.istockphoto.com/id/157189484/photo/icon-madonna-with-child.webp?b=1&s=170667a&w=0&k=20&c=u90v28mLh8n2gW26vBHlpoMbRdxn8kk_TSTKToYslME=",
      tag: "የማሪያም መዝሙር",
      date: "Mar, 2023",
    },
    // Add more items here
  ];

  const filterItems = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (!searchTerm) {
      setFilteredItems([]);
      return;
    }
    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const trimTitle = (title) => {
    const words = title.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return title;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.main}>
          <Link href="/upload/Upload_mezmur" style={{ textDecorationLine: 'underline' }}>
            Upload Mezmur
          </Link>
          <View style={styles.headerSearch}>
            <View style={styles.headerSearchIcon}>
              <FeatherIcon color="#778599" name="search" size={17} />
            </View>
            <TextInput
              autoCapitalize="words"
              autoComplete="name"
              placeholder="Search..."
              placeholderTextColor="#778599"
              style={styles.headerSearchInput}
              onChangeText={filterItems}
              value={searchTerm}
            />
          </View>
          <View style={{
            height: 1,
            backgroundColor: '#ccc',
            marginVertical: 10,
          }}></View>
          {(searchTerm ? filteredItems : items).map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => openModal(item)}>
                <View style={styles.card}>
                  <Image
                    alt=""
                    resizeMode="cover"
                    source={{ uri: item.img }}
                    style={styles.cardImg}
                  />
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTag}>{item.tag}</Text>
                    <Text style={styles.cardTitle}>{trimTitle(item.title)}</Text>
                    <View style={styles.cardRow}>
                      <View style={styles.cardRowItem}>
                        <Image
                          alt=""
                          source={{ uri: item.authorImg }}
                          style={styles.cardRowItemImage}
                        />
                        <Text style={styles.cardRowItemText}>{item.author}</Text>
                      </View>
                      <Text style={styles.cardRowDivider}>.</Text>
                      <View style={styles.cardRowItem}>
                        <Text style={styles.cardRowItemText}>{item.date}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem && selectedItem.title}</Text>
              <Text style={styles.modalDescription}>{selectedItem && selectedItem.description}</Text>
              {/* Add more item details here */}
              <Button title="Close" onPress={closeModal} />
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0fa',
  },
  main: {
    padding: 24,
  },
  headerSearch: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerSearchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  headerSearchInput: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingLeft: 34,
    width: '100%',
    fontSize: 16,
    fontWeight: '500'
  },
  card: {
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  cardImg: {
    width: 96,
    height: 96,
    borderRadius: 12,
  },
  cardBody: {
    flex: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },
  cardTag: {
    fontWeight: "500",
    fontSize: 12,
    color: "#939393",
    marginBottom: 7,
    textTransform: "capitalize",
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19,
    color: "#000",
    marginBottom: 8,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: -8,
    marginBottom: "auto",
  },
  cardRowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderColor: "transparent",
  },
  cardRowItemImage: {
    width: 22,
    height: 22,
    borderRadius: 9999,
    marginRight: 6,
  },
  cardRowItemText: {
    fontWeight: "400",
    fontSize: 13,
    color: "#939393",
  },
  cardRowDivider: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#939393",
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default MezmurScreen;

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
} from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';

const BooksScreen = () => {
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.main}>
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
          <View style={styles.separator}></View>
          {(searchTerm ? filteredItems : items).map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => openModal(item)}
                style={styles.newsItem}
              >
                <Image
                  source={{ uri: item.img }}
                  style={styles.newsImage}
                />
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle}>{trimTitle(item.title)}</Text>
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
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedItem.title}</Text>
              <Text style={styles.modalDescription}>{selectedItem.content}</Text>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e6f0fa",
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
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  newsItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    flexDirection: 'row',
  },
  newsImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 18,
  },
});

export default BooksScreen;

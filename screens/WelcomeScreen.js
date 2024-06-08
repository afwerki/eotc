import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const WelcomeScreen = ({ navigation }) => {
    const handleGetStarted = async () => {
        try {
            await AsyncStorage.setItem('hasSeenWelcome', 'true');
            navigation.replace('Login');
        } catch (error) {
            console.error('Failed to save the data to the storage', error);
        }
    };

    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage cleared');
        } catch (error) {
            console.error('Failed to clear the AsyncStorage', error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image style={styles.backgroundImage} source={require("../assets/Priests.png")} />

            <LinearGradient
                colors={['transparent', '#18181b']}
                style={styles.gradient}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 0.8 }}
            >
                <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.textContainer}>
                    <Text style={[styles.welcomeText, { fontSize: hp(5) }]}>
                        እንዃን <Text style={styles.highlightedText}>ወደቤተ ክርስቲያን </Text>
                    </Text>
                    <Text style={[styles.welcomeText, { fontSize: hp(5) }]}>
                        በደህና መጡ
                    </Text>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(200).springify()}>
                    <TouchableOpacity
                        onPress={handleGetStarted}
                        style={[styles.button, { height: hp(7), width: wp(80) }]}
                    >
                        <Text style={[styles.buttonText, { fontSize: hp(3) }]}>
                            Get Started
                        </Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Temporary Button to Clear AsyncStorage */}
                <View style={styles.clearButtonContainer}>
                    <Button title="Clear Storage" onPress={clearAsyncStorage} />
                </View>
            </LinearGradient>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backgroundImage: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    gradient: {
        width: wp(100),
        height: hp(70),
        justifyContent: 'flex-end',
        paddingBottom: 12,
    },
    textContainer: {
        alignItems: 'center',
    },
    welcomeText: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    highlightedText: {
        color: '#f43f5e',
    },
    button: {
        backgroundColor: '#f43f5e',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#d4d4d8',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    clearButtonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});

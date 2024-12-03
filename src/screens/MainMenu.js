import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';



const MainMenu = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../assets/background.jpg')} // Bakgrundsbild
            style={styles.background}
        >
            {/* Topbar */}

            <View style={styles.topBar}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="settings-outline" size={24} color="#7F0705" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="menu-outline" size={24} color="#7F0705" />
                </TouchableOpacity>
            </View>

            {/* Titel */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Welcome back</Text>
                <Text style={styles.subtitle}>to bloxiting</Text>
            </View>

            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            {/* Centrala ikoner */}
            <View style={styles.centerBar}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="stats-chart-outline" size={24} color="#7F0705" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>

                    <Ionicons name="trophy-outline" size={24} color="#7F0705" />
                </TouchableOpacity>
            </View>


            {/* Menyknappar */}
            <View style={styles.menu}>
                {/* Nytt spel */}
                <TouchableOpacity style={styles.menuButton}
                    activeOpacity={0.7} // Mindre blek
                    onPress={() => navigation.navigate('GameScreen')}
                >
                    <LinearGradient
                        colors={['#F85201', '#D0380E']} // Gradientfärger
                        start={{ x: 0, y: 0 }} // Övre vänstra hörnet
                        end={{ x: 0, y: 2 }}   // Nedre högra hörnet
                        style={styles.gradientButton}
                    >
                        <Text style={styles.buttonText}>New game</Text>
                    </LinearGradient>
                </TouchableOpacity>
                
                {/* Nytt spel */}
                <TouchableOpacity style={styles.menuButton}
                    activeOpacity={0.7} // Mindre blek
                    onPress={() => navigation.navigate('GameScreen')}
                >
                    <LinearGradient
                        colors={['#F85201', '#D0380E']} // Gradientfärger
                        start={{ x: 0, y: 0 }} // Övre vänstra hörnet
                        end={{ x: 0, y: 2 }}   // Nedre högra hörnet
                        style={styles.gradientButton}
                    >
                        <Text style={styles.buttonText}>New game</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Fortsätt spel */}
                <TouchableOpacity
                    style={styles.menuButton}
                    activeOpacity={0.7} // Mindre blek
                    onPress={() => navigation.navigate('NewGameScreen')}
                    >
                    <LinearGradient
                        colors={['#ffffff', '#f0f0f0']} // Gradient för "Fortsätt spel"
                        style={styles.gradientButton}
                    >
                        <Text style={styles.buttonTextInverted}>Continue game</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Copyright bloxiting - 2025</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 40,
        paddingHorizontal: 20,
    },
    centerBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        paddingHorizontal: 20,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#7F0705',
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
    },
    centerIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    menu: {
        marginTop: 30,
        alignItems: 'center',
    },
    menuButton: {
        marginVertical: 10,
    },
    gradientButton: {
        width: 250,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F85201', // Matcha gradientens färg
        shadowOffset: { width: 7, height: 7 }, // Snett neråt
        shadowOpacity: 0.3, // Halvgenomskinlig skugga
        shadowRadius: 15, // Bred skugga
        elevation: 10, // För Android
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'thin',
        color: '#fff',
    },
    buttonTextInverted: {
        fontSize: 18,
        fontWeight: 'thin',
        color: '#404647',
    },
    footer: {
        alignItems: 'center',
        marginBottom: 0,
        marginTop: 40,
    },
    footerText: {
        fontSize: 12,
        color: '#777',
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 0, // Justera avstånd om nödvändigt
    },
    logo: {
        width: 300, // Justera storlek på logotypen
        height: 160, // Justera höjd för att behålla proportioner
    },
});

export default MainMenu;
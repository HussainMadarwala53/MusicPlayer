import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import Slider from '@ptomasroos/react-native-multi-slider';
import { Audio } from 'expo-av';
import songs from '../data';

const { width, height } = Dimensions.get('window');
var soundIndex = -1;

var playSound = async (index) => {
  console.log('pressed in playsound');
  var url = [];

  url.push(
    'https://drive.google.com/uc?export=open&id=1EssId8qNd7PlSaxt90qYhmmzgxMcVL9-'
  );

  url.push('https://drive.google.com/file/d/1lRhW7m2x0qbDwBZn91_Y2teUqaORbEaE');

  url.push(
    'https://drive.google.com/uc?export=open&id=1Ssq2Ly-eJ4DWY-R8ITeHDeIijgD8Ijqf'
  );

  url.push(
    'https://drive.google.com/uc?export=open&id=1xUqYCLzizjWnNvZFRoaWEJrTgRNKWvSx'
  );

  url.push('https://drive.google.com/file/d/1AvFg64LzbzhrEOJcSydd9gIirxcx8WbD');

  await Audio.setIsEnabledAsync(true);
  await Audio.Sound.createAsync(
    {
      uri: url[index],
    },
    { shouldPlay: true }
  );
};

const MusicPlayer = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const songSlider = useRef(null);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width);
      setSongIndex(index);
      //  console.log('index ',index)
    });
    return () => {
      scrollX.removeAllListeners();
    };
  });

  const skipToNext = () => {
    songSlider.current.scrollToOffset({ offset: (songIndex + 1) * width });
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({ offset: (songIndex - 1) * width });
  };

  const renderSongs = ({ index, item }) => {
    return (
      <View
        style={{
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/*gets artwork image*/}
        <View style={styles.artworkWrapper}>
          <Image source={item.image} style={styles.artworkImage} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.containerA}>
      <View style={styles.container}>
        <View style={{ width: width }}>
          <Animated.FlatList
            ref={songSlider}
            data={songs}
            renderItem={renderSongs}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x: scrollX },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
          />
        </View>
        <View>
          {/*display song title and atrist*/}
          <Text style={styles.title}>{songs[songIndex].title}</Text>
          <Text style={styles.artist}>{songs[songIndex].artist}</Text>
        </View>
        <View>
          <Slider
            style={{ align: 'center', marginTop: 30 }}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#FFFFFF"
            onSlidingComplete={() => {}}
          />
        </View>
        <View style={styles.progressLabel}>
          <Text style={styles.progressLabelText}>0:00</Text>
          <Text style={styles.progressLabelText}>4:00</Text>
        </View>

        <View style={styles.musicControls}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons
              name="play-skip-back-outline"
              size={50}
              color="#B2ACAB"
              style={{ marginTop: 8, marginLeft: 5 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              soundIndex++;
              playSound(soundIndex);
            }}>
            <Ionicons
              name={'ios-play-circle-outline'}
              size={50}
              color="green"
              style={{ marginTop: 8, marginLeft: 15 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Audio.setIsEnabledAsync(false);
            }}>
            <Ionicons
              name={'pause'}
              size={50}
              color="red"
              style={{ marginTop: 8, marginLeft: 15 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={skipToNext}>
            <Ionicons
              name="play-skip-forward-outline"
              size={50}
              color="#B2ACAB"
              style={{ marginTop: 8, marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>
        <StatusBar barStyle="light-content" />
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  containerA: {
    flex: 1,
    backgroundColor: '#003366',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
  },
  artworkImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    allignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#EEEEEE',
  },
  artist: {
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
    color: '#EEEEEE',
  },
  progressLabel: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  progressLabelText: {
    color: '#FFFFFF',
  },
  musicControls: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});

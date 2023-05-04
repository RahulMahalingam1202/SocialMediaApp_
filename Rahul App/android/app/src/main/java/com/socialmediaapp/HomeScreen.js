import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [postVideo, setPostVideo] = useState(null);
  const [posts, setPosts] = useState([]);

  const handlePost = () => {
    const newPost = {
      text: postText,
      image: postImage,
      video: postVideo,
    };
    setPosts([newPost, ...posts]);
    setPostText('');
    setPostImage(null);
    setPostVideo(null);
  };

  const handleChooseImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setPostImage(response.uri);
      }
    });
  };

  const handleChooseVideo = () => {
    const options = {
      mediaType: 'video',
      videoQuality: 'high',
      durationLimit: 30,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setPostVideo(response.uri);
      }
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.postContainer}>
        {item.text ? <Text style={styles.postText}>{item.text}</Text> : null}
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.postImage} />
        ) : null}
        {item.video ? (
          <Video
            source={{ uri: item.video }}
            style={styles.postVideo}
            resizeMode="contain"
            controls={true}
          />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          value={postText}
          onChangeText={(text) => setPostText(text)}
        />
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={handleChooseImage}>
            <Icon name="picture-o"
                      size={20}
                      color="#777"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleChooseVideo}>
                    <Icon name="video-camera" size={20} color="#777" style={styles.icon} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.postButton} onPress={handlePost}>
                  <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.flatlist}
              />
            </View>
          );
        };
        
        const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            paddingTop: 10,
          },
          inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          },
          input: {
            flex: 1,
            backgroundColor: '#eee',
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            fontSize: 16,
            marginRight: 10,
          },
          iconsContainer: {
            flexDirection: 'row',
          },
          icon: {
            marginHorizontal: 10,
          },
          postButton: {
            backgroundColor: '#039be5',
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
          },
          postButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
          },
          postContainer: {
            backgroundColor: '#eee',
            marginBottom: 10,
            borderRadius: 10,
            overflow: 'hidden',
          },
          postText: {
            padding: 10,
            fontSize: 16,
          },
          postImage: {
            width: width - 20,
            height: width - 20,
          },
          postVideo: {
            width: width - 20,
            height: width - 20,
          },
          flatlist: {
            flex: 1,
          },
        });
        
        export default HomeScreen;
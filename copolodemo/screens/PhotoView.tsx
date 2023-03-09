import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Permission,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
//import * as ImagePicker from 'react-native-image-picker';
import {MediaType, PhotoQuality} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {openSettings} from 'react-native-permissions';
import {
  onPermissionDeny,
  requestAllPermissions,
} from '../Utils/permissionHelper';

const PhotoView = (): JSX.Element => {
  const [mediaObject, setMediaObject] = useState([]);

  const openPhotoLibrary = () => {
    let options = {
      title: 'Select Image',
      mediaType: 'image' as MediaType,
      maxWidth: 300,
      maxHeight: 300,
      quality: 1 as PhotoQuality,
    };

    launchImageLibrary(options, response => {
      console.log(response);
      // if (response) {
      //   setPhoto(response);
      // }
    });
  };

  const onPermissionGrant = async (): Promise<void> => {
    requestAllPermissions().then(result => {
      console.log('RESULT : ' + result);

      if (result) {
        console.log('Open Photo');
        openPhotoLibrary();
      } else {
        Alert.alert('Title', 'Permission', [
          {
            text: 'Cancel',
            onPress: () => onPermissionDeny(),
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => {
              openSettings();
            },
          },
        ]);
      }
    });
  };

  const photoAccessButtonClicked = () => {
    console.log('photoAccessButtonClicked');
    onPermissionGrant();
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => photoAccessButtonClicked()}>
        <Text>Photo Access</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  buttonStyle: {
    backgroundColor: 'lightgray',
    height: 50,
    marginHorizontal: 50,
    marginVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default PhotoView;

import {Platform} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import {
  request,
  checkMultiple,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

export const onPermissionDeny = (): void => {
  RNExitApp.exitApp();
};

export const checkAllPermissionGranted = async (): Promise<boolean> => {
  let perm: any = [];
  if (Platform.OS === 'android') {
    perm = [
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.READ_SMS,
      PERMISSIONS.ANDROID.SEND_SMS,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ];
  }
  //  if (Platform.OS === 'ios') {
  //    perm = [PERMISSIONS.IOS.LOCATION_ALWAYS];
  //  }

  if (Platform.OS === 'android') {
    const hasAllPermissions = await checkMultiple(perm).then(statuses => {
      if (Platform.OS === 'android') {
        return (
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
            RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.READ_SMS] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.SEND_SMS] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
            RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
            RESULTS.GRANTED
        );
      } else {
        return statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED;
      }
    });

    return hasAllPermissions;
  } else {
    return true;
  }
};

export const requestAllPermissions = async (): Promise<boolean> => {
  let perm: any = [];
  if (Platform.OS === 'android') {
    perm = [
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.READ_SMS,
      PERMISSIONS.ANDROID.SEND_SMS,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_PHONE_STATE,
      PERMISSIONS.ANDROID.CAMERA,
    ];
  }
  //  if (Platform.OS === 'ios') {
  //    perm = [
  //      PERMISSIONS.IOS.LOCATION_ALWAYS,
  //      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  //    ];
  //  }

  if (Platform.OS === 'android') {
    const isPermisionsGranted = await requestMultiple(perm).then(statuses => {
      if (Platform.OS === 'android') {
        return (
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
            RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.READ_SMS] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.SEND_SMS] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
            RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
            RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.READ_PHONE_STATE] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED
        );
      } else {
        return (
          statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED
        );
      }
    });

    return isPermisionsGranted;
  } else {
    return true;
  }
};

export const checkSMSPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const hasSMSPermissions = await request(PERMISSIONS.ANDROID.SEND_SMS).then(
      result => {
        return result === RESULTS.GRANTED;
      },
    );
    return hasSMSPermissions;
  } else {
    return true;
  }
};

export const checkStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const hasStoragePermissions = await request(
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ).then(result => {
      return result === RESULTS.GRANTED;
    });
    return hasStoragePermissions;
  } else {
    return true;
  }
};

export const checkPhoneStatePermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const hasSMSPermissions = await request(
      PERMISSIONS.ANDROID.READ_PHONE_STATE,
    ).then(result => {
      return result === RESULTS.GRANTED;
    });
    return hasSMSPermissions;
  } else {
    return true;
  }
};

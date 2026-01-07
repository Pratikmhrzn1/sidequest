import * as Device from 'expo-device';
import * as Application from 'expo-application';
import { Platform } from 'react-native';

export const getDeviceInfo = async () => {
  let iosId = null;

  if (Platform.OS === 'ios') {
    iosId = await Application.getIosIdForVendorAsync();
  }

  return {
    platform: Platform.OS,                 // ios | android | web
    osName: Device.osName,
    osVersion: Device.osVersion,
    brand: Device.brand,
    model: Device.modelName,
    deviceName: Device.deviceName,
    isPhysicalDevice: Device.isDevice,
    appVersion: Application.nativeApplicationVersion,
    buildVersion: Application.nativeBuildVersion,
    deviceId: Platform.OS === 'android'
      ? Application.getAndroidId
      : iosId,
  };
};

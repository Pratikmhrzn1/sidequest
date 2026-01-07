// app/_layout.tsx
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as Device from 'expo-device';

export default function RootLayout() {
  useEffect(() => {
    const sendDeviceInfo = async () => {
      const deviceInfo = {
        brand: Device.brand,
        manufacturer: Device.manufacturer,
        modelName: Device.modelName,
        deviceName: Device.deviceName,
        osName: Device.osName,
        osVersion: Device.osVersion,
        isDevice: Device.isDevice,
        deviceType: 
          Device.deviceType === 1 ? 'phone' : 
          Device.deviceType === 2 ? 'tablet' : 'unknown',
      };

      // console.log('Device Info (App Opened):', deviceInfo);

      try {
        await fetch('http://192.168.18.3:5000/api/device-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...deviceInfo,
            timestamp: new Date().toISOString(),
            appVersion: '1.0.0'
          })
        });
        // console.log("Device info sent to backend!");
      } catch (err) {
        console.log("Failed to send device info:", err);
      }
    };

    sendDeviceInfo();
  }, []); // Runs only once when app starts

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="visa-requirement-screen" />
      {/* Add other screens if needed */}
    </Stack>
  );
}
import React from "react";
import {Camera as Cam} from "react-native-vision-camera"
import { View, Text,StyleSheet } from "react-native";
import { useCameraDevices } from "react-native-vision-camera";

const Camera = () => {
  //const newCameraPermission = Cam.requestCameraPermission()
  const devices = useCameraDevices();
  const device = devices.back;
  console.log("permission status", Cam.getCameraPermissionStatus())
  //console.log("permission: ", newCameraPermission) //{_h: null}
  //if (newCameraPermission === null) console.log("permission null")
  console.log("devices: ", devices)
  if (device === null)
  {
    return (
      <View>
        <Text>Kamera Bulunamadı</Text>
      </View>
    );
  }
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
};

export default Camera;

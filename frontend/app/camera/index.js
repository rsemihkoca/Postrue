import React from "react";
import { View, Text } from "react-native";
import { useCameraDevices } from "react-native-vision-camera";

const Camera = () => {
  const devices = useCameraDevices();
  const device = devices.back;

  if (device == null)
    return (
      <View>
        <Text>Kamera Bulunamadı</Text>
      </View>
    );
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
};

export default Camera;

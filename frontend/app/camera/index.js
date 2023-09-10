import React, { useEffect, useState } from "react";
import {Camera} from "react-native-vision-camera"
import { View, Text,StyleSheet } from "react-native";
import { useCameraDevices } from "react-native-vision-camera";

const CameraView = () => {
  const devices = useCameraDevices();

  if (devices.back != undefined)
  {
    const device = devices.back
    return (
        <View style={StyleSheet.absoluteFill}>
          <Camera style={[StyleSheet.absoluteFill, {flex: 1}]} device={device} isActive={true} />
        </View>
    );
  }
  
  return ( 
    <View>
        <Text>Kamera Bulunamadı</Text>
      </View>
  );
};

export default CameraView;

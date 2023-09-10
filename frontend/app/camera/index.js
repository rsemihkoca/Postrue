import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Platform.OS == 'android' ? imagePath.uri : imagePath.uri.split('//')[1]

export default function CameraView() {
  const [currentPosture, setCurrentPosture] = useState(false);
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
 
  const [camera, setCamera] = useState(null);

  const sendPhoto = async (path) => {
    const formData = new FormData();
    formData.append("file", {
      uri: path,
      type: "image/jpeg",
      name: "photo.jpg",
    });
    fetch(
      "https://caf6-2a02-ff0-208-8675-a897-a4f2-2b57-9d50.ngrok-free.app/posture_detection/",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "ngrok-skip-browser-warning": true,
        },
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data?.bad_posture);
        if (data?.bad_posture === true || data?.bad_posture === undefined) {
          setCurrentPosture(false);
          return;
        }
        setCurrentPosture(true);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  function takePicture() {
    console.log("takePicture");
    setInterval(() => {
      console.log("takePictureAsync");
      camera.takePictureAsync({
        skipProcessing: true,
        onPictureSaved: (data) => {
          console.log("data", data);
          sendPhoto(data.uri);
        },
      });
    }, 2000);
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => setCamera(ref)}
        onCameraReady={() => {
          takePicture();
        }}
      >
        <View style={styles.cameraContainer}>
          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.text_container}>
            <Text style={styles.posture_text}>
              Posture:{" "}
              <Text
                style={[
                  styles.posture_text_secondary,
                  currentPosture === true && styles.good_posture,
                ]}
              >
                {currentPosture ? "GOOD" : "BAD"}
              </Text>
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Switch Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  text_container: {
    marginTop: 64,
    backgroundColor: "white",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingVertical: 16,
  },
  posture_text: {
    color: "white",
    textAlign: "center",
    fontSize: 32,
  },
  posture_text_secondary: {
    color: "red",
  },
  good_posture: {
    color: "green",
  },
  camera: {
    flex: 1,
    width: Dimensions.get("screen").width,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginVertical: 120,
  },
  text: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
});

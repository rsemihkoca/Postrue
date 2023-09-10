import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableHighlight,
  Image,
} from "react-native";
import { getHeight, getWidth } from "../../lib/space.js";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "../../assets/avatar.jpeg";
import PressableInput from "../../components/PressableInput/PressableInput.js";
import Chart from "../../components/Chart/Chart.js";
import AuthTop from "../../assets/AuthTop.js";
const AuthenticationFrom = () => {
  const insets = useSafeAreaInsets();
  const [activeChart, setActiveChart] = useState("Daily");

  const [backendData, setBackendData] = useState()
  const [chartData, setChartData] = useState()
  const colors = {
    Monthly: "#1D84B5",
    Weekly: "#FF5C00",
    Daily: "#F26CA7",
  }

  const getDetails = () => {
    fetch(`https://caf6-2a02-ff0-208-8675-a897-a4f2-2b57-9d50.ngrok-free.app/${activeChart.toLocaleLowerCase()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        setBackendData(data)
        console.log(data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  useEffect(() => {
    getDetails()
  }, [activeChart])


  return (
    <View style={styles.container}>
      <AuthTop style={[styles.top, { marginTop: -insets.top - 20 }]} />
      <View style={styles.topMenu}>
        {/* <Pressable onPress={() => { }} style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
          <Text style={{ fontSize: 25 }}>{'<'}</Text>
        </Pressable> */}
        <Text style={[styles.chartTitle, { marginLeft: 10, fontSize: 32 }]}>
          Details
        </Text>
      </View>
      <View style={styles.main}>
        <View style={styles.buttonsContainer}>
          <PressableInput underlayColor={'#e3e3e3'} onPress={() => { setActiveChart('Monthly') }} style={[styles.button, { backgroundColor: (activeChart === 'Monthly' ? colors.Monthly : '#e3e3e3') }]}>
            <Text style={[styles.buttonText, { color: (activeChart === 'Monthly' ? '#e3e3e3' : '#000') }]}>Monthly</Text>
          </PressableInput>
          <PressableInput underlayColor={'#e3e3e3'} onPress={() => { setActiveChart('Weekly') }} style={[styles.button, { backgroundColor: (activeChart === 'Weekly' ? colors.Weekly : '#e3e3e3') }]}>
            <Text style={[styles.buttonText, { color: (activeChart === 'Weekly' ? '#e3e3e3' : '#000') }]}>Weekly</Text>
          </PressableInput>
          <PressableInput underlayColor={'#e3e3e3'} onPress={() => { setActiveChart('Daily') }} style={[styles.button, { backgroundColor: (activeChart === 'Daily' ? colors.Daily : '#e3e3e3') }]}>
            <Text style={[styles.buttonText, { color: (activeChart === 'Daily' ? '#e3e3e3' : '#000') }]}>Daily</Text>
          </PressableInput>
        </View>
      </View>
      <View style={styles.chart}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, }}>
          <View style={{ width: getWidth(200) }}>
            <Text style={[styles.chartTitle, { color: colors[activeChart] }]}>
              {activeChart}
            </Text>
            <Text style={styles.name}>
              Posture Score
            </Text>
          </View>
          <View style={{ height: 40, marginTop: 20, textAlign: 'left' }}>
            <Text style={[styles.name]}>
              Change: {Math.floor(backendData?.Change * 100)}%</Text>
            <Text style={[styles.name, { marginTop: 'auto', textAlign: 'left' }]}>
              Average: {Math.floor(backendData?.Average * 100)}%
            </Text>
          </View>
        </View>
        {backendData && <Chart backendData={backendData} mode={activeChart} color={colors[activeChart]} />}
        <View style={{ marginTop: getHeight(40) }}>
          <Text style={[styles.chartDetailsTitle, { color: colors[activeChart], fontSize: 24 }]}>
            Average Scores
          </Text>
          <View style={styles.chartDetails}>
            <View>
              <Text style={[styles.chartDetailsTitle, { color: '#007AFF' }]}>
                Neck
              </Text>
              <Text style={styles.chartDetailsValue}>
                {Math.floor(backendData?.NeckPercentage * 100)}%
              </Text>
            </View>
            <View>
              <Text style={[styles.chartDetailsTitle, { color: '#2EAEC5' }]}>
                Torso
              </Text>
              <Text style={styles.chartDetailsValue}>
                {Math.floor(backendData?.TorsoPercentage * 100)}%
              </Text>
            </View>
            <View>
              <Text style={[styles.chartDetailsTitle, { color: '#2EAEC5' }]}>
                Neck&Torso
              </Text>
              <Text style={styles.chartDetailsValue}>
                {Math.floor(backendData?.NeckTorsoPercentage * 100)}%
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: getHeight(80) }}>
          <PressableInput onPress={() => { }} style={[styles.chartDetailsTitle, { color: colors[activeChart], fontSize: 24, height: 60, marginTop: getHeight(100) }]}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 24 }}>
              CAMERA
            </Text>
          </PressableInput>
        </View>
      </View>
    </View >
  );
};

export default AuthenticationFrom;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flex: 1,
    width: "100vw",
    justifyContent: "space-between",

  },
  topMenu: {
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: getWidth(24),
  },
  personalInfo: {
    flexDirection: "column",
    flex: 1,
    paddingHorizontal: getWidth(24),
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  main: {
    marginTop: getHeight(70),
    width: "100%",
  },
  form: {
    marginTop: getHeight(46),
    rowGap: getHeight(20),
  },
  name: {
    color: 'black',
    width: getWidth(143),
    height: 24,
    marginTop: -10,
    fontSize: 20,
    fontFamily: 'Eudoxus-SemiBold',
    fontWeight: '500',
  },
  text: {
    fontFamily: "Eudoxus-Medium",
    textAlign: "left",
    color: "#333333",
    width: '140%',
    height: 20,
  },
  top: {
    marginLeft: getWidth(207),
    position: "absolute",
  },
  button: {
    width: '30%',
    margin: 10,
  },
  buttonText: {
    fontFamily: "Eudoxus-Medium",
    textAlign: "center",
    color: "#333333",
    width: '100%',
    fontSize: 18,
    height: 28,
  },

  buttonsContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    marginHorizontal: getWidth(24),
    height: 65,
    padding: 10,
    borderRadius: 7,
    backgroundColor: "#f3f3f3",
  },

  chart: {
    marginTop: getHeight(120),
    marginHorizontal: getWidth(24),
  },

  chartTitle: {
    fontFamily: "Eudoxus-Bold",
    fontSize: 28,
    color: "#333333",
    textAlign: "left",
    height: 38,
    fontWeight: "bold",
  },
  chartDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: getHeight(10),
    textAlign: "center",
  },
  chartDetailsTitle: {
    fontFamily: "Eudoxus-SemiBold",
    fontSize: 20,
    height: 28,
    textAlign: "center",
    fontWeight: '600',
  },
  chartDetailsValue: {
    fontFamily: "Eudoxus-Medium",
    fontSize: 18,
    height: 28,
    textAlign: "center",
    color: "#333333",
  },
});

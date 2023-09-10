import React from 'react'
import { Text, View } from 'react-native'
import { StackedBarChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'

const Chart = ({ color, backendData, mode }) => {
  const data = [
    {
      month: new Date(2015, 0, 1),
      apples: 3840,
      bananas: 1920,

    },
    {
      month: new Date(2015, 1, 1),
      apples: 1600,
      bananas: 1920,


    },
    {
      month: new Date(2015, 2, 1),
      bananas: 1920,
      apples: 640,

    },
    {
      month: new Date(2015, 3, 1),
      bananas: 1920,
      apples: 3320,

    },
    {
      month: new Date(2015, 3, 1),
      bananas: 1920,
      apples: 3320,

    },
    {
      month: new Date(2015, 3, 1),
      bananas: 1920,
      apples: 3320,

    },
    {
      month: new Date(2015, 3, 1),
      bananas: 1920,
      apples: 3320,

    },
  ]

  let dayData = [
    {
      time: '0-6',
      neck: backendData?.Intervals['0-6']?.Neck,
      torso: backendData?.Intervals['0-6']?.Torso,
      neckTorso: backendData?.Intervals['0-6']?.NeckTorso,
      count: backendData?.Intervals['0-6']?.count
    },
    {
      time: '6-12',
      neck: backendData?.Intervals['6-12']?.Neck,
      torso: backendData?.Intervals['6-12']?.Torso,
      neckTorso: backendData?.Intervals['6-12']?.NeckTorso,
      count: backendData?.Intervals['6-12']?.count

    },
    {
      time: '12-18',
      neck: backendData?.Intervals['12-18']?.Neck,
      torso: backendData?.Intervals['12-18']?.Torso,
      neckTorso: backendData?.Intervals['12-18']?.NeckTorso,
      count: backendData?.Intervals['12-18']?.count
    },
    {
      time: '18-24',
      neck: backendData?.Intervals['18-24']?.Neck,
      torso: backendData?.Intervals['18-24']?.Torso,
      neckTorso: backendData?.Intervals['18-24']?.NeckTorso,
      count: backendData?.Intervals['18-24']?.count
    },
  ]

  let weekData = [
    {
      time: 'Monday',
      neck: backendData?.Intervals['Monday']?.Neck,
      torso: backendData?.Intervals['Monday']?.Torso,
      neckTorso: backendData?.Intervals['Monday']?.NeckTorso,
      count: backendData?.Intervals['Monday']?.count
    },
    {
      time: 'Tuesday',
      neck: backendData?.Intervals['Tuesday']?.Neck,
      torso: backendData?.Intervals['Tuesday']?.Torso,
      neckTorso: backendData?.Intervals['Tuesday']?.NeckTorso,
      count: backendData?.Intervals['Tuesday']?.count
    
    },
    {
      time: 'Wednesday',
      neck: backendData?.Intervals['Wednesday']?.Neck,
      torso: backendData?.Intervals['Wednesday']?.Torso,
      neckTorso: backendData?.Intervals['Wednesday']?.NeckTorso,
      count: backendData?.Intervals['Wednesday']?.count
    },
    {
      time: 'Thursday',
      neck: backendData?.Intervals['Thursday']?.Neck,
      torso: backendData?.Intervals['Thursday']?.Torso,
      neckTorso: backendData?.Intervals['Thursday']?.NeckTorso,
      count: backendData?.Intervals['Thursday']?.count
    },
    {
      time: 'Friday',
      neck: backendData?.Intervals['Friday']?.Neck,
      torso: backendData?.Intervals['Friday']?.Torso,
      neckTorso: backendData?.Intervals['Friday']?.NeckTorso,
      count: backendData?.Intervals['Friday']?.count
    },
    {
      time: 'Saturday',
      neck: backendData?.Intervals['Saturday']?.Neck,
      torso: backendData?.Intervals['Saturday']?.Torso,
      neckTorso: backendData?.Intervals['Saturday']?.NeckTorso,
      count: backendData?.Intervals['Saturday']?.count
    },
    {
      time: 'Sunday',
      neck: backendData?.Intervals['Sunday']?.Neck,
      torso: backendData?.Intervals['Sunday']?.Torso,
      neckTorso: backendData?.Intervals['Sunday']?.NeckTorso,
      count: backendData?.Intervals['Sunday']?.count
    },
  ]

  const colors = ['#007AFF', '#2EAEC5', '#C0C0C0']
  const keys = ['neck', 'torso', 'neckTorso']
  const contentInset = { top: 20, bottom: 20 }

  return (
    <View style={{ height: 200, flexDirection: 'row' }}>
      <YAxis
        data={[0, 1]}
        contentInset={{ top: 10, bottom: 30 }}
        style={{ height: '90%', marginTop: 20 }}
        svg={{
          fontSize: 12, fontWeight: '700',
          fill: "black",
        }}
        formatLabel={(value) => value}
        numberOfTicks={3}
      />
      <View style={{ width: '100%' }}>
        <StackedBarChart
          spacingOuter={0.1}
          spacingInner={0.3}
          style={{ height: 200, width: '90%', marginLeft: 20 }}
          keys={keys}
          colors={colors}
          data={(mode === 'Daily' ? dayData : (mode === 'Weekly' ? weekData : monthData))}
          showGrid={false}
          contentInset={{ top: 30, bottom: 30 }}
        >
          <Grid />
        </StackedBarChart>
        {/* <XAxis
          style={{ marginHorizontal: -10, width: '85%', position: 'absolute', bottom: 0, right: 0, marginHorizontal: 20 }}
          data={dataX}
          formatLabel={(index) => {
            if (mode === 'Daily') {
              return dayData[index]?.count
            }
          }
          }
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 12, fontWeight: '700', fill: 'black' }}
        /> */}
        {/* <XAxis
          style={{ marginHorizontal: -10, width: '85%', bottom: 0, right: 0, marginHorizontal: 32, marginTop: 5, paddingHorizontal: 10 }}
          data={dayData}
          formatLabel={(index) => {
            if (mode === 'Daily') {
              return dayData[index]?.time
            }
          }}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 14, fontWeight: '700', fill: 'black' }}
        /> */}
      </View>
    </View>
  )
}
export default Chart

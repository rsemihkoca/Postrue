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
  const colors = ['#007AFF', '#2EAEC5']
  const dataKeys = ['apples', 'bananas']

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
          keys={dataKeys}
          colors={colors}
          data={data}
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
        <XAxis
          style={{ marginHorizontal: -10, width: '85%', bottom: 0, right: 0, marginHorizontal: 32, marginTop: 5, paddingHorizontal: 10 }}
          data={data}
          formatLabel={(index) => index + 1}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 14, fontWeight: '700', fill: 'black' }}
        />
      </View>
    </View>
  )
}
export default Chart

import { Dimensions } from "react-native"


export const getWidth = (number) => {
    let deviceWidth = Dimensions.get("window").width
    if (!number){
        return deviceWidth
    }

    let ratio = deviceWidth / 393

    return number * ratio

}

export const getHeight = (number) => {
    let deviceHeight = Dimensions.get("window").height

    if (!number){
        return deviceHeight
    }

    let ratio = deviceHeight / 852

    return number * ratio
}
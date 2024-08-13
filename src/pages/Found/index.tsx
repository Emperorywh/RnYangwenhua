import { useEffect } from "react";
import { Text, View } from "react-native";
import commonStyles from "../common/styles";
import HeaderTitleScan from "../../components/HeaderTitleScan";
/**
 * 发现
 * @returns 
 */
function Found() {

    return (
        <View style={[commonStyles.pageContainer]}>
            <HeaderTitleScan title="发现"></HeaderTitleScan>
        </View>
    );
}

export default Found;
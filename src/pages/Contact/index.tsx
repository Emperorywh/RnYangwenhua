import { useEffect } from "react";
import { Text, View } from "react-native";
import commonStyles from "../common/styles";
import HeaderTitleScan from "../../components/HeaderTitleScan";

/**
 * 通讯录
 * @returns 
 */
function Contact() {

    return (
        <View style={[commonStyles.pageContainer]}>
            <HeaderTitleScan title="通讯录"></HeaderTitleScan>
        </View>
    );
}

export default Contact;
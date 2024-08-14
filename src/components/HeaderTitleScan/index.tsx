import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { SvgXml } from "react-native-svg";
import icon from "../../icon";
import { IProps } from "./index.types";
import { useRecoilState } from "recoil";
import { showHeaderPopupState } from "../../store/headerPopUp";
import { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";

/**
 * 微信、通讯录、发现 通用顶部导航栏
 * @returns 
 */
function HeaderTitleScan(props: IProps) {
    const { title } = props;
    const navigation = useNavigation<NavigationProp<any>>();
    const [showHeaderPopup, setShowHeaderPopup] = useRecoilState(showHeaderPopupState);
    const [bottonPress, setBottonPress] = useState({
        isPress: false,
        pressIndex: -1
    });

    const onPressOut = () => {
        setBottonPress({ isPress: false, pressIndex: -1 });
        setShowHeaderPopup(false);
    }

    const onScanner = () => {
        navigation.navigate("Scanner", {
            onScanSuccess: (result: any) => {
                console.log("onScanSuccess", result)
            },
            onScanCancel: (result: any) => {
                console.log("onScanCancel", result)
            }
        });
    }

    return <View style={styles.container}>
        <View style={styles.headerCard}>
            <View>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
            <View style={styles.headerIcon}>
                <TouchableOpacity activeOpacity={1}>
                    <View style={styles.headerIconBox}>
                        <SvgXml width="20" height="20" xml={icon.Magnifying_Glass()} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => setShowHeaderPopup(prev => !prev)}>
                    <View style={styles.headerIconBox}>
                        <SvgXml width="22" height="22" xml={icon.Round_Plus()} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        {
            showHeaderPopup && <TouchableOpacity activeOpacity={1} style={styles.roundPlusCardBackGround} onPress={() => setShowHeaderPopup(prev => !prev)}>
                <View style={[styles.roundPlusCard]}>
                    <View style={styles.triangle}></View>
                    <View style={styles.roundPlusList}>
                        <TouchableOpacity activeOpacity={1} onPressIn={() => setBottonPress({ isPress: true, pressIndex: 0 })} onPressOut={onPressOut}>
                            <View style={[styles.roundPlusItem, bottonPress.isPress && bottonPress.pressIndex === 0 ? styles.roundPlusItemPressFirst : {}]}>
                                <SvgXml width="24" height="24" xml={icon.Chat_Active("#FFFFFF")} />
                                <View style={styles.roundPlusItemContent}>
                                    <Text style={styles.roundPlusItemText}>发起群聊</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPressIn={() => setBottonPress({ isPress: true, pressIndex: 1 })} onPressOut={onPressOut}>
                            <View style={[styles.roundPlusItem, bottonPress.isPress && bottonPress.pressIndex === 1 ? styles.roundPlusItemPress : {}]}>
                                <SvgXml width="24" height="24" xml={icon.Add_Friends("#FFFFFF")} />
                                <View style={styles.roundPlusItemContent}>
                                    <Text style={styles.roundPlusItemText}>添加朋友</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={onScanner} onPressIn={() => setBottonPress({ isPress: true, pressIndex: 2 })} onPressOut={onPressOut}>
                            <View style={[styles.roundPlusItem, bottonPress.isPress && bottonPress.pressIndex === 2 ? styles.roundPlusItemPressLast : {}]}>
                                <SvgXml width="24" height="24" xml={icon.Wechat_Scan("#FFFFFF")} />
                                <View style={styles.roundPlusItemContent}>
                                    <Text style={styles.roundPlusItemText}>扫一扫</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        }
    </View>
}

export default HeaderTitleScan;
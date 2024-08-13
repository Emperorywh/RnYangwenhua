import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { SvgXml } from "react-native-svg";
import icon from "../../icon";
import { IProps } from "./index.types";
import { useState } from "react";

/**
 * 微信、通讯录、发现 通用顶部导航栏
 * @returns 
 */
function HeaderTitleScan(props: IProps) {
    const { title } = props;
    const [showAbsolute, setShowAbsolute] = useState(false);
    return <View style={styles.container}>
        <View style={styles.headerCard}>
            <View>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
            <View style={styles.headerIcon}>
                <TouchableOpacity activeOpacity={1}>
                    <View style={styles.headerIconBox}>
                        <SvgXml width="20" color="#1A1A1A1" height="20" xml={icon.Magnifying_Glass()} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => setShowAbsolute(prev => !prev)}>
                    <View style={styles.headerIconBox}>
                        <SvgXml width="22" height="22" color="#1A1A1A1" xml={icon.Round_Plus()} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        {
            showAbsolute && <TouchableOpacity activeOpacity={1} style={styles.roundPlusCardBackGround} onPress={() => setShowAbsolute(prev => !prev)}>
                <View style={styles.roundPlusCard}>
                    <View style={styles.triangle}></View>
                    <View style={styles.roundPlusList}>
                        <TouchableOpacity>
                            <View style={styles.roundPlusItem}>
                                <SvgXml width="24" height="24" xml={icon.Chat_Active("#FFFFFF")} />
                                <View style={styles.roundPlusItemContent}>
                                    <Text style={styles.roundPlusItemText}>发起群聊</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.roundPlusItem}>
                            <SvgXml width="24" height="24" xml={icon.Add_Friends("#FFFFFF")} />
                            <View style={styles.roundPlusItemContent}>
                                <Text style={styles.roundPlusItemText}>添加朋友</Text>
                            </View>
                        </View>
                        <View style={styles.roundPlusItem}>
                            <SvgXml width="24" height="24" xml={icon.Wechat_Scan("#FFFFFF")} />
                            <View style={styles.roundPlusItemContent}>
                                <Text style={styles.roundPlusItemText}>扫一扫</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        }
    </View>
}

export default HeaderTitleScan;
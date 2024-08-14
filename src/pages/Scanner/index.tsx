import { Animated, Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { IProps, ScannerRouteProp } from "./index.types";
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera";
import { useEffect, useRef } from "react";
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from "react-native-svg";
import icon from "../../icon";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
/**
 * 扫描
 * @returns 
 */
function Scanner(props: IProps) {
    const { onScanSuccess, onScanCancel } = useRoute<ScannerRouteProp>()?.params || {};
    const navigation = useNavigation<NavigationProp<any>>();
    const { height } = Dimensions.get('window');
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');
    const scanLineAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    /**
     * 扫码结果
     */
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13', 'code-128'],
        onCodeScanned: (codes) => {
            if (Array.isArray(codes) && codes.length > 0) {
                if (onScanSuccess && typeof onScanSuccess === 'function') {
                    onScanSuccess(codes[0].value as string);
                    navigation.goBack();
                }
            }
        }
    });

    /**
     * 点击取消
     */
    const handleClose = () => {
        if (onScanCancel && typeof onScanCancel === 'function') {
            onScanCancel();
        }
        navigation.goBack();
    }

    const startScanAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(scanLineAnim, {
                        toValue: height * 0.5,
                        duration: 3000,
                        useNativeDriver: true,
                    }),
                    Animated.sequence([
                        Animated.timing(opacityAnim, {
                            toValue: 1,
                            duration: 2000,
                            useNativeDriver: true,
                        }),
                        Animated.timing(opacityAnim, {
                            toValue: 0,
                            duration: 1500,
                            useNativeDriver: true,
                        }),
                    ]),
                ]),
                Animated.timing(scanLineAnim, {
                    toValue: height * 0.5,
                    duration: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(scanLineAnim, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    useEffect(() => {
        requestPermission();
        startScanAnimation();
    }, [])

    if (!hasPermission) return <View style={styles.container}>
        <Text>无相机权限</Text>
    </View>

    if (device == null) return <View style={styles.container}>
        <Text>相机组件加载失败</Text>
    </View>

    return <View style={styles.container}>
        <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
        />
        <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
        />
        <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
            <SvgXml width="28" height="28" xml={icon.Round_Close()} />
        </TouchableOpacity>
        <View style={styles.overlay}>
            <Animated.View
                style={[
                    styles.scanLine,
                    {
                        transform: [{ translateY: scanLineAnim }],
                        opacity: opacityAnim,
                    },
                ]}
            >
                <LinearGradient
                    colors={['rgba(0, 255, 0, 0)', 'rgba(0, 255, 0, 0.5)']}
                    style={styles.shadow}
                />
            </Animated.View>
        </View>
    </View>
}

export default Scanner;
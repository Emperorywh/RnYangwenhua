import { Animated, Dimensions, Image, LayoutRectangle, StatusBar, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import styles from "./styles";
import { IProps, ScannerRouteProp } from "./index.types";
import { Camera, Code, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera";
import { useEffect, useRef, useState } from "react";
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
    const [layout, setLayout] = useState<LayoutRectangle | null>(null);
    const navigation = useNavigation<NavigationProp<any>>();
    const { height } = Dimensions.get('window');
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');
    const scanLineAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const camera = useRef<Camera>(null)
    const [isActive, setIsActive] = useState(true);
    const [codes, setCodes] = useState<Code[]>([]);
    const [photo, setPhoto] = useState<{
        height: number,
        width: number,
        path: string
    } | null>(null);
    /**
     * 扫码结果
     */
    const codeScanner = useCodeScanner({
        codeTypes: ['code-128', 'ean-13', 'qr'],
        onCodeScanned: async (codes) => {
            if (Array.isArray(codes) && codes.length > 0) {
                if (codes.length === 1) {
                    // if (onScanSuccess && typeof onScanSuccess === 'function') {
                    //     onScanSuccess(codes[0].value as string);
                    //     navigation.goBack();
                    // }
                } else if (codes.length > 1) {
                    if (photo) return;
                    try {
                        const photh = await camera.current?.takePhoto();
                        console.log("photh", JSON.stringify(photh))
                        if (photh) {
                            photh.path = `file://${photh.path}`;
                            console.log("codes", JSON.stringify(codes))
                            setPhoto(photh);
                            setIsActive(false);
                            setCodes(codes);
                        }
                    } catch (error) {
                        // console.error("生成照片出错: ", error);
                    }
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
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            codeScanner={codeScanner}
            photo={true}
            onLayout={e => {
                console.log("onLayout", e.nativeEvent.layout)
                setLayout(e.nativeEvent.layout)
            }}
            resizeMode="contain"
        />
        {
            isActive && <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
                <SvgXml width="28" height="28" xml={icon.Round_Close()} />
            </TouchableOpacity>
        }
        {
            isActive && <View style={styles.overlay}>
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
        }
        {
            !isActive && photo && <Image source={{ uri: photo.path }} resizeMode="contain" />
        }

        {
            codes.length > 0 && codes[0].corners?.map((item, index) => {
                return <View
                    key={index}
                    style={{
                        width: 5,
                        height: 5,
                        backgroundColor: 'red',
                        position: 'absolute',
                        top: item.y,
                        left: item.x
                    }}
                ></View>
            })
        }
    </View >
}

export default Scanner;
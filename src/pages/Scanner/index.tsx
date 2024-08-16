import { Animated, Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { ICenterPoint, IProps, ScannerRouteProp } from "./index.types";
import { Camera, Code, Point, useCameraDevice, useCameraFormat, useCameraPermission, useCodeScanner } from "react-native-vision-camera";
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
    const navigation = useNavigation<NavigationProp<any>>();
    const { height, width } = Dimensions.get('window');
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');
    const format = useCameraFormat(device, [
        { videoResolution: 'max' },
        { photoResolution: 'max' }
    ]);
    const scanLineAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const camera = useRef<Camera>(null);
    const [isActive, setIsActive] = useState(true);
    const [centerPoints, setCenterPoints] = useState<ICenterPoint[]>([]);
    const [photo, setPhoto] = useState<{
        height: number,
        width: number,
        path: string
    } | null>(null);
    /**
     * 扫码结果
     */
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'aztec', 'data-matrix', 'ean-13', 'ean-8', 'pdf-417', 'code-128', 'code-39', 'code-93', 'itf', 'upc-a', 'upc-e'],
        onCodeScanned: async (codes) => {
            if (Array.isArray(codes) && codes.length > 0) {
                if (codes.length === 1) {
                    handleScanSuccess(codes[0].value as string);
                } else if (codes.length > 1) {
                    if (photo) return;
                    try {
                        const photh = await camera.current?.takePhoto();
                        if (photh) {
                            photh.path = `file://${photh.path}`;
                            onFormatCenterPoints(codes);
                            setPhoto(photh);
                            setIsActive(false);
                        }
                    } catch (error) {
                        // console.error("生成照片出错: ", error);
                    }
                }
            }
        }
    });

    /**
     * 扫码成功
     * @param value 
     */
    const handleScanSuccess = (value: string) => {
        if (onScanSuccess && typeof onScanSuccess === 'function') {
            onScanSuccess(value);
            navigation.goBack();
        }
    }

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

    /**
     * 格式化中心坐标点
     * @param codes 
     */
    const onFormatCenterPoints = (codes: Code[]) => {
        if (Array.isArray(codes) && codes.length > 0) {
            const points: ICenterPoint[] = [];
            codes.forEach(item => {
                const point: ICenterPoint = {
                    x: 0,
                    y: 0,
                    value: item.value || '',
                    type: item.type
                }
                if (item.frame) {
                    const { width = 0, height = 0 } = item.frame;
                    if (item.corners) {
                        item.corners.forEach(corItem => {
                            corItem.y += height;
                            corItem.x -= width;
                        })
                    }
                }
                const center = calculateCenter(item.corners || []);
                point.x = center.x;
                point.y = center.y;
                points.push(point);
            });
            setCenterPoints(points);
        }
    }

    const calculateCenter = (points: Point[]) => {
        const totalPoints = points.length;
        const center = points.reduce((acc, point) => {
            acc.x += point.x;
            acc.y += point.y;
            return acc;
        }, { x: 0, y: 0 });
        center.x /= totalPoints;
        center.y /= totalPoints;
        return center;
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
            device={device}
            isActive={isActive}
            codeScanner={codeScanner}
            photo={true}
            style={StyleSheet.absoluteFill}
            format={format}
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
            !isActive && photo && <Image source={{ uri: photo.path }} />
        }
        {
            centerPoints.length > 0 && centerPoints.map((item, index) => {
                return <TouchableOpacity
                    key={index}
                    style={{
                        position: 'absolute',
                        top: item.y - 14,
                        left: item.x - 14,
                        backgroundColor: '#FFF',
                        borderRadius: 100,
                        width: 28,
                        height: 28
                    }}
                    onPress={() => handleScanSuccess(item.value)}
                >
                    <SvgXml width="28" height="28" xml={icon.Round_Arrow_Right()} />
                </TouchableOpacity>
            })
        }
    </View >
}

export default Scanner;
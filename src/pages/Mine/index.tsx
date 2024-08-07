import { Button, Toast } from "@ant-design/react-native";
import { View } from "react-native";
import CodePush from 'react-native-code-push';
function Mine() {
    const onCheck = () => {
        const key = Toast.loading({
            content: '正在检查更新....'
        });
        CodePush
            .checkForUpdate()
            .then(update => {
                Toast.remove(key);
                if (update) {
                    CodePush.sync(
                        {
                            updateDialog: {
                                mandatoryUpdateMessage: '必须安装的可用更新',
                                mandatoryContinueButtonLabel: '立即更新',
                                optionalIgnoreButtonLabel: '稍后再说',
                                optionalInstallButtonLabel: '立即更新',
                                optionalUpdateMessage: '发现新版本了，是否更新？',
                                title: '更新提示',
                            },
                            installMode: CodePush.InstallMode.ON_NEXT_RESTART,
                        },
                        status => {
                            switch (status) {
                                case CodePush.SyncStatus.UP_TO_DATE:
                                    Toast.info('当前已是最新版本!：' + status);
                                    break;
                                case CodePush.SyncStatus.SYNC_IN_PROGRESS:
                                    Toast.info('后台正在下载，请耐心等待!：' + status);
                                    break;
                                case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                                    Toast.info('正在检查更新，请稍后再试!：' + status);
                                    break;
                                case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                                    Toast.info('正在下载中……：' + status);
                                    break;
                                case CodePush.SyncStatus.INSTALLING_UPDATE:
                                    Toast.info('已安装更新内容，请重启应用！：' + status, 5);
                                    break;
                                case CodePush.SyncStatus.UNKNOWN_ERROR:
                                    Toast.info('更新遇到错误，请稍后再试!：' + status);
                                    break;
                                default:
                                    break;
                            }
                        },
                        progress => {
                            console.log(
                                'codepush-sync:' +
                                progress.receivedBytes +
                                ' of ' +
                                progress.totalBytes +
                                ' received.',
                            );
                        },
                    );
                } else {
                    Toast.info('update：' + update);
                }
            })
            .catch(err => {
                Toast.info('出错：' + JSON.stringify(err));
            });
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button style={{ marginVertical: 10 }} onPress={onCheck}>
                检查更新
            </Button>
        </View>
    );
}

export default Mine;
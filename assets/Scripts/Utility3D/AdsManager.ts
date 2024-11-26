
import { _decorator, Component, Node, sys } from 'cc';
import { SoundManager } from './SoundManager';
const { ccclass, property } = _decorator;


@ccclass('AdsManager')
export class AdsManager extends Component {


    protected onLoad(): void {

    }


    protected start(): void {
        window.gameReady && window.gameReady();
    }


    public installHandle(): void {
        console.log("install");

        SoundManager.Instance(SoundManager).theme.stop();
        window.gameEnd && window.gameEnd();

        //If ad network is tiktok
        if (typeof (playableSDK) != "undefined") {
            window.playableSDK.openAppStore();
            return;
        }

        // If ad network is google ads
        if (typeof (ExitApi) != "undefined") {
            ExitApi.exit();
            return;
        }

        // If ad netwrok is ironsources
        if (typeof (dapi) != "undefined") {
            dapi.openStoreUrl();
            return;
        }

        // If ad network support MRAID 2.0
        if (typeof (mraid) != "undefined") {
            if (sys.os == sys.OS_ANDROID || sys.os == sys.ANDROID) {
                mraid.open("https://play.google.com/store/apps/details?id=com.an.shootingball.billiards3d");
                return;
            }

            if (sys.os == sys.OS_IOS || sys.os == sys.IPHONE || sys.os == sys.IPAD) {
                mraid.open("https://itunes.apple.com/us/app/id6450196613?mt=8");
                return;
            }

            mraid.open("https://play.google.com/store/apps/details?id=com.an.shootingball.billiards3d");
            return;
        }
        // If ad network is mindwork. window alway avaiable so skip undefined check
        window.install && window.install();
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */

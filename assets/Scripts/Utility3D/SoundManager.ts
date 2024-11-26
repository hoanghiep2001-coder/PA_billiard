
import { _decorator, AudioClip, AudioSource, Component, log, Node } from 'cc';
import Singleton from './Singleton';
import { Constants } from './Constant';
import Global from './Global';
const { ccclass, property } = _decorator;


@ccclass('SoundManager')
export class SoundManager extends Singleton<SoundManager> {

    @property(AudioSource)
    theme: AudioSource = null;

    @property(AudioSource)
    hitBall: AudioSource = null;

    @property(AudioClip)
    hitBallClip: AudioClip = null;

    @property(AudioSource)
    adjustAngle: AudioSource = null;

    @property(AudioSource)
    hitPocket: AudioSource = null;

    @property(AudioClip)
    hitPocketClip: AudioClip = null;

    @property(AudioSource)
    winSound: AudioSource = null;


    constructor() {
        super();
        SoundManager._instance = this;
    }


    protected onLoad(): void {

    }


    PlaySound(stringAudioName: string) {

        if (!Constants.ironSource.SoundState) return;

        switch (stringAudioName) {
            case "HitBall":
                this.hitBall.playOneShot(this.hitBallClip);
                break;
            case "HitPocket":
                this.hitPocket.playOneShot(this.hitPocketClip);
                break;
                case "winSound":
                    this.winSound.play();
                    break;
        }
    }


    update(deltaTime: number) {
        if (Constants.ironSource.SoundState) {
            this.theme.volume = 0.5;
        } else {
            this.theme.volume = 0;
        }
    }
}
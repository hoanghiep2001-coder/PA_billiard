
import { _decorator, Animation, Color, Component, Director, log, Material, Node, ParticleSystem, RigidBody, Sprite, tween, Vec3 } from 'cc';
import Singleton from './Singleton';
import { Constants } from './Constant';
import EventManager from './Observer/EventManager';
import { Ball } from '../GamePlay/Ball';
import Global from './Global';
const { ccclass, property } = _decorator;


@ccclass('GameManager')
export class GameManager extends Singleton<GameManager> {

    constructor() {
        super();
        GameManager._instance = this;
    }

    @property([Node])
    Fx: Node[] = [];

    @property(Node)
    guide: Node = null;

    @property(Node)
    textPraise: Node = null;

    @property(Sprite)
    CTA: Sprite = null;

    @property(Node)
    btnAll: Node = null;

    protected onLoad(): void {
    }


    public handleMuteSoundIronSource(): void {
        Constants.ironSource.State = parseInt(localStorage.getItem("cocosSoundState"), 10)

        if (Constants.ironSource.State) {
            if (Constants.ironSource.State === 1 && !Constants.ironSource.SoundState && !Constants.ironSource.isEndGame) {
                Constants.ironSource.SoundState = true;
            }

            if (Constants.ironSource.State === 2 && Constants.ironSource.SoundState) {
                Constants.ironSource.SoundState = false;
            }
        }
    }


    ShowEndcard() {
        Global.endGame = true;
        tween(this.CTA)
            .to(1, { color: new Color(255, 255, 255, 255) })
            .call(() => {
                this.btnAll.active = true;
            })
            .start();
    }


    ActiveTextPraise() {
        if (Global.endGame) return;
        if (this.textPraise.active == true) return;
        this.textPraise.active = true;
        this.textPraise.getComponent(Animation).play("TextPraise");
    }


    public activeFx(hole: Node) {
        const parts = hole.name.split('_');
        const number = parts[1];

        const fx = this.Fx[Number(number) - 1];
        const otherFX = fx.children;

        fx.getComponent(ParticleSystem).play();
        otherFX.forEach((fx) => {
            fx.getComponent(ParticleSystem).play();
        });
    }


    protected start(): void {
        //  this.ShowEndcard();
    }



    protected lateUpdate(dt: number): void {
    }


    protected update(dt: number): void {
       // this.handleMuteSoundIronSource();
    }
}


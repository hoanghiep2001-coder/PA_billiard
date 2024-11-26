
import { _decorator, Component, log, Node, Quat, RigidBody, Vec3 } from 'cc';
import EventManager from '../Utility3D/Observer/EventManager';
import Global from '../Utility3D/Global';
import Utility from '../Utility3D/Utility';
import { DefaultBall } from './DefaultBall';
import { GameManager } from '../Utility3D/GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Cue
 * DateTime = Tue May 21 2024 16:34:37 GMT+0700 (Indochina Time)
 * Author = PhongDNRocket123
 * FileBasename = Cue.ts
 * FileBasenameNoExtension = Cue
 * URL = db://assets/Scripts/GamePlay/Cue.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('Cue')
export class Cue extends Component {

    @property(RigidBody)
    defaultBall: RigidBody = null;

    @property(Node)
    pointShoot: Node = null;

    @property(Node)
    checkPoint: Node = null;

    @property(Node)
    joystick: Node = null;

    @property(Node)
    line: Node = null;

    basePower: number = 250;
    boolStartShoot: Boolean = false;
    boolFirstShoot: Boolean = false;


    protected onEnable(): void {

    }


    protected start(): void {
        EventManager.instance.on(Global.StartShoot, this.StartShoot, this);
        EventManager.instance.on(Global.ResetGame, this.ResetCue, this);
    }


    shootCount: number = 0;
    StartShoot(power: number) {
        if (Global.endGame) return;
        
        this.shootCount += 1;

        GameManager.Instance(GameManager).guide.active = false;

        this.defaultBall.getComponent(DefaultBall).prePos = this.defaultBall.node.getWorldPosition();
        this.node.children[0].children[0].active = false;
        this.joystick.active = false;
        this.line.active = false;
        var dir = this.pointShoot.getWorldPosition().subtract(this.defaultBall.node.getWorldPosition()).normalize();
        dir.y = 0;
        dir = dir.normalize();
        this.defaultBall.applyForce(dir.multiplyScalar(this.basePower * power), this.defaultBall.node.getPosition());
        this.basePower = 100;

        this.scheduleOnce(() => {
            this.boolFirstShoot = true;
            this.boolStartShoot = true;
            Global.startingShoot = true;
        }, 0.1);
    }

    countToEndcard: number = 0;


    SetPos() {
        this.countToEndcard += 1;
        if (this.countToEndcard == 5) {
            GameManager.Instance(GameManager).btnAll.active = true;
            //   Global.endGame = true;
        }
        Global.startingShoot = false;
        Global.firstShoot = true;

        this.line.active = true;
        this.node.setPosition(new Vec3(-0.155, 0, 0));
        this.node.children[0].children[0].active = true;
        this.node.parent.setWorldPosition(this.defaultBall.node.getWorldPosition());
        this.joystick.active = true;
        if (!Global.isDefaultBallFall) {
            this.node.parent.setRotationFromEuler(0, Utility.RandomRangeFloat(-30, 30), 1);
        }
        Global.isDefaultBallFall = false;
    }


    protected update(dt: number): void {
        if (Global.endGame) return;
        //log("joystick3 " + this.node.parent.getWorldPosition().x);
        //  log("ball " + this.defaultBall.node.getWorldPosition());
        //  log("cue " + this.node.children[0].children[0].getPosition());

        if (!this.defaultBall.node.getComponent(DefaultBall).checkMoving() && this.boolFirstShoot) {
            if (this.boolStartShoot) {
                this.boolStartShoot = false;
                this.SetPos();
                // this.scheduleOnce(() => {
                // }, 1);
            }
            //log("notmoving");
        }
    }


    ResetCue() {
        if (this.shootCount <= 1) {
            this.shootCount = 0;
            Global.firstShoot = false;
            Global.startingShoot = false;
            this.basePower = 250;
        }
        this.checkPoint.active = true;
        //this.basePower = 200;
        this.boolStartShoot = false;
        this.boolFirstShoot = false;
        Global.startingShoot = false;
        this.line.active = true;
        this.node.parent.setWorldRotationFromEuler(0, 0, 0);
        this.node.setPosition(new Vec3(-0.155, 0, 0));
        this.node.children[0].children[0].active = true;
        this.node.parent.setWorldPosition(this.defaultBall.node.getWorldPosition());
        this.joystick.active = true;
        this.unscheduleAllCallbacks();
    }


}



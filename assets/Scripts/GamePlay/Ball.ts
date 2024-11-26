
import { _decorator, Collider, Component, Director, game, ICollisionEvent, ITriggerEvent, Layers, log, math, Node, physics, RigidBody, SphereCollider, tween, Vec3 } from 'cc';
import EventManager from '../Utility3D/Observer/EventManager';
import Global from '../Utility3D/Global';
import { GameManager } from '../Utility3D/GameManager';
import { SoundManager } from '../Utility3D/SoundManager';
const { ccclass, property } = _decorator;


@ccclass('Ball')
export class Ball extends Component {

    @property(RigidBody)
    rb: RigidBody = null;

    @property(Node)
    shadow: Node = null;

    collider: Collider = null;

    ballUI: Node = null;

    indexBall: number = null;

    prePos: Vec3 = Vec3.ZERO;


    protected onEnable(): void {
        this.prePos = this.node.getPosition();
        EventManager.instance.on(Global.ActiveRb, this.ActiveRb, this);
        EventManager.instance.on(Global.ResetGame, this.ResetBall, this);
        this.rb.useCCD = true;
        this.collider = this.node.getComponent(SphereCollider);
        this.collider.on('onTriggerEnter', this.onTriggerEnter, this);
        this.collider.on('onCollisionEnter', this.onCollisionEnter, this);

        this.Init();
    }


    protected start(): void {

    }


    Init(): void {
        this.indexBall = Number(this.getCurrentBallNumber(this.node.name)) - 1;
        this.ballUI = this.node.getChildByName("Ball");
    }


    private getCurrentBallNumber(str: string): string {
        const parts = str.split('_');
        const number = parts[1];

        return number;
    }


    ActiveRb() {
        this.rb.type = RigidBody.Type.DYNAMIC;
        this.rb.useCCD = true;
        this.rb.linearFactor = new Vec3(1, 1, 1);
        this.rb.angularFactor = new Vec3(1, 1, 1);
        this.rb.angularDamping = 0.7;
        this.rb.linearDamping = 0.2;
        this.rb.useGravity = true;
    }


    protected onCollisionEnter(event: ICollisionEvent) {
        const otherCollider = event.otherCollider;
        if (event.type === 'onCollisionEnter') {

            if (otherCollider.getGroup() === 2) {
                // if(!Global.firstShoot) return;
                SoundManager.Instance(SoundManager).PlaySound("HitBall");
                // log("clear force");
                // this.rb.clearForces();
            }
            if (otherCollider.getGroup() === 8) {
                //   SoundManager.Instance(SoundManager).PlaySound("HitEdge");
                //   log("clear force");
                //this.rb.clearForces();
            }
            //  log("clear force");
        }
    }


    protected onTriggerEnter(event: ITriggerEvent) {
        const otherTrigger = event.otherCollider;

        if (event.type === 'onTriggerEnter') {
            //    log(this.node.name + " trigger " + otherTrigger.node.name);
            if (otherTrigger.getGroup() === 8) {
                SoundManager.Instance(SoundManager).PlaySound("HitPocket");
                SoundManager.Instance(SoundManager).PlaySound("winSound");

                this.rb.enabled = false;
                this.RollIOnHole(otherTrigger.node);
            }
        }
    }

    boolOnHole: boolean = false;
    RollIOnHole(hole: Node) {
        if (this.boolOnHole) return;
        this.boolOnHole = true;
        this.rb.clearVelocity();
        tween(this.node)
            .to(0.08, { position: hole.getWorldPosition() })
            .call(() => {
                if (this.ballUI) {
                    this.ballUI.active = false;
                }
                this.node.active = false;
                this.collider.enabled = false;

                GameManager.Instance(GameManager).ActiveTextPraise();
                GameManager.Instance(GameManager).activeFx(hole);
                EventManager.instance.emit(Global.SpawnPotedBall, this.indexBall);
            })
            .start();
    }


    public ResetBall() {
        if (this.boolOnHole) return;
        if (Global.firstShoot) return;
        this.node.setWorldPosition(this.prePos);
        this.node.setRotationFromEuler(90, 90, 0);
        this.rb.type = RigidBody.Type.KINEMATIC;
        this.rb.useGravity = false;
        this.rb.enabled = true;
        this.collider.enabled = true;

    }


    protected update(dt: number): void {
        this.CalculateShadow();
    }


    CalculateShadow() {
        this.shadow.setWorldRotationFromEuler(-90, 0, 0);
    }


}



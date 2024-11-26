import { _decorator, Collider, Component, ICollisionEvent, ITriggerEvent, log, Node, RigidBody, SphereCollider, Vec3 } from 'cc';
import { Ball } from './Ball';
import EventManager from '../Utility3D/Observer/EventManager';
import Global from '../Utility3D/Global';
import { SoundManager } from '../Utility3D/SoundManager';
const { ccclass, property } = _decorator;


@ccclass('DefaultBall')
export class DefaultBall extends Ball {

    prePos: Vec3 = Vec3.ZERO;
    lastPos: Vec3 = Vec3.ZERO;

    // rb: RigidBody = null;


    protected onEnable(): void {
        this.prePos = this.node.getPosition();
        // log(this.prePos);
        this.lastPos = this.prePos;
        EventManager.instance.on(Global.ActiveRb, this.ActiveRb, this);
        EventManager.instance.on(Global.ResetGame, this.ResetThisBall, this);
        this.prePos = this.node.getPosition();
        this.rb.useCCD = true;
        this.collider = this.node.getComponent(SphereCollider);
        this.collider.on('onCollisionEnter', this.onCollisionEnter, this);
        this.collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }


    protected onTriggerEnter(event: ITriggerEvent) {
        const otherTrigger = event.otherCollider;

        if (event.type === 'onTriggerEnter') {

            if (otherTrigger.getGroup() === 32) {
                EventManager.instance.emit(Global.ActiveRb);
                otherTrigger.node.active = false;
            }


            if (otherTrigger.getGroup() === 8) {
                Global.isDefaultBallFall = true;

                this.node.active = false;
                this.collider.enabled = false;
                this.scheduleOnce(() => {
                    EventManager.instance.emit(Global.ResetGame);
                }, 0.25);
            }
        }
    }


    checkMoving() {
         let linearVelocity: Vec3 = new Vec3();
        this.rb.getLinearVelocity(linearVelocity);

        // if (this.lastPos.clone().subtract(this.node.position.clone()).normalize().length() > 0) {
        //     this.lastPos = this.node.getPosition();
        //     return true;
        // }
        // return false;

        if (linearVelocity.length() > 0) {
            log("moving")
            return true;
        }
        return false;
    }


    protected update(dt: number): void {
        this.CalculateShadow();
    }


    protected onCollisionEnter(event: ICollisionEvent) {
        const otherCollider = event.otherCollider;
        if (event.type === 'onCollisionEnter') {
            //this.rb.clearForces();
            if (otherCollider.getGroup() === 2) {
                SoundManager.Instance(SoundManager).PlaySound("HitBall");
                this.rb.clearForces();
            }
            if (otherCollider.getGroup() === 8) {
                SoundManager.Instance(SoundManager).PlaySound("HitEdge");
            }
        }
    }


    ResetThisBall(): void {
        this.node.setPosition(this.prePos);
        this.node.active = true;
        this.collider.enabled = true;
    }


    public ResetBall(): void {

    }

}



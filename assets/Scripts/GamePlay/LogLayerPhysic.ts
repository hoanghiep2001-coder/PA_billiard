
import { _decorator, Collider, Component, log, Node, RigidBody, SphereCollider } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = LogLayerPhysic
 * DateTime = Tue May 21 2024 16:53:01 GMT+0700 (Indochina Time)
 * Author = PhongDNRocket123
 * FileBasename = LogLayerPhysic.ts
 * FileBasenameNoExtension = LogLayerPhysic
 * URL = db://assets/Scripts/GamePlay/LogLayerPhysic.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('LogLayerPhysic')
export class LogLayerPhysic extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start() {
        log(this.node.name + " " + this.node.getComponent(RigidBody).group);
        log(this.node.name + " " + this.node.getComponent(SphereCollider).isTrigger);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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

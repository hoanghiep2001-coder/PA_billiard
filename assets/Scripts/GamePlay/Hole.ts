
import { _decorator, Component, ITriggerEvent, log, Node, SphereCollider } from 'cc';
import EventManager from '../Utility3D/Observer/EventManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Hole
 * DateTime = Wed May 22 2024 11:13:34 GMT+0700 (Indochina Time)
 * Author = PhongDNRocket123
 * FileBasename = Hole.ts
 * FileBasenameNoExtension = Hole
 * URL = db://assets/Scripts/GamePlay/Hole.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('Hole')
export class Hole extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start() {
        let collider = this.node.getComponent(SphereCollider);
        collider.on('onTriggerStay', this.onTriggerStay, this);
    }

    protected onTriggerStay(event: ITriggerEvent) {
        const otherTrigger = event.otherCollider;

        if (event.type === 'onTriggerStay') {

            if (otherTrigger.getGroup() === 2) {
                console.log(this.node.name + 'Trigger detected with target layer! ' + otherTrigger.node.name);
            }
        }
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

import { Component, PhysicsSystem, _decorator } from "cc";
const { ccclass, property } = _decorator;

@ccclass
export default class EnableEngine extends Component {

    
    onLoad() {
        PhysicsSystem.instance.enable = true;
        //cc.director.getPhysicsManager().enabled = true;
    }
    // onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    //     // This function is called when a collision begins
    //     console.log('Collision began');
    //     // You can access properties of the colliding nodes and perform actions accordingly
    // }

    // onCollisionStay(other: cc.Collider, self: cc.Collider) {
    //     // This function is called while a collision is ongoing
    //     console.log('Collision ongoing');
    //     // You can perform continuous actions while the collision persists
    // }

    // onCollisionExit(other: cc.Collider, self: cc.Collider) {
    //     // This function is called when a collision ends
    //     console.log('Collision ended');
    //     // You can perform cleanup or additional actions when the collision ends
    // }
}


import { _decorator, Component, Node, RigidBody } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('ActiveCCD')
export class ActiveCCD extends Component {

    start() {
        this.node.getComponent(RigidBody).useCCD = true;
    }

}

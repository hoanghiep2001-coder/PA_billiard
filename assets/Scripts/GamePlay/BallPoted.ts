
import { _decorator, Component, instantiate, log, Node, Prefab, RigidBody, Vec3 } from 'cc';
import EventManager from '../Utility3D/Observer/EventManager';
import Global from '../Utility3D/Global';
import { GameManager } from '../Utility3D/GameManager';
const { ccclass, property } = _decorator;


@ccclass('BallPoted')
export class BallPoted extends Component {

    @property(Prefab)
    ballPrefabs: Prefab[] = [];

    @property(Node)
    holder: Node = null;

    boolIsSpawn: boolean = false;

    count = 0;

    SpawnPotedBall(index: number) {
        // if (Global.firstShoot) {
        //     GameManager.Instance(GameManager).ShowEndcard();
        //    // log("endgame");
        // }

        if (this.boolIsSpawn) {
            this.count += 1;
            this.scheduleOnce(() => {
                this.SpawnPotedBall(index);
            }, this.count * 0.5)
            return;
        }
        
        this.boolIsSpawn = true;
        var ball = instantiate(this.ballPrefabs[index]);
        this.holder.addChild(ball);
        ball.setPosition(Vec3.ZERO);
        ball.getComponent(RigidBody).applyForce(new Vec3(50, 0, 0), ball.getPosition());
        this.scheduleOnce(() => {
            this.boolIsSpawn = false;
        }, 1);
    }


    start() {
        EventManager.instance.on(Global.SpawnPotedBall, this.SpawnPotedBall, this);
    }


}



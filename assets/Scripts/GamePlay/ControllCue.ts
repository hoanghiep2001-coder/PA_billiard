import { Node, EventTouch, _decorator, Component, misc, log } from "cc";
import EventManager from "../Utility3D/Observer/EventManager";
import Global from "../Utility3D/Global";
import { GameManager } from "../Utility3D/GameManager";

const { ccclass, property } = _decorator;

@ccclass('ControllCue')
export default class ControllCue extends Component {

    @property(Node)
    cueUI: Node = null;

    @property(Node)
    cue: Node = null;

    @property(Node)
    guide: Node = null;

    private isDragging: boolean = false;
    private startY: number = 0;
    private startYCueUIPos: number = 0;
    private startXCuePos: number = 0;
    private power: number = 0;

    
    protected onEnable(): void {
        this.onRegisterEvent();
    }


    onRegisterEvent() {
        this.node.on(Node.EventType.TOUCH_START, this.onMouseDown, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onMouseMove, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onMouseUp, this);
        this.node.on(Node.EventType.TOUCH_END, this.onMouseUp, this);
    }


    onMouseDown(event: EventTouch) {
        if (Global.startingShoot) return;
        this.guide.active = false;
        Global.touchPowerBar = true;
        this.isDragging = true;
        this.startY = event.getLocationY();
        this.startYCueUIPos = this.cueUI.position.y;
        this.startXCuePos = this.cue.position.x;
    }


    onMouseMove(event: EventTouch) {
        if (Global.endGame) return;
        if (Global.startingShoot) return;
        if (!this.isDragging) return;
        let delta = event.getLocationY() - this.startY;
        delta *= 1.1;
        if (delta < 0) {
            this.power = Math.abs(delta / 407.954);

        } else {
            this.power = 0;
        }
        if (this.power == 0) return;
        this.power = this.power <= 0.1 ? 0.1 : this.power;
        this.power = this.power >= 1 ? 1 : this.power;
        let newY = this.startYCueUIPos + delta;
        newY = misc.clampf(newY, -418, -10.046);
        this.cueUI.setPosition(0, newY, 0);


        let newX = this.startXCuePos + delta * 0.00037994386;
        newX = misc.clampf(newX, -0.310, -0.155);
        this.cue.setPosition(newX, 0, 0);
    }


    boolFirstShoot: boolean = false;
    onMouseUp(event: EventTouch) {
        
        if (Global.startingShoot) return;
        this.isDragging = false;
        if (this.power != 0)
            EventManager.instance.emit(Global.StartShoot, this.power);
        
        Global.shootCount -= 1;
        
        if(Global.shootCount <= 0) {
            Global.isToStore = true;
            GameManager.Instance(GameManager).ShowEndcard();
        }
        
        this.cueUI.setPosition(0, -10.046, 0);
        this.power = 0;
        Global.touchPowerBar = false;

        log("Shoot!");
    }
}


import { _decorator, Camera, Canvas, Component, Director, EventMouse, EventTouch, game, screen, Game, log, macro, Mat4, math, misc, Node, Quat, UITransform, Vec2, Vec3, view } from 'cc';
import Global from '../Utility3D/Global';
import { SoundManager } from '../Utility3D/SoundManager';
import { Constants } from '../Utility3D/Constant';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Joystick
 * DateTime = Wed May 22 2024 14:20:42 GMT+0700 (Indochina Time)
 * Author = PhongDNRocket123
 * FileBasename = Joystick.ts
 * FileBasenameNoExtension = Joystick
 * URL = db://assets/Scripts/GamePlay/Joystick.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('Joystick')
export class Joystick extends Component {

    @property(Node)
    targetNode: Node = null!;

    @property(Node)
    ball: Node = null!;

    @property(Camera)
    mainCam: Camera = null!;

    @property(Node)
    guide: Node = null;

    startPos: Vec2 = Vec2.ZERO;
    private isRotating: boolean = false;
    speedRotation: number = 1;


    direction1: Vec2 = Vec2.ZERO;
    direction2: Vec2 = Vec2.ZERO;

    mag1: number = 0;
    mag2: number = 0;
    start() {
        this.node.on(Node.EventType.TOUCH_START, this.onMouseDown, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onMouseMove, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onMouseUp, this);
        this.node.on(Node.EventType.TOUCH_END, this.onMouseUp, this);


    }

    boolFirstMove: boolean = false;


    onMouseDown(event: EventTouch) {
        if (Global.touchPowerBar) return;
        this.guide.active = false
        this.isRotating = true;
        this.startPos = event.getLocation();
    }

    onMouseUp() {
        this.isRotating = false;
        this.unscheduleAllCallbacks();
        this.boolCanPlaySound = true;
    }
    boolCanPlaySound: boolean = true;


    onMouseMove(event: EventTouch) {
        if (Global.endGame) return;

        if (Global.touchPowerBar) return;
        if (this.isRotating) {
            while (this.boolCanPlaySound) {
                if (Constants.ironSource.SoundState) {
                    SoundManager.Instance(SoundManager).adjustAngle.play();
                }
                this.boolCanPlaySound = false;
                this.scheduleOnce(() => {
                    this.boolCanPlaySound = true;
                }, 0.5);
            }

            this.direction1 = Vec2.subtract(new Vec2(), this.startPos, this.vectorOrigin);

            let currentPos = event.getLocation();
            this.direction2 = Vec2.subtract(new Vec2(), currentPos, this.vectorOrigin);
            //log(this.direction2);

            let angle1 = Math.atan2(this.direction1.y, this.direction1.x);
            let angle2 = Math.atan2(this.direction2.y, this.direction2.x);
    
            let angleBetween = angle2 - angle1;
    
            if (angleBetween > Math.PI) {
                angleBetween -= 2 * Math.PI;
            } else if (angleBetween < -Math.PI) {
                angleBetween += 2 * Math.PI;
            }
         
            this.rotateNodeAroundY(this.targetNode, angleBetween);
            this.startPos = currentPos;
        }

    }

    // Phương thức xoay node quanh trục Y
    rotateNodeAroundY(node: Node, angle: number) {
        let axis = new Vec3(0, 1, 0); // Trục Y

        // Tính toán ma trận quay từ trục và góc xoay
        let rotationQuat = new Quat();
        Quat.fromAxisAngle(rotationQuat, axis, angle);

        // Áp dụng ma trận quay vào node
        let rotation = node.rotation.clone();
        Quat.multiply(rotation, rotation, rotationQuat);
        node.rotation = rotation;
        //   node.rotate(rotationQuat, Node.NodeSpace.WORLD);
    }


    vectorOrigin: Vec2 = Vec2.ZERO;
    protected update(dt: number): void {
        this.vectorOrigin = new Vec2(screen.windowSize.width / 2, screen.windowSize.height / 2);
        //log(this.vectorOrigin);
    }

}

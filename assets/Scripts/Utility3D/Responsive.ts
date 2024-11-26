import { Camera, Component, Node, Quat, Vec3, Widget, _decorator, log, screen, view } from "cc";
const { ccclass, property } = _decorator;



@ccclass
export default class Responsive extends Component {

    // Component
    @property(Camera)
    cam: Camera = null;

    @property(Node)
    topUI: Node = null;

    @property(Node)
    powerBar: Node = null;

    @property(Node)
    guide: Node = null;

    @property(Node)
    shootingTurn: Node = null;

    @property(Node)
    lineGuide: Node = null;

    @property(Node)
    textPraise: Node = null;

    @property(Node)
    Table: Node = null;

    @property(Node)
    Joystick: Node = null;

    @property(Node)
    BallHolder: Node = null;

    @property(Node)
    CTA: Node = null;

    device: string = "";
    isRotate: boolean = false;

    HORIZONTAL_IPX: string = "horizontal_IPX";
    HORIZONTAL_TABLET: string = "horizontal_Tablet";
    VERTICAL_IPX: string = "vertical_IPX";
    VERTICAL_MOBILE: string = "vertical_Mobile";


    protected start(): void {
        this.handleRotate();
    }


    private handleRotate(): void {
        if (screen.windowSize.width > screen.windowSize.height) {
            this.isRotate = true;
            this.setHorizontal();
        } else {
            this.isRotate = false;
            this.setVertical();
        }
    }


    private setHorizontal(): void {
        if (screen.windowSize.height / screen.windowSize.width < 0.65) {
            // Iphone 6 / 6 plus / 7 / 7 Plus / X
            this.setHorizontalForIpX();
        } else {
            this.setHorizontalForTablet();
        }
    }


    private setHorizontalForIpX(): void {
        if (this.HORIZONTAL_IPX === this.device) {
            return;
        }
        log("hr ipx");
        this.device = this.HORIZONTAL_IPX;

        this.cam.node.setPosition(0, 2.23, 0);

        this.lineGuide.setScale(new Vec3(1.1, 1, 1));

        this.cam.node.setRotationFromEuler(-90, 0, 0);
        this.cam.fov = 30;
        this.topUI.setScale(new Vec3(0.5, 0.5, 0.5));
        this.powerBar.setScale(new Vec3(1, 1, 1));
        this.guide.setScale(new Vec3(0.5, 0.5, 0.5));
        this.textPraise.setScale(new Vec3(0.5, 0.5, 0.5));
        this.CTA.setScale(new Vec3(0.45, 0.45, 0.45));

        this.Table.setPosition(-0.063, 0, 0);
        this.Joystick.setPosition(-0.53, 0.033, 0);
        this.BallHolder.setPosition(-0.063, 0, 0);

        this.guide.setPosition(0, 727.045, 0);
        this.guide.getComponent(Widget).top = 182.955;

        this.shootingTurn.setPosition(0, -225, 0);
        this.shootingTurn.setScale(0.5, 0.5, 1);
    }


    private setHorizontalForTablet(): void {
        if (this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.lineGuide.setScale(new Vec3(1, 1, 1));

        this.Table.setPosition(-0.063, 0, 0);
        this.Joystick.setPosition(-0.53, 0.033, 0);
        this.BallHolder.setPosition(-0.063, 0, 0);

        this.guide.setPosition(0, 727.045, 0);
        this.guide.getComponent(Widget).top = 182.955;

        if (screen.windowSize.width / screen.windowSize.height < 0.7) {
            log("hr ip 6");

            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.cam.node.setPosition(0, 2.23, 0);

            this.cam.node.setRotationFromEuler(-90, 0, -0.1);
            this.cam.fov = 35;
            this.topUI.setScale(new Vec3(0.6, 0.6, 0.6));
            this.powerBar.setScale(new Vec3(1, 1, 1));
            this.guide.setScale(new Vec3(0.5, 0.5, 0.5));
            this.textPraise.setScale(new Vec3(0.5, 0.5, 0.5));
            this.CTA.setScale(new Vec3(0.45, 0.45, 0.45));

        } else {

            log("hr ipad");
            this.cam.node.setPosition(0, 2.23, 0);

            this.cam.node.setRotationFromEuler(-90, 0, 0);
            this.cam.fov = 40;
            this.topUI.setScale(new Vec3(0.8, 0.8, 0.8));
            this.powerBar.setScale(new Vec3(1, 1, 1));
            // Ipad
            this.guide.setScale(new Vec3(0.5, 0.5, 0.5));
            this.textPraise.setScale(new Vec3(0.5, 0.5, 0.5));
            this.CTA.setScale(new Vec3(0.45, 0.45, 0.45));
        }

        this.shootingTurn.setPosition(0, -800, 0);
        this.shootingTurn.setScale(1, 1, 1);

        this.device = this.HORIZONTAL_TABLET;

    }


    private setVertical(): void {
        if (screen.windowSize.width / screen.windowSize.height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        if (this.VERTICAL_IPX === this.device) {
            return;
        }

        log("vt ipx");
        this.cam.node.setPosition(0, 2.23, 0);
        this.guide.setScale(new Vec3(1, 1, 1));
        this.textPraise.setScale(new Vec3(1, 1, 1));
        this.CTA.setScale(new Vec3(1, 1, 1));

        this.lineGuide.setScale(new Vec3(0.6, 1, 1));

        this.cam.node.setRotationFromEuler(-90, -90, 0);
        this.cam.fov = 60;
        this.topUI.setScale(new Vec3(0.8, 0.8, 0.8));
        this.powerBar.setScale(new Vec3(2, 2, 2));

        this.device = this.VERTICAL_IPX;

        this.Table.setPosition(-0.129, 0, -0.072);
        this.Joystick.setPosition(-0.599, 0.033, -0.072);
        this.BallHolder.setPosition(-0.129, 0, -0.072);

        this.guide.setPosition(0, 0, 0);
        this.guide.getComponent(Widget).top = 910;

        this.shootingTurn.setPosition(0, 0, 0);
        this.shootingTurn.setScale(1, 1, 1);
    }

    private setMobile(): void {
        if (this.VERTICAL_MOBILE === this.device) {
            return;
        }

        this.device = this.VERTICAL_MOBILE;

        this.guide.setPosition(0, 0, 0);
        this.guide.getComponent(Widget).top = 910;

        this.Table.setPosition(-0.129, 0, -0.072);
        this.Joystick.setPosition(-0.599, 0.033, -0.072);
        this.BallHolder.setPosition(-0.129, 0, -0.072);

        this.guide.setPosition(0, 0, 0);
        this.guide.getComponent(Widget).top = 910;

        if (screen.windowSize.width / screen.windowSize.height < 0.7) {
            log("vt ip 6");

            this.cam.node.setRotationFromEuler(-90, -90, 0);
            this.cam.node.setPosition(0, 2.23, 0);
            this.guide.setScale(new Vec3(1, 1, 1));
            this.textPraise.setScale(new Vec3(1, 1, 1));
            this.CTA.setScale(new Vec3(1, 1, 1));

            this.lineGuide.setScale(new Vec3(0.6, 1, 1));

            this.cam.fov = 55;
            this.topUI.setScale(new Vec3(0.8, 0.8, 0.8));
            this.powerBar.setScale(new Vec3(2, 2, 2));
            // Iphone 6 / 6 plus / 7 / 7 Plus

        } else {
            log("vt ipad");
            this.CTA.setScale(new Vec3(1, 1, 1));

            this.lineGuide.setScale(new Vec3(0.6, 1, 1));

            this.cam.node.setRotationFromEuler(-90, -90, 0);
            this.cam.node.setPosition(0.15, 2.23, 0);
            this.cam.fov = 50;
            this.textPraise.setScale(new Vec3(1, 1, 1));
            this.topUI.setScale(new Vec3(0.8, 0.8, 0.8));
            this.powerBar.setScale(new Vec3(2, 2, 2));
            this.guide.setScale(new Vec3(1, 1, 1));
            // Ipad
        }

        this.shootingTurn.setPosition(0, 0, 0);
        this.shootingTurn.setScale(1, 1, 1);
    }


    protected update(dt: number): void {
        this.handleRotate();
    }

}

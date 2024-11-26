
import { _decorator, Color, Component, geometry, gfx, Graphics, LineComponent, log, Material, math, misc, ModelComponent, Node, PhysicsSystem, Vec3 } from 'cc';
import Global from '../Utility3D/Global';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = RaycastShootPoint
 * DateTime = Thu May 23 2024 08:34:54 GMT+0700 (Indochina Time)
 * Author = PhongDNRocket123
 * FileBasename = RaycastShootPoint.ts
 * FileBasenameNoExtension = RaycastShootPoint
 * URL = db://assets/Scripts/GamePlay/RaycastShootPoint.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('RaycastShootPoint')
export class RaycastShootPoint extends Component {
    @property(Node)
    line: Node = null;

    @property(Node)
    circle: Node = null;

    @property(Node)
    out: Node = null;

    @property(Node)
    in: Node = null;

    @property(Node)
    originRay: Node = null;

    @property(Node)
    targetRay: Node = null;

    @property(Node)
    originRayLeft: Node = null;

    @property(Node)
    targetRayLeft: Node = null;

    @property(Node)
    originRayRight: Node = null;

    @property(Node)
    targetRayRight: Node = null;


    distance: number = 0;
    target: Node = null;
    hitPoint: Vec3 = Vec3.ZERO;

    targetCenter: Node = null;
    targetLeft: Node = null;
    targetRight: Node = null;


    hitPointCenter: Vec3 = Vec3.ZERO;
    hitPointLeft: Vec3 = Vec3.ZERO;
    hitPointRight: Vec3 = Vec3.ZERO;

    distanceCenter: number = 0;
    distanceLeft: number = 0;
    distanceRight: number = 0;


    protected start(): void {
    }

    update(deltaTime: number) {
        if(Global.endGame) return;

        //  log(this.originRayLeft.getWorldPosition());
        this.RaycastLeft();
        this.Raycast();
        this.RaycastRight();
        this.CalculateLine();
    }
    RaycastLeft() {
        const outRay = new geometry.Ray();
        geometry.Ray.fromPoints(outRay, this.originRayLeft.getWorldPosition(), this.targetRayLeft.getWorldPosition());

        const mask = (1 << 1) + (1 << 2) + (1 << 3);
        // const mask = 0xffffffff;
        const maxDistance = 10000000;
        const queryTrigger = false;

        if (PhysicsSystem.instance.raycastClosest(outRay, mask, maxDistance, queryTrigger)) {
            const raycastClosestResult = PhysicsSystem.instance.raycastClosestResult;
            this.distanceLeft = raycastClosestResult.distance;

            // log(raycastClosestResult.collider.node.name + " " + raycastClosestResult.hitPoint);
            //log("left " + this.distanceLeft);

            // log(raycastClosestResult.hitNormal);
            //  log(this.distance);
            // this.line.setWorldScale(0.48 * this.distance / 0.512, 0.02, 1);
            //ball
            if (raycastClosestResult.collider.node.layer == 2) {
                this.targetLeft = raycastClosestResult.collider.node;
                // log(this.targetLeft.name);
                this.out.active = false;
                this.in.active = false;
            }
            //wall            
            else {
                this.targetLeft = null;
                this.out.active = false;
                this.in.active = false;
            }
            this.hitPointLeft = raycastClosestResult.hitPoint.clone();
            //  log("left " + this.hitPointLeft);

            //   log(this.hitPointLeft);
            // // calcultate  angle
            // if (this.target) {
            //     this.in.setWorldPosition(this.target.getWorldPosition());
            //     // log(this.target.name);

            //     const startPoint = raycastClosestResult.hitPoint.x <= this.target.getWorldPosition().x ? raycastClosestResult.hitPoint : this.target.getWorldPosition();
            //     const endPoint = raycastClosestResult.hitPoint.x >= this.target.getWorldPosition().x ? raycastClosestResult.hitPoint : this.target.getWorldPosition();
            //     const angleOut = this.calculateAngleBetweenPoints(startPoint, endPoint);

            //     //log(angleOut)
            //     const offsetIn = startPoint.z >= endPoint.z ? 1 : 0;

            //     const angleIn = angleOut + 90 + offsetIn * 180;
            //     this.out.setRotationFromEuler(new Vec3(0, 0, angleOut));
            //     this.in.setRotationFromEuler(new Vec3(0, 0, angleIn));

            //     this.in.setScale(((Math.abs(angleOut)) / 90) * 2, 0.35, 1);
            //     this.target = null;
            // }

            // //set postion circle
            // let hitPoint = raycastClosestResult.hitPoint.clone();
            // const point = hitPoint;

            // this.circle.setPosition(0.503 * this.line.getWorldScale().x / 0.48, 0, 0);

        }
    }

    RaycastRight() {
        const outRay = new geometry.Ray();
        geometry.Ray.fromPoints(outRay, this.originRayRight.getWorldPosition(), this.targetRayRight.getWorldPosition());

        const mask = (1 << 1) + (1 << 2) + (1 << 3);
        // const mask = 0xffffffff;
        const maxDistance = 10000000;
        const queryTrigger = false;

        if (PhysicsSystem.instance.raycastClosest(outRay, mask, maxDistance, queryTrigger)) {
            const raycastClosestResult = PhysicsSystem.instance.raycastClosestResult;
            this.distanceRight = raycastClosestResult.distance;
            //   log("right " + this.distanceRight);
            //  log(Vec3.distance(this.originRayRight.getWorldPosition(), raycastClosestResult.hitPoint.clone()));
            // log(raycastCVthis.distance);
            //  this.line.setWorldScale(0.48 * this.distance / 0.512, 0.02, 1);
            //ball
            if (raycastClosestResult.collider.node.layer == 2) {
                this.targetRight = raycastClosestResult.collider.node;
                this.out.active = false;
                this.in.active = false;
            }
            //wall            
            else {
                this.targetRight = null;
                this.out.active = false;
                this.in.active = false;
            }
            this.hitPointRight = raycastClosestResult.hitPoint.clone();
            //    log("right " + this.hitPointRight);

            // // calcultate  angle
            // if (this.target) {
            //     this.in.setWorldPosition(this.target.getWorldPosition());
            //     // log(this.target.name);

            //     const startPoint = raycastClosestResult.hitPoint.x <= this.target.getWorldPosition().x ? raycastClosestResult.hitPoint : this.target.getWorldPosition();
            //     const endPoint = raycastClosestResult.hitPoint.x >= this.target.getWorldPosition().x ? raycastClosestResult.hitPoint : this.target.getWorldPosition();
            //     const angleOut = this.calculateAngleBetweenPoints(startPoint, endPoint);

            //     //log(angleOut)
            //     const offsetIn = startPoint.z >= endPoint.z ? 1 : 0;

            //     const angleIn = angleOut + 90 + offsetIn * 180;
            //     this.out.setRotationFromEuler(new Vec3(0, 0, angleOut));
            //     this.in.setRotationFromEuler(new Vec3(0, 0, angleIn));

            //     this.in.setScale(((Math.abs(angleOut)) / 90) * 2, 0.35, 1);
            //     this.target = null;
            // }

            // //set postion circle
            // let hitPoint = raycastClosestResult.hitPoint.clone();
            // const point = hitPoint;

            // this.circle.setPosition(0.503 * this.line.getWorldScale().x / 0.48, 0, 0);

        }
    }
    Raycast() {
        const outRay = new geometry.Ray();
        geometry.Ray.fromPoints(outRay, this.originRay.getWorldPosition(), this.targetRay.getWorldPosition());

        const mask = (1 << 1) + (1 << 2) + (1 << 3);
        // const mask = 0xffffffff;
        const maxDistance = 10000000;
        const queryTrigger = false;

        if (PhysicsSystem.instance.raycastClosest(outRay, mask, maxDistance, queryTrigger)) {
            const raycastClosestResult = PhysicsSystem.instance.raycastClosestResult;
            this.distanceCenter = raycastClosestResult.distance;
            // log(raycastClosestResult.hitNormal);
            //  log("center " + this.distanceCenter);
            //  this.line.setWorldScale(0.48 * this.distance / 0.512, 0.02, 1);
            //ball
            if (raycastClosestResult.collider.node.layer == 2) {
                this.targetCenter = raycastClosestResult.collider.node;
                this.out.active = false;
                this.in.active = false;
            }
            //wall            
            else {
                this.targetCenter = null;
                this.out.active = false;
                this.in.active = false;
            }
            this.hitPointCenter = raycastClosestResult.hitPoint.clone();
            //   log("center " + this.hitPointCenter);
            // // calcultate  angle
            // if (this.target) {
            //     this.in.setWorldPosition(this.target.getWorldPosition());
            //     // log(this.target.name);

            //     const startPoint = raycastClosestResult.hitPoint.x <= this.target.getWorldPosition().x ? raycastClosestResult.hitPoint : this.target.getWorldPosition();
            //     const endPoint = raycastClosestResult.hitPoint.x >= this.target.getWorldPosition().x ? raycastClosestResult.hitPoint : this.target.getWorldPosition();
            //     const angleOut = this.calculateAngleBetweenPoints(startPoint, endPoint);

            //     //log(angleOut)
            //     const offsetIn = startPoint.z >= endPoint.z ? 1 : 0;

            //     const angleIn = angleOut + 90 + offsetIn * 180;
            //     this.out.setRotationFromEuler(new Vec3(0, 0, angleOut));
            //     this.in.setRotationFromEuler(new Vec3(0, 0, angleIn));

            //     this.in.setScale(((Math.abs(angleOut)) / 90) * 2, 0.35, 1);
            //     this.targetCenter = null;
            // }

            // //set postion circle
            // let hitPoint = raycastClosestResult.hitPoint.clone();
            // const point = hitPoint;

            // this.circle.setPosition(0.503 * this.line.getWorldScale().x / 0.48, 0, 0);

        }
    }

    GetTarget() {
        if (this.targetCenter == null && this.targetLeft == null && this.targetRight == null) {
            //  log("all null");
            this.target = null;
            this.distance = this.distanceCenter;
            this.hitPoint = this.hitPointCenter;
        } else {

            // target left null
            if (this.targetLeft == null) {

                //target left null + target center null
                if (this.targetCenter == null) {
                    //target left null + target center null + target right null

                    if (this.targetRight == null) {
                        //     log("target left null + target center null + target right null");

                        this.target = this.targetCenter;
                        this.distance = this.distanceCenter;
                        this.hitPoint = this.hitPointCenter;

                        //target left null + target center null + target right !=null

                    } else {
                        //    log("target left null + target center null + target right !=null");

                        this.target = this.targetRight;
                        this.distance = this.distanceRight
                        this.hitPoint = this.hitPointRight;
                    }

                }
                //target left null +target center != null 

                else {
                    //target left null + target center !=null + target right null

                    if (this.targetRight == null) {
                        //    log("target left null + target center !=null + target right null");

                        this.target = this.targetCenter;
                        this.distance = this.distanceCenter;
                        this.hitPoint = this.hitPointCenter;
                    }
                    //target left null + target center !=null + target right !=null

                    else {
                        //     log("target left null + target center !=null + target right !=null");


                        if (this.hitPointCenter.x <= this.hitPointRight.x) {
                            this.target = this.targetCenter;
                            this.distance = this.distanceCenter;
                            this.hitPoint = this.hitPointCenter;
                        } else {
                            this.target = this.targetRight;
                            this.distance = this.distanceRight;
                            this.hitPoint = this.hitPointRight;
                        }
                    }
                }
            }
            // target left != null

            else {

                // target left != null target center null
                if (this.targetCenter == null) {

                    // target left != null target center null target right null
                    //   log(" target left != null target center null target right null");

                    if (this.targetRight == null) {
                        this.target = this.targetLeft;
                        this.distance = this.distanceLeft;
                        this.hitPoint = this.hitPointLeft;
                    }
                    // target left != null target center null target right != null

                    else {
                        //  log(" target left != null target center null target right != null");

                        if (this.hitPointRight.x <= this.hitPointLeft.x) {
                            this.target = this.targetRight;
                            this.distance = this.distanceRight;
                            this.hitPoint = this.hitPointRight;
                        } else {
                            this.target = this.targetLeft;
                            this.distance = this.distanceLeft;
                            this.hitPoint = this.hitPointLeft;
                        }
                    }
                }
                // target left != null target center !=null
                else {
                    if (this.targetRight == null) {
                        // log("target left != null target center !=null target right null");

                        if (this.hitPointCenter.x <= this.hitPointLeft.x) {
                            this.target = this.targetCenter;
                            this.distance = this.distanceCenter;
                            this.hitPoint = this.hitPointCenter;
                        } else {
                            this.target = this.targetLeft;
                            this.distance = this.distanceLeft;
                            this.hitPoint = this.hitPointLeft;
                        }
                    } else {
                        //  log("target left != null target center !=null target right1= null");

                        if (this.hitPointCenter.x <= this.hitPointRight.x) {
                            this.target = this.targetCenter;
                            this.distance = this.distanceCenter;
                            this.hitPoint = this.hitPointCenter;
                        } else {
                            this.target = this.targetRight;
                            this.distance = this.distanceRight;
                            this.hitPoint = this.hitPointRight;
                        }

                        if (this.hitPoint.x >= this.hitPointLeft.x) {
                            this.target = this.targetLeft;
                            this.distance = this.distanceLeft;
                            this.hitPoint = this.hitPointLeft;
                        }
                    }
                }
            }

        }
    }

    CalculateLine() {
        this.GetTarget();

        this.line.setWorldScale(0.48 * this.distance / 0.512, 0.02, 1);
        if (this.target != null) {

            const startPoint = this.hitPoint.x <= this.target.getWorldPosition().x ? this.hitPoint : this.target.getWorldPosition();
            const endPoint = this.hitPoint.x >= this.target.getWorldPosition().x ? this.hitPoint : this.target.getWorldPosition();
            const angleOut = this.calculateAngleBetweenPoints(startPoint, endPoint);
            
            //log(angleOut)
            const offsetIn = startPoint.z >= endPoint.z ? 1 : 0;

            const angleIn = angleOut + 90 + offsetIn * 180;
            this.out.setRotationFromEuler(new Vec3(0, 0, angleOut));
            this.in.setRotationFromEuler(new Vec3(0, 0, angleIn));

            this.in.setScale(((Math.abs(angleOut)) / 90) * 2, 0.35, 1);
            this.targetCenter = null;

            this.in.active = false;
            this.out.active = false;
        } else {
            this.in.active = false;
            this.out.active = false;
        }
        this.circle.setPosition(0.503 * this.line.getWorldScale().x / 0.48, 0, 0);
    }





    calculateAngleBetweenPoints(pointA: Vec3, pointB: Vec3): number {
        const deltaX = parseFloat(pointB.x.toFixed(4)) - parseFloat(pointA.x.toFixed(4));
        const deltaZ = parseFloat(pointB.z.toFixed(4)) - parseFloat(pointA.z.toFixed(4));


        //   log(deltaZ);
        // Tính góc dựa trên vector này bằng hàm Math.atan2()
        const angleRad = Math.atan2(-deltaZ, deltaX);

        // Chuyển đổi góc từ radian sang độ
        const angleDeg = misc.radiansToDegrees(angleRad);

        return angleDeg;
    }

}



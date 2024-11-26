import { AudioClip, AudioSource, Material, Node, Vec2 } from "cc";
interface Global {
    touchPos: Vec2,
    startTouch: boolean,
    startingShoot: boolean,
    firstShoot: boolean,
    endGame: boolean,
    ActiveRb: string,
    SpawnPotedBall: string,
    StartShoot: string,
    touchPowerBar: boolean,
    isDefaultBallFall: boolean,
    ResetGame: string,
    shootCount: number,
    isToStore: boolean,

}
let Global: Global = {
    touchPos: null,
    startTouch: false,
    startingShoot: false,
    firstShoot: false,
    endGame: false,
    isDefaultBallFall: false,
    ActiveRb: "ActiveRb",
    SpawnPotedBall: "SpawnPotedBall",
    StartShoot: "StartShoot",
    ResetGame: "ResetGame",
    touchPowerBar: false,
    shootCount: 4,
    isToStore: false,

};
export default Global;
export const eventDispatcher = new EventTarget();
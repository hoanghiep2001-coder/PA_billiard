
import { AudioClip, Vec3, _decorator, misc } from "cc";
import Singleton from "./Singleton";
const { ccclass, property } = _decorator;


@ccclass
export default class Utility extends Singleton<Utility> {
    constructor() {
        super();
        Utility._instance = this;
    }
    static RandomRangeFloat(lower: number, upper: number) {
        return Math.random() * (upper - lower) + lower;
    }
    static RandomRangeInteger(lower: number, upper: number) {
        return Math.round(Math.random() * (upper - lower) + lower);
    }
    
}


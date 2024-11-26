
import { Component, _decorator } from "cc";

const {ccclass, property} = _decorator;

@ccclass
export default class Singleton<T> extends Component{
    public static Instance<T>(c: {new(): T; }) : T{
        if (this._instance == null){
            this._instance = new c();
        }
        return this._instance;
    }
    public static _instance = null;
}

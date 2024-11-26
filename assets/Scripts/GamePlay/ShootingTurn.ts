
import { _decorator, Component, Label, Node } from 'cc';
import Global from '../Utility3D/Global';
const { ccclass, property } = _decorator;

 
@ccclass('ShootingTurn')
export  class ShootingTurn extends Component {
    
    @property(Label)
    ShootingTurn: Label = null;

    protected start(): void {
        
    }

    protected update(dt: number): void {
        this.ShootingTurn.string = `${Global.shootCount} / 4`
    }
}


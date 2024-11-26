
import { _decorator, Component, log, Material, MeshRenderer, Node, random, utils } from 'cc';
import Utility from '../Utility3D/Utility';
import { Ball } from './Ball';
import EventManager from '../Utility3D/Observer/EventManager';
import Global from '../Utility3D/Global';
import { GameManager } from '../Utility3D/GameManager';
import { SoundManager } from '../Utility3D/SoundManager';
const { ccclass, property } = _decorator;


@ccclass('MapMaterialNode')
class MapMaterialNode {
    @property(Material)
    material: Material = null;

    @property(Node)
    ballUI: Node = null;

    @property(Number)
    index: number = 0;
}

@ccclass('BallRandom')
export class BallRandom extends Component {

    // @property(Material)
    // smallBallMaterial: Material[] = [];

    // @property(Material)
    // bigBallMaterial: Material[] = [];

    // @property(MeshRenderer)
    // meshBall8: MeshRenderer = null;

    // @property(MeshRenderer)
    // meshBall11: MeshRenderer = null;

    // @property(MeshRenderer)
    // meshBall15: MeshRenderer = null;

    // @property(MeshRenderer)
    // meshBall: MeshRenderer[] = [];

    // @property(MapMaterialNode)
    // map: MapMaterialNode[] = [];

    
    start() {

        // SoundManager.Instance(SoundManager).PlaySound("HitPocket");

        // EventManager.instance.emit(Global.SpawnPotedBall, 3);

        // GameManager.Instance(GameManager).ActiveTextPraise();
        // this.meshBall8.node.parent.getComponent(Ball).Init(this.map[7].index, this.map[7].ballUI);
        // var randomIndexSmallMaterialBall = Utility.RandomRangeInteger(0, this.smallBallMaterial.length - 1);
        // var randomIndexBigMaterialBall = Utility.RandomRangeInteger(0, this.bigBallMaterial.length - 1);

        // var materialSmall = this.smallBallMaterial[randomIndexSmallMaterialBall];
        // var materialBig = this.bigBallMaterial[randomIndexBigMaterialBall];
        // var x = Utility.RandomRangeFloat(0, 10);
        // if (x % 2 == 0) {


        //     this.meshBall11.setMaterial(materialSmall, 0);
        //     var proPerMeshBall11 = this.GetProper(materialSmall);
        //     this.meshBall11.node.parent.getComponent(Ball).Init(proPerMeshBall11.index, proPerMeshBall11.ballUI);


        //     this.meshBall15.setMaterial(materialBig, 0);
        //     var proPerMeshBall15 = this.GetProper(materialBig);
        //     this.meshBall15.node.parent.getComponent(Ball).Init(proPerMeshBall15.index, proPerMeshBall15.ballUI);

        // } else {

        //     this.meshBall11.setMaterial(materialBig, 0);
        //     var proPerMeshBall11 = this.GetProper(materialBig);
        //     this.meshBall11.node.parent.getComponent(Ball).Init(proPerMeshBall11.index, proPerMeshBall11.ballUI);

        //     this.meshBall15.setMaterial(materialSmall, 0);
        //     var proPerMeshBall15 = this.GetProper(materialSmall);
        //     this.meshBall15.node.parent.getComponent(Ball).Init(proPerMeshBall15.index, proPerMeshBall15.ballUI);
        // }


        // this.bigBallMaterial.splice(randomIndexBigMaterialBall, 1);
        // this.smallBallMaterial.splice(randomIndexSmallMaterialBall, 1);

        // let mergedArrayMaterial: Material[] = this.smallBallMaterial.concat(this.bigBallMaterial);
        // mergedArrayMaterial = this.shuffleArray(mergedArrayMaterial);


        // for (let i = 0; i < mergedArrayMaterial.length; i++) {
        //     var randomIndexBall = Utility.RandomRangeInteger(0, this.meshBall.length - 1);
        //     var ball = this.meshBall[randomIndexBall];
        //     ball.setMaterial(mergedArrayMaterial[i], 0);

        //     var prop = this.GetProper(mergedArrayMaterial[i]);
        //     ball.node.parent.getComponent(Ball).Init(prop.index, prop.ballUI);
        //     this.meshBall.splice(randomIndexBall, 1);
        // }
        // [3]
    }


    // GetProper(mat: Material) {
    //     for (let i = 0; i < this.map.length; i++) {
    //         if (mat == this.map[i].material) {
    //             return this.map[i];
    //         }
    //     }
    // }


    // shuffleArray(array: any[]): any[] {
    //     for (let i = array.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [array[i], array[j]] = [array[j], array[i]]; // Hoán đổi vị trí của phần tử
    //     }
    //     return array;
    // }
}


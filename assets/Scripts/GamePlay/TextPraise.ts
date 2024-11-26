
import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TextPraise
 * DateTime = Fri May 24 2024 18:02:33 GMT+0700 (Indochina Time)
 * Author = PhongDNRocket123
 * FileBasename = TextPraise.ts
 * FileBasenameNoExtension = TextPraise
 * URL = db://assets/Scripts/GamePlay/TextPraise.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('TextPraise')
export class TextPraise extends Component {

    @property(SpriteFrame)
    spriteFrame: SpriteFrame[] = [];

    @property(Sprite)
    sprite: Sprite = null;

    index: number = 0;
    protected onEnable(): void {
        this.index %= 3;
        this.sprite.spriteFrame = this.spriteFrame[this.index];
        this.index += 1;
        this.scheduleOnce(() => {
            this.node.active = false;
        }, 1.5);
    }
}


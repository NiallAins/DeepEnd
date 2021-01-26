import { GameObject } from '../Bunas';
import { seaLevel, menu } from '../main';
import Block from '../Block';

export abstract class Fish extends GameObject {
  public static current: Fish[] = [];

  protected speedSlow = 1.5; 
  protected speedFast = 4;
  protected dx: number = this.speedSlow;
  protected dy: number = 0;
  protected turnTimer: number = 0;
  protected turnTimerLimit: number = 20;
  public isLightNear: boolean = false;
  public isLightFar: boolean = false;
  public isTouch: boolean = false;
  public isHit: boolean = false;
  public isCamera: boolean = false;

  constructor(
    x: number,
    y: number,
    box: number | {width: number, height: number}
  ) {
    super(x, y, 1 + (Math.random() * 3), box);
  }

  public step(dt: number) {
    if (menu.open) {
      return;
    }
    Fish.current.push(this);

    this.turnTimer++;
    this.turnTimer %= this.turnTimerLimit;

    if (this.y < seaLevel + 50 || Block.current.some(b => b.checkCollision(this.x + this.dx, this.y + this.dy))) {
      this.ang = this.ang + (Math.PI / 2);
      this.dx = Math.cos(this.ang) * this.speedSlow;
      this.dy = Math.sin(this.ang) * this.speedSlow;
      this.turnTimer = 1;
    }

    this.x += this.dx * dt;
    this.y += this.dy * dt;
  }

  public endStep() {
    this.isLightNear = false;
    this.isLightFar = false;
    this.isTouch = false;
    this.isHit = false;
    this.isCamera = false;
  }

  public delete() {
    Fish.current.splice(Fish.current.findIndex(f => f === this), 1);
    super.delete();
  }
}
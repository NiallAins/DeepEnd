import { Engine, Light } from '../Bunas';
import { guy, camera } from '../main';
import { Fish } from 'FishBase';

export class Pirhana extends Fish {
  protected speedFast: number = 8;
  private attackTimer: number = 0;
  private blocker: Light.Block;

  constructor(x, y) {
    super(x, y, {width: 32, height: 22});
    this.sprite = Engine.getSprite('fish_piranha');
    this.speedFast += Math.random() * 0.5;
    this.blocker = new Light.Block(
      this.x, this.y, [
        {x:  1, y:  0},
        {x: 12, y:  0},
        {x: 25, y:  0},
        {x: 32, y:  5},
        {x: 31, y: 15},
        {x: 14, y: 21},
        {x:  2, y: 19}
      ],
      this.draw.bind(this),
      false,
      '#0006sd4'
    );
    this.blocker.bindPosition(this, 0, 0, 0, 17, 11);
  }

  public step(dt: number) {
    let gxDiff = guy.x - this.x,
        gyDiff = guy.y - this.y;
    if (this.attackTimer) {
      this.ang = Math.atan2(gyDiff, gxDiff);

      if (this.attackTimer > 40) {
        this.dx = Math.cos(this.ang) * this.speedFast;
        this.dy = Math.sin(this.ang) * this.speedFast;
      } else {
        //this.attackTimer++;
      }
    }
    if (this.turnTimer === 0) {
      let dist = (gxDiff * gxDiff) + (gyDiff * gyDiff);
      if (!this.attackTimer || dist > 80000) {
        if (dist < 80000) {
          this.dx = 0;
          this.dy = 0;
          this.attackTimer++;
        } else {
          this.attackTimer = 0;
          this.ang = this.ang + (Math.random() * Math.PI / 8) - Math.PI / 16;
          this.dx = Math.cos(this.ang) * this.speedSlow;
          this.dy = Math.sin(this.ang) * this.speedSlow;
        }
      }
    }
    super.step(dt);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
      ctx.translate(this.x + 17, this.y + 11);
      ctx.rotate(this.ang);
      camera.focusDraw(this, () => ctx.drawImage(this.sprite as HTMLImageElement, -17, -11));
    ctx.restore();
  }
}
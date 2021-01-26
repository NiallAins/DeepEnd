import { Engine, Light } from '../Bunas';
import { guy, camera } from '../main';
import { Fish } from '../Fish';

export class PinkFish extends Fish {
  private light: Light.Source;
  private blocker: Light.Block;

  constructor(x: number, y: number) {
    super(x, y, {width: 29, height: 17});
    let r = Math.floor(Math.random() * 2);
    this.sprite = Engine.getSprite(r ? 'fish_1' : 'fish_2');
    this.blocker = new Light.Block(
      this.x, this.y, [
        {x: 12, y:  2},
        {x: 26, y:  5},
        {x: 26, y: 10},
        {x: 17, y: 14},
        {x:  3, y:  8}
      ],
      this.draw.bind(this),
      false,
      r ? '#f8F4' : '#bbf4'
    );
    this.light = new Light.Source(x, y, 50, '#f0f4', false);
    this.light.bindPosition(this, 14, 8);
    this.blocker.bindPosition(this, 0, 0, 0, 14, 8);
  }

  public step(dt: number) {
    if (this.turnTimer === 0) {
      let gxDiff = this.x - guy.x,
          gyDiff = this.y - guy.y;
      if ((gxDiff * gxDiff) + (gyDiff * gyDiff) < 15000) {
        this.ang = Math.atan2(gyDiff, gxDiff);
        this.dx = Math.cos(this.ang) * this.speedFast;
        this.dy = Math.sin(this.ang) * this.speedFast;
      } else {
        this.ang = this.ang + (Math.random() * Math.PI / 8) - Math.PI / 16;
        this.dx = Math.cos(this.ang) * this.speedSlow;
        this.dy = Math.sin(this.ang) * this.speedSlow;
      }
    }

    super.step(dt);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
      ctx.translate(this.x + 14, this.y + 8);
      ctx.rotate(this.ang);
      camera.focusDraw(this, () => ctx.drawImage(this.sprite as HTMLImageElement, -14, -8));
    ctx.restore();
  }
}
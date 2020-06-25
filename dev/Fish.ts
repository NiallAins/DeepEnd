import { GameObject, Engine, Light } from 'Bunas';
import { levelBlocks, guy, camera, seaLevel } from 'main';

export default class Fish extends GameObject {
  private readonly speedSlow = 1.5; 
  private readonly speedFast = 4;
  private dx: number = this.speedSlow;
  private dy: number = 0;
  private dir: number = 0;
  private turnTimer: number = 0;
  private light: Light.Source;
  private blocker: Light.Block;

  constructor(
    x: number,
    y: number
  ) {
    super(x, y, 1 + (Math.random() * 3), {width: 25, height: 13});
    this.sprite = Engine.getSprite('fish_1');
    this.blocker = new Light.Block(
      this.x, this.y, [
        {x: -12, y: -5},
        {x: -10, y:  5},
        {x:  -7, y:  0},
        {x:  -1, y:  3},
        {x:   2, y:  6},
        {x:  12, y:  2},
        {x:  12, y: -4},
        {x:   8, y: -6},
        {x:   3, y: -6},
        {x:  -9, y:  0}
      ],
      this.drawWithAlpha.bind(this),
      false,
      '#f0f2'
    );
    this.light = new Light.Source(x, y, 50, '#f0f2', false);
  }

  public step() {
    this.turnTimer++;
    if (this.turnTimer > 20) {
      let gxDiff = this.x - guy.x,
          gyDiff = this.y - guy.y;
      if ((gxDiff * gxDiff) + (gyDiff * gyDiff) < 15000) {
        this.dir = Math.atan2(gyDiff, gxDiff);
        this.dx = Math.cos(this.dir) * this.speedFast;
        this.dy = Math.sin(this.dir) * this.speedFast;
      } else {
        this.dir = this.dir + (Math.random() * Math.PI / 8) - Math.PI / 16;
        this.dx = Math.cos(this.dir) * this.speedSlow;
        this.dy = Math.sin(this.dir) * this.speedSlow;
        this.turnTimer = 0;
      }
    }

    if (this.y < seaLevel || levelBlocks.some(b => b.checkCollision(this.x + this.dx, this.y + this.dy))) {
      this.dir = this.dir + (Math.PI / 2);
      this.dx = Math.cos(this.dir) * this.speedSlow;
      this.dy = Math.sin(this.dir) * this.speedSlow;
      this.turnTimer = 0;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.light.x = this.x + 12;
    this.light.y = this.y + 6;
    this.blocker.x = this.x + 12;
    this.blocker.y = this.y + 6;
    this.blocker.ang = this.dir;
  }

  public drawWithAlpha(ctx: CanvasRenderingContext2D, alpha: number = 1) {
    ctx.save();
      ctx.translate(this.x + 12, this.y + 6);
      ctx.rotate(this.dir);
      camera.focusDraw(this, () => ctx.drawImage(this.sprite as HTMLImageElement, -12, -6));
    ctx.restore();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.drawWithAlpha(ctx, 1);
  }
}
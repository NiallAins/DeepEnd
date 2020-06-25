import {
  GameObject,
  Graphics,
  Light,
  Input,
  Debug
} from 'Bunas';
import { levelBlocks, camera, seaLevel, gems } from 'main';

export default class Guy extends GameObject {
  public sprite: Graphics.SpriteSheet = new Graphics.SpriteSheet('guy_front', 8, 3);
  private glow: Light.Source = new Light.Source(0, 0, 250, '#110', true);
  private glow2: Light.Source = new Light.Source(0, 0, 200, '#1108', false);
  private torch: Light.Source = new Light.Source(0, 0, 600, '#110', true, 1, 10);
  private torch2: Light.Source = new Light.Source(0, 0, 400, '#1108', false, 1, 10);
  
	public ang: number = 0;
	private dx: number = 0;
	private dy: number = 0;
  private dirLeft: boolean = false;
  private speed: number = 0;
  private readonly width: number = 58;

	constructor(x: number, y: number) {
    super(x, y, 2, 58);
	}

	step(): void {
    // User Input
    let newAng = -1;
    if (this.y < seaLevel) {
      newAng = Math.PI * 0.5;
    } else {
      if (Input.isPressed('KeyD')) {
        if (Input.isPressed('KeyS')) {
          newAng = Math.PI * 0.25;
        } else if (Input.isPressed('KeyW')) {
          newAng = Math.PI * 1.75;
        } else {
          newAng = 0;
        }
      } else if (Input.isPressed('KeyA')) {
        if (Input.isPressed('KeyS')) {
          newAng = Math.PI * 0.75;
        } else if (Input.isPressed('KeyW')) {
          newAng = Math.PI * 1.25;
        } else {
          newAng = Math.PI;
        }
      } else if (Input.isPressed('KeyS')) {
        newAng = Math.PI * 0.5;
      } else if (Input.isPressed('KeyW')) {
        newAng = Math.PI * 1.5;
      }
    }

    // Change angle
    if (newAng !== -1) {
      let angDiff = newAng - this.ang;
      if (angDiff > Math.PI) {
        this.ang += 2 * Math.PI;
      } else if (angDiff < -Math.PI) {
        this.ang -= 2 * Math.PI;
      }
      newAng = (newAng - this.ang) * (camera.on ? 0.02 : 0.08);
      this.ang += 1 - (1 - newAng) * (1 - newAng);

      if (camera.on) {
        if (this.speed < 2) {
          this.speed += 0.1;
        } else {
          this.speed *= 0.9;
        }
      } else if (this.speed < 15) {
        this.speed += 1;
      }

      this.sprite.setDuration(camera.on ? 1.5 : 3);
    } else {
      if (Math.abs(this.speed) < 0.5) {
        this.speed = 0;
      }
      this.speed *= 0.9;

      if (this.sprite.frame === 0 || this.sprite.frame === 4){
        this.sprite.setDuration(0);
      }
    }

    // Move
    this.dx = Math.cos(this.ang) * this.speed;
    this.dy = this.y < seaLevel ? this.dy + 2 : Math.sin(this.ang) * this.speed;
    if (this.y > seaLevel && this.dy + this.y < seaLevel) {
      this.dy *= 2;
    }
    if (newAng !== -1) {
      this.dirLeft = this.dx < 0;
    }
    this.x += this.dx;
    this.y += this.dy;

    // Collisions
    levelBlocks
      .forEach(b => {
        if (
          b.inView &&
          b.checkCollision(
            this.x,
            this.y,
            this.width,
            this.width
          )
        ) {
          let xDiff, yDiff;
          if (this.dx > 0) {
            xDiff = b.x - (this.x + this.width);
          } else {
            xDiff = b.x + b.width - this.x;
          }
          if (this.dy > 0) {
            yDiff = b.y - (this.y + this.width);
          } else {
            yDiff = b.y + b.width - this.y;
          }
          if (Math.abs(xDiff / this.dx) < Math.abs(yDiff / this.dy)) {
            if (Math.abs(xDiff) > 2) {
              this.dx = 0;
            }
            this.x += xDiff;
          } else {
            if (Math.abs(yDiff) > 2) {
              this.dy = 0;
            }
            this.y += yDiff;
          }
        }

        // Gem GLow
        if (b.gem && b.gem.edge) {
          let d = Math.pow(this.x - b.x, 2) + Math.pow(this.y - b.y, 2),
              a = Math.atan2(this.y - b.y, this.x - b.x);
          let aDiff = this.ang - a + 3.14;
          aDiff += (aDiff > Math.PI) ? -2 * Math.PI : (aDiff < -Math.PI) ? 2 * Math.PI : 0;
          aDiff = Math.abs(aDiff);
          b.gem.source.ang = aDiff * 0.2;
          if (d < 50000 || (d < 150000 && aDiff < 0.4)) {
            if (b.gem.source.rad < 45) {
              let glow = 1 - (Math.sqrt(d) / 400);
              b.gem.source.rad += ((10 + (glow * 70)) - b.gem.source.rad) / 8;
              b.gem.source.opacity = 0.2 * glow;
              b.gem.source.active = true;
            }
          } else if (b.gem.source.rad > 10) {
            b.gem.source.rad -= b.gem.source.rad / 20;
            b.gem.source.opacity = 0.2 * ((b.gem.source.rad - 10) / 80);
          } else {
            b.gem.source.active = false;
          }
        } 
      });

    // Hammer
    if (!camera.on && Input.key.down === 'Space') {
      let colX = this.x + 30 + (40 * Math.cos(this.ang)),
          colY = this.y + 30 + (40 * Math.sin(this.ang));
      levelBlocks.forEach(b => {
        if (b.inView && b.checkCollision(colX, colY)) {
          b.break();
          this.speed *= 0.5;
        }
      });
    }

    // Sprite and light positions
    this.torch.ang = this.ang;
    this.torch.x = this.x + 32 + (Math.cos(this.ang) * 24);
    this.torch.y = this.y + 36 + (Math.sin(this.ang) * 24);
    this.torch2.ang = this.torch.ang;
    this.torch2.x = this.torch.x;
    this.torch2.y = this.torch.y;
    this.glow.x = this.x + 29;
    this.glow.y = this.y + 29;
    this.glow2.x = this.x + 29;
    this.glow2.y = this.y + 29;
	}

	draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
      ctx.imageSmoothingEnabled = true;
      camera.focusDraw(this, () => {
        if (camera.on) {
          ctx.globalAlpha *= 0.5;
        }
        this.sprite.draw(
          ctx,
          this.x - 32 - (Math.cos(this.ang) * 18),
          this.y - 32 - (Math.sin(this.ang) * 18),
          this.dirLeft ? -this.ang : this.ang,
          this.dirLeft ? [1, -1] : 1
        )
      });
      ctx.imageSmoothingEnabled = false;
    ctx.restore();
	}
}
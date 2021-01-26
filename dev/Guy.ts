import {
  GameObject,
  Graphics,
  Light,
  Input
} from 'Bunas';
import { camera, seaLevel, menu, dingy, HUD } from 'main';
import Gem from 'Gem';
import Block from 'Block';
import { Fish } from 'Fish';

export default class Guy extends GameObject {
  // Movement
  private dx: number = 0;
	private dy: number = 0;
  private dirLeft: boolean = false;
  private speed: number = 0;
  private readonly width: number = 58;

  // Sprites
  public readonly sprite: Graphics.SpriteSheet = new Graphics.SpriteSheet('guy_front', 8, 3);
  public readonly sprite_arm: Graphics.SpriteSheet = new Graphics.SpriteSheet('guy_arm', 8, 0);

  // Light
  private readonly lightRad: {[light: string]: number[]} = {
    torch:  [0, 600],
    torch2: [0, 300],
    glow:   [100, 250],
    glow2:  [0, 200]
  };
  private readonly torch: Light.Source = new Light.Source(0, 0, this.lightRad.torch[1], '#110', true, 1, 10);
  private readonly torch2: Light.Source = new Light.Source(0, 0, this.lightRad.torch2[1], '#1108', false, 1, 10);
  private readonly glow: Light.Source = new Light.Source(0, 0, this.lightRad.glow[1], '#110', true);
  private readonly glow2: Light.Source = new Light.Source(0, 0, this.lightRad.glow[1], '#1108', false);

  // Hammer
  private hammerSwinging: boolean = false;
  
  // VFX
  private readonly debris: Graphics.Emitter = new Graphics.Emitter(0, 0, 1, [1.8, 4.2], [1.5, 2.5]);
  private readonly bubbles: Graphics.Emitter = new Graphics.Emitter(0, 0, 1, [4.5, 4.9], [0.8, 1.3], 15);

  constructor(x: number, y: number) {
    super(x, y, 2, 58);
    this.glow.bindPosition(this, 29, 29);
    this.glow2.bindPosition(this, 29, 29);
    this.torch.bindPosition(this, 32, 36, 0, 24, 24);
    this.torch2.bindPosition(this, 32, 36, 0, 24, 24);
    this.debris.setSpriteParticle((c, rand) => {
        c.beginPath();
          c.moveTo(-5, 0);
          c.lineTo(0, -3);
          c.lineTo(5, -1);
          c.lineTo(3, 5);
          c.lineTo(-2, 4);
        c.fillStyle = ['#CB8F85', '#BD8781', '#AA827E'][Math.floor(rand * 3)];
        c.fill();
      },
      50, 0.01, [0, 6], [-0.2, 0.2]
    );
    this.debris.gravity = 0.02;
    this.debris.bindPosition(this, 27, 36 , 0, 40, 40, true);
    this.bubbles.setParticle([2, 3], '#48c4', [40, 60], 0.05);
    this.bubbles.bindPosition(this, 32, 24, 0, 24, 24);
  }

	public step(dt: number): void {
    if (menu.open) {
      return;
    }

    const
      cosA = Math.cos(this.ang),
      sinA = Math.sin(this.ang);

    // Open Menu
    if (dingy.inView && menu.reopenWait === 0 && this.checkCollision(dingy) && this.dy > 0) {
      this.sprite.setDuration(0);
      menu.openMenu();
      return;
		}

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

      if (this.sprite.frame === 0 || this.sprite.frame === 4) {
        this.sprite.setDuration(0);
      }
    }

    // Move
    this.dx = cosA * this.speed;
    this.dy = this.y < seaLevel ? this.dy + 2 : sinA * this.speed;
    if (this.y > seaLevel && this.dy + this.y < seaLevel) {
      this.dy *= 2;
    }
    if (newAng !== -1) {
      this.dirLeft = this.dx < 0;
    }
    this.x += this.dx * dt;
    this.y += this.dy * dt;

    // Collisions
    Block.current
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

        // Gem Glow
        if (b.gems.length) {
          let d = Math.pow(this.x - b.x, 2) + Math.pow(this.y - b.y, 2),
              a = Math.atan2(this.y - b.y, this.x - b.x);
          let aDiff = this.ang - a + 3.14;
          aDiff += (aDiff > Math.PI) ? -2 * Math.PI : (aDiff < -Math.PI) ? 2 * Math.PI : 0;
          aDiff = Math.abs(aDiff);
          b.gems.forEach(g => g.source.ang = aDiff * 0.2);
          if (d < 50000 || (d < 150000 && aDiff < 0.4)) {
            if (b.gems[0].source.rad < 45) {
              let glow = 1 - (Math.sqrt(d) / 400);
              b.gems.forEach(g => {
                g.source.rad += ((10 + (glow * 70)) - g.source.rad) / 8;
                g.source.opacity = 0.2 * glow;
              });
            }
          } else if (b.gems[0].source.rad > 10) {
            b.gems.forEach(g => {
              g.source.rad -= g.source.rad / 20;
              g.source.opacity = 0.2 * ((g.source.rad - 10) / 80);
            });
          } else {
            b.gems.forEach(g => g.source.rad = 0);
          }
        } 
      });

    Gem.freeGems.forEach(g => {
      let d = Math.pow(this.x - g.x, 2) + Math.pow(this.y - g.y, 2),
          a = Math.atan2(this.y - g.y, this.x - g.x);
      let aDiff = this.ang - a + 3.14;
      aDiff += (aDiff > Math.PI) ? -2 * Math.PI : (aDiff < -Math.PI) ? 2 * Math.PI : 0;
      aDiff = Math.abs(aDiff);
      g.source.ang = aDiff * 0.2;
      if (d < 50000 || (d < 150000 && aDiff < 0.4)) {
        if (g.source.rad < 45) {
          let glow = 1 - (Math.sqrt(d) / 400);
          g.source.rad += ((10 + (glow * 70)) - g.source.rad) / 8;
          g.source.opacity = 0.2 * glow;
        }
      } else if (g.source.rad > 10) {
        g.source.rad -= g.source.rad / 20;
        g.source.opacity = 0.2 * ((g.source.rad - 10) / 80);
      } else {
        g.source.rad = 0;
      }
    });

    // Torch Level
    const
      bat = Math.min(1, Math.ceil(HUD.battery)),
      blink = HUD.battery < 1 && Math.random() < 0.1;
    if (bat === 1 && HUD.battery < 0.1) {
      let fade = HUD.battery * 10;
      this.torch.rad  = blink ? 0 : this.lightRad.torch[1]  * fade;
      this.torch2.rad = blink ? 0 : this.lightRad.torch2[1] * fade;
      this.glow.rad   =  this.lightRad.glow[0]  + ((this.lightRad.glow[1]  - this.lightRad.glow[0])  * fade);
      this.glow2.rad  =  this.lightRad.glow2[0] + ((this.lightRad.glow2[1] - this.lightRad.glow2[0]) * fade);
    } else {
      this.torch.rad  = blink ? 0 : this.lightRad.torch[bat];
      this.torch2.rad = blink ? 0 : this.lightRad.torch2[bat];
      this.glow.rad   = this.lightRad.glow[bat];
      this.glow2.rad  = this.lightRad.glow2[bat];
    }


    // Hammer
    if (!camera.on && Input.isPressed('Space') && this.sprite_arm.frame !== 5) {
      this.hammerSwinging = true;
      this.sprite_arm.setDuration(2.5);
    }
    if (this.hammerSwinging) {
      if (this.sprite_arm.frame === 5) {
        const
          colX = 29 + (40 * cosA),
          colY = 29 + (40 * sinA);
        Block.current.forEach(b => {
          if (b.inView && b.checkCollision(this.x + colX, this.y + colY)) {
            this.debris.emit(1 + Math.floor(Math.random() * 3));
            b.hit(2);
            this.speed *= 0.5;
          }
        });
        Gem.freeGems.forEach(g => {
          if (g.inView && this.distTo(g.x, g.y, colX, colY) < 30) {
            g.hit();
          }
        });
        Fish.current.forEach(f => {
          if (f.inView && f.checkCollision(this.x + colX, this.y + colY)) {
            f.isHit = true;
          }
        });
        this.hammerSwinging = false;
      } else if (this.sprite_arm.frame === 7) {
        this.sprite_arm.frame = 2;
      }
    } else if (this.sprite_arm.frame === 0) {
      this.sprite_arm.setDuration(0);
    }

    // VFX
    this.bubbles.rate = this.speed > 5 ? 6 : 20;
	}

	draw(ctx: CanvasRenderingContext2D, dt: number): void {
    const
      cosA = Math.cos(this.ang),
      sinA = Math.sin(this.ang);

    ctx.save();
      ctx.imageSmoothingEnabled = true;
      camera.focusDraw(this, () => {
        if (camera.on) {
          ctx.globalAlpha *= 0.5;
        }
        this.sprite_arm.draw(
          ctx,
          this.x + 2 + (cosA * 18),
          this.y + 2 + (sinA * 18),
          this.dirLeft ? -this.ang : this.ang,
          this.dirLeft ? [1, -1] : 1
        );
        this.sprite.draw(
          ctx,
          this.x - 32 - (cosA * 18),
          this.y - 32 - (sinA * 18),
          this.dirLeft ? -this.ang : this.ang,
          this.dirLeft ? [1, -1] : 1
        );
      });
      ctx.imageSmoothingEnabled = false;
      // hammer box
      // ctx.fillRect(
      //   (this.x + 29 + (40 * Math.cos(this.ang))) - 20,
      //   (this.y + 29 + (40 * Math.sin(this.ang))) - 20,
      //   40,
      //   40
      // )
    ctx.restore();
  }
}
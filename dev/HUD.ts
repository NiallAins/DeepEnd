import { Engine, Debug } from 'Bunas';
import { camera, seaLevel, guy, menu } from 'main';

export default class {
  public air: number = 1;
  public airDec: number = 0;
  public battery: number = 5;
  public batteryDec: number = 0;
  private statsIcon: HTMLImageElement;

  constructor() {
    this.statsIcon = Engine.getSprite('icon_stats');
  }

  public step(dt: number) {
    if (menu.open) {
      return;
    }
    if (guy.y > seaLevel + 50) {
      if (this.air > 0.01) {
        this.air -= this.airDec * dt;
      }
    } else if (this.air < 0.24) {
      this.air += 0.01 * dt;
    }
    if (this.battery > 0) {
      this.battery -= this.batteryDec * dt;
    }
  }
  
  public draw(ctx: CanvasRenderingContext2D) {
    if (this.air < 0.24 && !camera.drawingPhoto) {
      ctx.save();
        ctx.filter = 'saturate(' + Math.floor(400 * this.air) + '%)';
        ctx.drawImage(Engine.getCanvasEl(), 0, 0);
      ctx.restore();
    }
    if (!camera.drawingPhoto) {
      ctx.save();
        ctx.translate(20, Engine.cH - 140);
        ctx.drawImage(this.statsIcon, 0, 0);

        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 18;
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.air < 0.20 ? '#e45692' : '#fff';
        ctx.translate(90, 30);
        ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.floor(200 * this.air), 0);
        ctx.stroke();

        ctx.setLineDash([30, 10]);
        ctx.lineCap = 'butt';
        ctx.strokeStyle = this.battery < 1 ? '#e45692' : '#fff';
        ctx.translate(20, 45);
        ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.floor(40 * Math.ceil(this.battery)), 0);
        ctx.stroke();
      ctx.restore();
    }
  }
}
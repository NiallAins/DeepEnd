import { Engine } from 'Bunas';
import { camera, seaLevel, guy } from 'main';

export default class {
  public air: number = 1;
  public airDec: number = 0.0005;
  public battery: number = 1;
  private batteryIcon: HTMLImageElement;

  constructor() {
    this.batteryIcon = Engine.getSprite('icon_battery');
  }

  public step() {
    if (guy.y > seaLevel + 50) {
      if (this.air > 0.01) {
        this.air -= this.airDec;
      }
    } else if (this.air < 0.24){
      this.air += 0.01;
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
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
          ctx.moveTo(60, Engine.cH - 60);
          ctx.lineTo(60, 60 + ((Engine.cH - 120) * (1 - this.air)));
          ctx.strokeStyle = this.air < 0.25 ? '#FFF' : '#555';
          ctx.lineCap = 'round';
          ctx.lineWidth = 18;
        ctx.stroke();
          ctx.strokeStyle = this.air < 0.25 ? '#F6A' : '#AAF';
          ctx.lineCap = 'round';
          ctx.lineWidth = 22;
        ctx.stroke();
      ctx.restore();
    }

    // ctx.translate(130, 15);
    // ctx.rotate(Math.PI / 2);
    // ctx.drawImage(HUD.batteryIcon, 0, 0, 60, 112, 0, 0, 60, 112);
    // if (HUD.battery === 1) {
    // 	ctx.drawImage(HUD.batteryIcon, 60, 92, 46, 20, 7, 85, 46, 20);
    // } else {
    // 	let height = (4 - HUD.battery) * 23;
    // 	ctx.drawImage(HUD.batteryIcon, 60, height, 46, 90 - height, 7, height + 16, 46, 90 - height);
    // }
  }
}
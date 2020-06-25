import { Engine, World, Input, GameObject } from 'Bunas';
import { guy } from 'main';



export default class {
  private _on: boolean = false;

  private dist: number = Engine.cH / 4;
  private focus: number = 2;
  
  private easeVal: number = 0;
  private ease: number = 0;
  private target: {x: number, y: number, z: number};
  
  private view: World.View;
  private viewPort: {x: number, y: number, w: number, h: number} = {x: 0, y: 0, w: Engine.cW, h: Engine.cH}
  
  public drawingPhoto: boolean = false;
  private photoCan: HTMLCanvasElement;
  private photoCtx: CanvasRenderingContext2D;
  private album: HTMLImageElement[] = [];

  constructor(private mainView: World.View) {
    this.view = new World.View();
    this.photoCan = document.createElement('canvas');
    this.photoCan.width = Engine.cW / 3;
    this.photoCan.height = (Engine.cW / 3) * 0.75;
    this.photoCtx = this.photoCan.getContext('2d');
  }

  get on(): boolean {
    return this._on;
  }
  set on(isOn: boolean) {
    if (isOn) {
      this.view.x = this.mainView.x;
      this.view.y = this.mainView.y;
      this.view.z = this.mainView.z;
      World.area.view = this.view;
      this.ease = 1;
    } else {
      this.ease = -1;
    }
    this._on = isOn;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (this._on) {
      let ratio = this.dist / Engine.cW * 3,
        w = 800 * ratio,
        h = 600 * ratio,
        r = 20 * ratio;
      this.viewPort = {
        x: this.view.x + ((Engine.cW - w) / 2 / this.view.z),
        y: this.view.y + ((Engine.cH - h) / 2 / this.view.z),
        w: w / this.view.z,
        h: h / this.view.z
      };

      if (this.drawingPhoto) {
        return;
      }
      ctx.save();
        if (this.ease !== 0) {
          ctx.globalAlpha = Math.max(0, (this.easeVal - 0.3) * 3);
          if (this.easeVal > 0) {
            w /= this.easeVal;
            h /= this.easeVal;
            r /= this.easeVal;
          }
        }
        ctx.save();
          ctx.translate((Engine.cW - w)/ 2, (Engine.cH - h) / 2);
          ctx.beginPath();
            ctx.moveTo(0, r);
              ctx.arcTo(0, 0, r, 0, r);
            ctx.lineTo(w - r, 0);
              ctx.arcTo(w, 0, w, r, r);
            ctx.lineTo(w, h - r);
              ctx.arcTo(w, h, w - r, h, r);
            ctx.lineTo(r, h);
              ctx.arcTo(0, h, 0, h - r, r);
          ctx.closePath();
        ctx.restore();
        ctx.rect(Engine.cW, 0, -Engine.cW, Engine.cH);
        ctx.fillStyle = '#000b';
        ctx.lineWidth = 2;
        ctx.fill();
        
        w *= 0.85;
        h *= 0.8;
        r *= 2;
        ctx.beginPath();
          ctx.moveTo((Engine.cW / 2) - 20, Engine.cH / 2);
          ctx.lineTo((Engine.cW / 2) + 20, Engine.cH / 2);
          ctx.moveTo(Engine.cW / 2, (Engine.cH / 2) - 20);
          ctx.lineTo(Engine.cW / 2, (Engine.cH / 2) + 20);
          ctx.translate((Engine.cW / 2) - (w / 2), (Engine.cH / 2) - (h / 2));
          ctx.moveTo(0, r);
            ctx.lineTo(0, 0);
            ctx.lineTo(r, 0);
          ctx.moveTo(w - r, 0);
            ctx.lineTo(w, 0);
            ctx.lineTo(w, r);
          ctx.moveTo(w, h - r);
            ctx.lineTo(w, h);
            ctx.lineTo(w - r, h);
          ctx.moveTo(r, h);
            ctx.lineTo(0, h);
            ctx.lineTo(0, h - r);
          ctx.moveTo(w, r * 3);
            ctx.lineTo(w, h - (r * 3));
          ctx.moveTo(r * 3, h);
            ctx.lineTo(w - (r * 3), h);
          ctx.rect(
            w - (r / 2),
            (r * 3) + ((this.dist - 100) / ((Engine.cW / 3) - 100) * (h - (r * 6))),
            r, 4
          );
          ctx.rect(
            (r * 3) + ((this.focus - 0.5) / 4 * (w - 4 - (r * 6))),
            h - (r / 2),
            4, r
          );
        ctx.strokeStyle = '#0004'
        ctx.stroke();
      ctx.restore();
    }
  }

  public step() {
    if (Input.key.down === 'KeyM') {
      this.on = !this.on;
    }

    if (this.ease === 1) {
      this.target = {
        x: guy.x - (this.view.width / 2) + (this.dist * Math.cos(guy.ang)),
        y: guy.y + 28 - (this.view.height / 2) + (this.dist * Math.sin(guy.ang)),
        z: 1.5
      };
      if (this.easeVal <= 1) {
        this.easeVal += 0.05;
        this.view.x += (this.target.x - this.view.x) * (this.easeVal / 2);
        this.view.y += (this.target.y - this.view.y) * (this.easeVal / 2);
        this.view.z += (this.target.z - this.view.z) * Math.pow(this.easeVal, 2);
      } else {
        this.view.z = this.target.z;
        this.ease = 0;
      }
    } else if (this.ease === -1) {
      if (this.easeVal >= 0) {
        this.easeVal -= 0.1;
        this.view.x += (this.mainView.x - this.view.x) * ((1 - this.easeVal) / 2);
        this.view.y += (this.mainView.y - this.view.y) * ((1 - this.easeVal) / 2);
        this.view.z += (this.mainView.z - this.view.z) * Math.pow(1 - this.easeVal, 2);
        this.mainView.update();
      } else {
        this.ease = 0;
        World.area.view = this.mainView;
      }
    } else {
      if (this._on) {
        if (Input.isPressed('ArrowUp') && this.dist < Engine.cH / 1.5) {
          this.dist += 20;
        }
        if (Input.isPressed('ArrowDown') && this.dist > 100) {
          this.dist -= 20;
        }
        if (Input.isPressed('ArrowLeft') && this.focus > 0.5) {
          this.focus -= 0.1;
        }
        if (Input.isPressed('ArrowRight') && this.focus < 4.5) {
          this.focus += 0.1;
        }
        if (this.drawingPhoto) {
          this.takePhoto();
          this.drawingPhoto = false;
        }
        if (Input.key.down === 'Space') {
          this.drawingPhoto = true;
        }
        this.view.x = guy.x - (this.view.width / 2) + (this.dist * Math.cos(guy.ang));
        this.view.y = guy.y + 28 - (this.view.height / 2) + (this.dist * Math.sin(guy.ang));
      }
    }
  }

  public focusDraw(
    obj: GameObject,
    drawFunc: (CanvasRenderingContext2D)=>void
  ) {
    let ctx = Engine.getCanvasContext(),
        blur = 0.9 - Math.pow(1 - Math.abs((obj.z - this.focus) / 4), 3);
    blur = blur < 0. ? 0 : blur * 2;
    if (
      !this.on ||
      this.ease !== 0 ||
      !obj.checkCollision(
        this.viewPort.x,
        this.viewPort.y,
        this.viewPort.w,
        this.viewPort.h
      ) ||
      blur === 0
    ) {
      drawFunc.call(obj);
    } else {
      ctx.save();
        if (this.drawingPhoto) {
          ctx.imageSmoothingEnabled = true;
          ctx.filter = 'blur(' + blur + 'px)';
          if (obj !== guy) {
            drawFunc.call(obj, ctx);
          }
        } else {
          ctx.globalAlpha = 0.5;
            ctx.save();
              ctx.translate(0, -blur);
              drawFunc.call(obj);
              ctx.translate(0, 2 * blur);
              drawFunc.call(obj);
            ctx.restore();
          drawFunc.call(obj);
        }
      ctx.restore();
    }
  }
  
  private takePhoto() {
    let pad = 10;
    this.photoCtx.fillRect(0, 0, this.photoCan.width, this.photoCan.height);
    this.photoCtx.drawImage(
      Engine.getCanvasEl(),
      ((this.viewPort.x - this.view.x) * this.view.z) + pad,
      ((this.viewPort.y - this.view.y) * this.view.z) + pad,
      (this.viewPort.w * this.view.z) - pad,
      (this.viewPort.h * this.view.z) - pad,
      0, 0,
      this.photoCan.width, this.photoCan.height
    );
    let image = document.createElement('img');
    image.src = this.photoCan.toDataURL('image/png');
    image.style.position = 'fixed';
    image.style.top = '0px';
    image.style.left = '0px';
    document.body.appendChild(image);
    this.album.push(image);
  }
}
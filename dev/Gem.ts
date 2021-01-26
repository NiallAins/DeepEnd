import {
  GameObject,
  Light
} from 'Bunas';
import Block from 'Block';

export default class Gem extends GameObject {
  public static readonly types: {name: string, value: number, color: string, pureColor: string}[] = [
    { name: 'Aquamarine', color: '#19A', pureColor: '#4CD',  value: 1 },
    { name: 'Rhodonite', 	color: '#C15', pureColor: '#F48',  value: 3 },
    { name: 'Amethyst', 	color: '#A0C', pureColor: '#D0F',  value: 8 },
    { name: 'Lapis', 			color: '#00C', pureColor: '#31F',  value: 15 },
    { name: 'Amber', 			color: '#CA2', pureColor: '#FC5',  value: 24 },
    { name: 'Jade', 			color: '#2A1', pureColor: '#5D4',  value: 35 },
    { name: 'Obsidian', 	color: '#405', pureColor: '#738',  value: 50 }
  ];
  public static freeGems: Gem[] = [];
  public static gemCount : number[] = Gem.types.map(() => 0);
  public source: Light.Source;
  private color: string;
  private dx: number;
  private dy: number;
  private dAng: number;

	constructor(
		x: number,
		y: number,
    public type: number,
    public ang: number
	) {
    super(x, y, 0, 10);
    this.color = Gem.types[this.type].color;

    this.source = new Light.Source(x, y, 1, this.color + '0', false);
    this.source.bindPosition(this);
    this.source.customMask = ((ctx, rad, color) => {
      [
        {r: 0.6, s: 0, f: 6.283},
        {r: 0.85, s: ang, f: 0.5 + ang},
        {r: 1, s: 2.3 + ang, f: 2.8 + ang},
        {r: 0.7, s: 4 + ang, f: 4.5 + ang}
      ].forEach(arc => {
        let grdRad = ctx.createRadialGradient(0, 0, 0, 0, 0, rad * arc.r);
        grdRad.addColorStop(0, color);
        grdRad.addColorStop(1, color.substring(0, 7) + '00');
        ctx.fillStyle = grdRad;
        ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(
            0, 0,
            rad * arc.r,
            arc.s, arc.f
          );
          ctx.lineTo(0, 0);
        ctx.fill();
      })
    }).bind(this);
    this.source.active = false;
  }
  
  public step(dt: number) {
    if (this.dx || this.dy) {
      this.dx *= 0.99;
      this.dy *= 0.99;
      this.dy += 0.02;
      this.x += this.dx * dt;
      this.y += this.dy * dt;
      this.ang += this.dAng;

      // Bounce off blocks
      const b: any = Block.current.find(b => this.checkCollision(b));
      if (b) {
        this.x -= this.dx * dt;
        this.y -= this.dy * dt;
        if (this.x > b.x + b.colBox.x && this.x < b.x + b.colBox.x + b.colBox.width) {
          this.dy *= -1;
          this.dx += this.dAng * (this.y < b.y + b.colBox.y ? 5 : -5);
        } else {
          this.dx *= -1;
          this.dy += this.dAng * (this.x < b.x + b.colBox.x ? -5 : 5);
        }
        this.dAng *= 0.8;
        this.x += this.dx;
        this.y += this.dy;
      }
    }
  }

  public free() {
    this.dx = Math.floor(10 * Math.random()) - 5;
    this.dy = Math.floor(10 * Math.random()) - 5;
    this.dAng = 0.5 - Math.random();
    this.source.bindPosition(this, 0, 0, 0, 0, 0, true);
    Gem.freeGems.push(this);

    if (Gem.freeGems.length > 80) {
      (
        Gem.freeGems.find(g => !g.inView) ||
        Gem.freeGems[0]
      ).delete();
    } 
  }

  public hit() {
    Gem.gemCount[this.type] += 1;
    this.delete();
  }
  
	public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
      ctx.translate(this.x + 5, this.y + 5);
      ctx.rotate(this.ang);
      ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(0, -6);
        ctx.lineTo(10, -2);
        ctx.lineTo(6, 10);
        ctx.lineTo(-4, 8);
      ctx.fillStyle = this.color;
      ctx.fill();
    ctx.restore();
  }
  
  public delete() {
    Gem.freeGems.splice(Gem.freeGems.findIndex(g => g === this), 1);
    this.source.delete();
    super.delete();
  }
}
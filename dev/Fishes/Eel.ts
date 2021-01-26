import { Light } from '../Bunas';
import { guy } from '../main';
import { Fish } from 'FishBase';

export class Eel extends Fish {
  private nodes: {
    position: {x: number, y: number},
    velocity: {x: number, y: number},
    force:    {x: number, y: number},
    block:    Light.Block
  }[] = [];
  private readonly elastic: number = 0.9;
  private readonly thickness: number = 8;
  private readonly fric: number = 0.1;
  private wiggle: number = 1;
  public ang: number = 0;
  private speed: number[] = [3, 8, 0, 4];
  // states [neutral, chase, attack, flee]
  private state: number = 0;

  constructor(
    x: number,
    y: number,
    length: number
  ) {
    super(x, y, 20);
    this.nodes = [];
    
    let nodeNum = length / (this.thickness * 2);
    for(let i = 0; i < nodeNum; i++) {
      this.nodes.push({
        position: { x: x - (i * this.thickness * 2), y: y },
        velocity: { x: 0, y: 0 },
        force:    { x: 0, y: 0 },
        block:    new Light.Block(x - (i * this.thickness * 2), y, {width: this.thickness * 2, height: this.thickness * 2})
      });
    }
  }

  public step() {
    this.wiggle += this.state === 0 ? 0.1 : 0.4;
    if (this.wiggle > 12.6) {
      if (this.state === 0) {
        this.ang += (Math.random() * 2) - 1;
      }
      this.wiggle = 0;
    }
    if (this.state === 1) {
      this.ang = Math.atan2(guy.y - this.y + 32, guy.x - this.x + 32);
    }
    let a = this.ang + (Math.sin(this.wiggle) * (this.state === 0 ? 1 : 0.5));
    this.x += Math.cos(a) * this.speed[this.state];
    this.y += Math.sin(a) * this.speed[this.state];

    this.nodes[0].position.x = this.x;
    this.nodes[0].position.y = this.y;

    for(let i = 0; i < this.nodes.length; i++) {
      let n = this.nodes[i];
      if (i > 0) {
        let
          nPrev = this.nodes[i - 1],
          ang = Math.atan2(
            nPrev.position.y - n.position.y,
            nPrev.position.x - n.position.x
          ),
          nearN = {
            x: n.position.x + (Math.cos(ang) * this.thickness),
            y: n.position.y + (Math.sin(ang) * this.thickness)
          },
          nearNp = {
            x: nPrev.position.x + (Math.cos(ang + Math.PI) * this.thickness),
            y: nPrev.position.y + (Math.sin(ang + Math.PI) * this.thickness)
          };
        n.force.x += (nearNp.x - nearN.x) * this.elastic;
        n.force.y += (nearNp.y - nearN.y) * this.elastic;
        nPrev.force.x += (nearN.x - nearNp.x) * this.elastic;
        nPrev.force.y += (nearN.y - nearNp.y) * this.elastic;

        n.force.x += n.velocity.x * -this.fric;
        n.force.y += n.velocity.y * -this.fric;
        n.velocity.x += n.force.x;
        n.velocity.y += n.force.y;
        n.position.x += n.velocity.x;
        n.position.y += n.velocity.y;
        n.force = {x: 0, y: 0};
      }
      n.block.x = n.position.x;
      n.block.y = n.position.y;
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
      ctx.beginPath();
        ctx.moveTo(this.nodes[0].position.x, this.nodes[0].position.y);
        let n = 1;
        for (; n < this.nodes.length - 2; n++) {
          let xc = (this.nodes[n].position.x + this.nodes[n + 1].position.x) / 2,
              yc = (this.nodes[n].position.y + this.nodes[n + 1].position.y) / 2;
          ctx.quadraticCurveTo(this.nodes[n].position.x, this.nodes[n].position.y, xc, yc);
        }
        ctx.quadraticCurveTo(
          this.nodes[n].position.x,
          this.nodes[n].position.y,
          this.nodes[n + 1].position.x,
          this.nodes[n + 1].position.y
        );
        ctx.lineWidth = this.thickness * 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'white';
      ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
    ctx.restore();
  }
}
import {
  GameObject,
  Light,
	Graphics,
	Engine
} from './Bunas';
import { levelBlocks, camera, gems, rand } from './main';

let
	blockWidth: number,
	tileWidth: number,
	bgTileSet: Graphics.TileSet,
	fgTileSet: Graphics.TileSet,
	gemsTile: Graphics.TileSet,
	caveBg: Graphics.TileSet;

export default class extends GameObject {
	public width: number;
	public gem: {type: number, ang: number, x: number, y: number, source: Light.Source, edge: boolean};
	private isCave: boolean = false;
	private randTile: number;
	private lightBlock: Light.Block;
	private tiles = {
		bgSet: bgTileSet,
		fgSet: fgTileSet,
		bgType: [0, 0, 0, 0],
		fgType: [0, 0, 0, 0],
		x: [0, 0, 0, 0],
		y: [0, 0, 0, 0]
	}

	constructor(
		x: number,
		y: number,
		gem: number = -1,
		public hardness: number,
		blockLayout?: boolean[]
	) {
		super(x, y, 0.1, blockWidth, {x: -tileWidth, y: -tileWidth, width: blockWidth * 2});
		this.width = blockWidth;
		levelBlocks.push(this);
		if (gem > -1) {
			let	ang = rand(6.28, 0),
					dist = rand(25, 0, true);
			this.gem = {
				type: gem,
				ang: ang,
				x: this.x + tileWidth + (Math.cos(ang) * dist),
				y: this.y + tileWidth + (Math.sin(ang) * dist),
				source: null,
				edge: false
			};
			this.gem.source  = new Light.Source(this.gem.x, this.gem.y, 1, gems[gem].color + '0', false);
			this.gem.source.customMask = ((ctx, rad, color) => {
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
			this.gem.source.active = false;
		}
		this.randTile = rand(4, 0, true);
		this.setTiles(blockLayout);
	}

	public static setDefaultWidths(width: number) {
		blockWidth = width;
		tileWidth = width / 2;
		bgTileSet = new Graphics.TileSet('block_bg', blockWidth, blockWidth);
		fgTileSet = new Graphics.TileSet('block_fg', tileWidth, tileWidth);
		gemsTile = new Graphics.TileSet('gemsTile', tileWidth, tileWidth);
		caveBg = new Graphics.TileSet('caveBg', 64, 64);
	}

	public setTiles(blocks: boolean[] = []) {
		let prevType = [];
		
		if (!blocks.length) {
			if (this.hardness === 0) {
				this.tiles.bgType.forEach(t => prevType.push(t));
			}

			for (let y = -1; y <= 1; y++) {
				for (let x = -1; x <= 1; x++) {
					if (x !== 0 || y !== 0) {
						let checkX = this.x + (tileWidth) + (x * blockWidth),
								checkY = this.y + (tileWidth) + (y * blockWidth);
						blocks.push(levelBlocks.some(b => b.checkCollision(checkX, checkY)));
					}
				}
			}
		}

		let tileOffset = tileWidth;
		this.tiles.x = [
			this.x - tileOffset,
			this.x + tileOffset,
			this.x - tileOffset,
			this.x + tileOffset
		];
		this.tiles.y = [
			this.y - tileOffset,
			this.y - tileOffset,
			this.y + tileOffset,
			this.y + tileOffset
		];

		// top left tile
		if (blocks[1]) {
			if (blocks[3]) {
				this.tiles.bgType[0] = blocks[0] ? 6 : 9;
			} else {
				this.tiles.bgType[0] = 5;
			}
		} else {
			this.tiles.bgType[0] = blocks[3] ? 1 : 0;
		}
		if (this.tiles.bgType[0] === 1 || this.tiles.bgType[0] === 6) {
			this.tiles.x[0] += tileOffset
		}
		if (this.tiles.bgType[0] === 5 || this.tiles.bgType[0] === 6) {
			this.tiles.y[0] += tileOffset
		}

		// top right tile
		if (blocks[1]) {
			if (blocks[4]) {
				this.tiles.bgType[1] = blocks[2] ? 6 : 8
			} else {
				this.tiles.bgType[1] = 7;
			}
		} else {
			this.tiles.bgType[1] = blocks[4] ? 1 : 2;
		}
		if (this.tiles.bgType[1] === 7 || this.tiles.bgType[1] === 6) {
			this.tiles.y[1] += tileOffset;
		}

		// bottom left tile
		if (blocks[3]) {
			if (blocks[6]) {
				this.tiles.bgType[2] = blocks[5] ? 6 : 4
			} else {
				this.tiles.bgType[2] = 11;
			}
		} else {
			this.tiles.bgType[2] = blocks[6] ? 5 : 10;
		}
		if (this.tiles.bgType[2] === 11 || this.tiles.bgType[2] === 6) {
			this.tiles.x[2] += tileOffset;
		}

		// bottom right tile
		if (blocks[4]) {
			if (blocks[6]) {
				this.tiles.bgType[3] = blocks[7] ? 6 : 3;
			} else {
				this.tiles.bgType[3] = 11;
			}
		} else {
			this.tiles.bgType[3] = blocks[6] ? 7 : 12;
		}
		
		let t = this.tiles.bgType;
		if (t[0] !== 6 || t[1] !== 6 || t[2] !== 6 || t[3] !== 6) {
			let tilePad = 8;
			let lightMask = [
				{
					x: t[0] === 0 || t[0] === 5 ? tilePad : 0,
					y: t[0] === 0 || t[0] === 1 ? tilePad : 0
				},
				{
					x: t[1] === 2 || t[1] === 7 ? blockWidth - tilePad : blockWidth,
					y: t[1] === 1 || t[1] === 2 ? tilePad : 0
				},
				{
					x: t[3] === 7 || t[3] === 12 ? blockWidth - tilePad : blockWidth,
					y: t[3] === 11 || t[3] === 12 ? blockWidth - tilePad : blockWidth
				},
				{
					x: t[2] === 5 || t[2] === 10 ? tilePad : 0,
					y: t[2] === 10 || t[2] === 11 ? blockWidth - tilePad : blockWidth
				}
			];

			if (this.lightBlock) {
				this.lightBlock.mask = lightMask;
			} else {
				this.lightBlock = new Light.Block(this.x, this.y, lightMask, this.draw.bind(this), true);
			}
		}

		if (this.gem && this.tiles.bgType.some(t => t !== 6)) {
			this.gem.edge = true;
		}

		this.tiles.fgType = this.tiles.bgType.map(t => {
			switch(t) {
				case 0: t = 11; break;
				case 1: t = [12, 13][this.randTile % 2]; break;
				case 2: t = 14; break;
				case 3: t = 6; break;
				case 4: t = 9; break;
				case 5: t = [21, 31][this.randTile % 2]; break;
				case 6: t = [22, 23, 32, 33][this.randTile]; break;
				case 7: t = t = [24, 34][this.randTile % 2]; break;
				case 8: t = 36; break;
				case 9: t = 39; break;
				case 10: t = 41; break;
				case 11: t = [42, 43][this.randTile % 2]; break;
				case 12: t = 44; break;
			}
			return t;
		});

		this.tiles.bgType = this.tiles.bgType.map((t, i) => {
			if (prevType && (prevType[i] === 6 || prevType[i] > 14)) {
				return 30;
			}
			return t + (15 * this.hardness);
		});
		this.tiles.fgType = this.tiles.fgType.map((t, i) => {
			if (prevType && (prevType[i] === 6 || prevType[i] > 14)) {
				return t + 60;
			}
			return t + (60 * this.hardness);
		});
		
	}

	public break() {
		this.delete();
		this.isCave = true;
		this.z -= 0.1;
		
		// Set Cave BG
		this.tiles.bgSet = caveBg;
		this.tiles.bgType = [0, 1, 2, 3];
		let blocks = [];
		for (let y = -1; y <= 1; y++) {
			for (let x = -1; x <= 1; x++) {
				if (x !== 0 || y !== 0) {
					let checkX = this.x + (tileWidth) + (x * blockWidth),
							checkY = this.y + (tileWidth) + (y * blockWidth);
					blocks.push(levelBlocks.some(b => b.checkCollision(checkX, checkY)));
				}
			}
		}
		this.tiles.x = [
			this.x + (blocks[3] ? -16 : 8),
			this.x + tileWidth + (blocks[4] ? 0 : -24),
			this.x + (blocks[3] ? -16 : 8),
			this.x + tileWidth + (blocks[4] ? 0 : -24),
		];
		this.tiles.y = [
			this.y + (blocks[1] ? -16 : 8), 
			this.y + (blocks[1] ? -16 : 8), 
			this.y + tileWidth + (blocks[6] ? 0 : -24), 
			this.y + tileWidth + (blocks[6] ? 0 : -24)
		];
		
		// Change tiles of surrounding blocks
		let dis = Math.pow(blockWidth * 1.5, 2);
		levelBlocks.forEach(b => {
			if (
				b.inView &&
				(Math.pow(b.x - this.x, 2) + Math.pow(b.y - this.y, 2) < dis)
			) {
				b.setTiles();
			}
		});
	}

	public startDraw(ctx: CanvasRenderingContext2D) {
		for (let i = 0; i < 4; i++) {
			if ([3, 4, 6, 8, 9].indexOf(this.tiles.bgType[i] % 15) > -1) {
				this.tiles.bgSet.draw(ctx, this.tiles.x[i], this.tiles.y[i], this.tiles.bgType[i]);
			} else {
				camera.focusDraw(this, () => this.tiles.bgSet.draw(ctx, this.tiles.x[i], this.tiles.y[i], this.tiles.bgType[i]));
			}
		}
	}
	
	public draw(ctx: CanvasRenderingContext2D) {
		if (!this.isCave) {
			camera.focusDraw(this, () => {
				this.tiles.fgSet.draw(ctx, this.x, this.y, this.tiles.fgType[0]);
				this.tiles.fgSet.draw(ctx, this.x + tileWidth, this.y, this.tiles.fgType[1]);
				this.tiles.fgSet.draw(ctx, this.x, this.y + tileWidth, this.tiles.fgType[2]);
				this.tiles.fgSet.draw(ctx, this.x + tileWidth, this.y + tileWidth, this.tiles.fgType[3]);

				if (!this.isCave && this.gem) {
					ctx.save();
						ctx.translate(this.gem.x, this.gem.y);
						ctx.rotate(this.gem.ang);
						gemsTile.draw(ctx, blockWidth / -4, blockWidth / -4, this.gem.type);
					ctx.restore();
				}
			});
		}
	}

	public delete() {
		levelBlocks.splice(levelBlocks.indexOf(this), 1);
		if (this.lightBlock) {
			this.lightBlock.delete();
		}
		if (this.gem) {
			this.gem.source.delete();
		}
	}
}
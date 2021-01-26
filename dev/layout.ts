import { rand } from 'main';
import Block from 'Block';
import Gem from 'Gem';

// Layout Parameters
const
  caveSpacing = 8.5,
  maxCaveOffset = 3,
  maxCaveR = 4,
  minCaveR = 2.6,
  varCaveR = 0.4,
  outOfPlaceGem = 0.05,
  gemDepthVary = 1.5,
  gemDensityMin = 0.2,
  gemDensityMax = 0.6;

// Generate block layout
export default function(
	width: number,
	height: number,
	cellW: number,
	startY: number
) {
	Block.setDefaultWidths(cellW);
  
	let caves = [];
	for (let x = caveSpacing / 4; x < width; x += caveSpacing) {
		for (let y = -0.5; y < height; y += caveSpacing) {
      let caveR = maxCaveR - ((maxCaveR - minCaveR) * y / height),
			    gem = Math.max(0, Math.min(Gem.types.length - 1,
            Math.floor(rand(-1, gemDepthVary) + ((Gem.types.length - gemDepthVary + 1) * y / height))
          ));
			caves.push({
				x: (x + rand(maxCaveOffset, -maxCaveOffset)) * cellW,
				y: (y + rand(maxCaveOffset, -maxCaveOffset)) * cellW,
				r: Math.pow(cellW * caveR * rand(1 + varCaveR, 1 - varCaveR), 2),
        gem: gem,
        gemNum: rand(gemDensityMax, gemDensityMin)
			});
		}
	}


	let layout = [];
	for (let y = 0; y < height; y++) {
		layout.push([]);
		for (let x = 0; x < width; x++) {
			layout[layout.length - 1].push(
				!caves.some(c => Math.pow((x * cellW) - c.x, 2) + Math.pow((y * cellW) - c.y, 2) < c.r)
			);
		}
	}

	layout.forEach((row, y) => {
		row.forEach((col, x) => {
			if (col) {
				let blockLayout = [];
				for (let checkY = -1; checkY <= 1; checkY++) {
					for (let checkX = -1; checkX <= 1; checkX++) {
						if (checkX !== 0 || checkY !== 0) {
							blockLayout.push(layout[y + checkY] && layout[y + checkY][x + checkX]);
						}
					}
				}
				// Inherit gem from cave gem type
				let nearCave =
					caves.map(c => {
							return {
								dist: (Math.pow(c.x - (x * cellW), 2) + Math.pow(c.y - (y * cellW), 2)),
								gem: c.gem,
								gemNum: c.gemNum
							}
						})
						.sort((a, b) => a.dist - b.dist)
						[0];
				
				let r = rand(),
						gem;
				if (r < outOfPlaceGem) {
					gem = rand(Gem.types.length, 0, true);
				} else if (r < nearCave.gemNum) {
					gem = nearCave.gem;
				} else {
					gem = -1;
				}

				let hardness = 0;
				if (y > 20) {
					hardness++;
				}
				new Block(x * cellW, (startY + y) * cellW, gem, hardness, blockLayout);
			}
		});
  });
}
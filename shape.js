/*
  
  GENE RULES:
    0: Angle of branches. [-10 to 10]
    1: Thickness of branches. [0 to 10]
    2: XPos of first bezier control point. [-10 to 10]
    3: Divisor for YPos of first bezier control point. [1 to 21]
    4. XPos of second bezier control point. [-10 to 10]
    5. Divisor for YPos of second bezier control point. [1 to 21]
    6. Line length. [0 to 120]
    7. Rotation divisor. [1 to 361]

*/

class Shape {
  constructor(isParent, canvas, ctx, generation, ...genes) {
    if (genes.length !== GENE_COUNT) {
      throw new Error(`Received ${genes.length} genes, expected ${GENE_COUNT}. Aborting constructor...`);
    }

    this.isParent = isParent;
    this.canvas = canvas;
    this.ctx = ctx;
    this.generation = generation;
    this.genes = genes;

    get.id("generationNumber").innerHTML = generation-1;

    this.draw(this.ctx);
    if (this.isParent) {
      this.spawnChildren();
    }
  }

  statusInfo(ctx) {
    ctx.font = "bold 20px Patua One";
    ctx.fillText(`Generation ${this.generation}`, 10, 30);

    ctx.font = "bold 15px Patua One";
    ctx.fillText(JSON.stringify(this.genes), 10, 50);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.isParent) {
      this.statusInfo(ctx);
      ctx.scale(1, 1);
      var pos = [this.canvas.width/2, this.canvas.height];
    }
    else {
      ctx.scale(0.5, 0.5);
      var pos = [this.canvas.width, this.canvas.height*2]
    }
    simpleTree(ctx, ...pos, ...formatGenes(this.genes));
  }

  generateMutationMatrix() {
    let matrix = new Array;
    for (var i = 0; i < GENE_COUNT*2; i++) {
      var _genes = this.genes.slice(0); // clone
      _genes[Math.floor(i/2)] += getAddOrSub(i);
      matrix.push(_genes);
    }

    return matrix;
  }

  spawnChildren() {
    let matrix = this.generateMutationMatrix();
    createChildCanvases(matrix);
    let options = get.class("option");

    Object.values(options).slice(0, GENE_COUNT*2).forEach((_canvas, index) => {
      var _ctx = _canvas.getContext("2d");
      var _shape = new Shape(false, _canvas, _ctx, this.generation + 1, ...matrix[index]);
    });
  }
}
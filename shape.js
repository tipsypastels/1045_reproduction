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
  constructor(canvas, ctx, generation, ...genes) {
    if (genes.length !== GENE_COUNT) {
      throw new Error(`Received ${genes.length} genes, expected ${GENE_COUNT}. Aborting constructor...`);
    }

    this.canvas = canvas;
    this.ctx = ctx;
    this.generation = generation;
    this.genes = genes;

    this.draw();
  }

  statusInfo() {
    this.ctx.font = "bold 20px Patua One";
    this.ctx.fillText(`Generation ${this.generation}`, 10, 30);

    this.ctx.font = "bold 15px Patua One";
    this.ctx.fillText(JSON.stringify(this.genes), 10, 50);
  }

  draw() {
    this.statusInfo();
    simpleTree(this.ctx, this.canvas.width/2, this.canvas.height, ...formatGenes(this.genes));
  }

  generateMutationMatrix() {
    let matrix = new Array;
    for (var i = 0; i < this.genes.length*2; i++) {
      var _genes = this.genes.slice(0); // clone
      _genes[Math.floor(i/2)] += getAddOrSub(i);
      matrix.push(_genes);
    }

    return matrix;
  }

  spawnChildren() {

  }
}
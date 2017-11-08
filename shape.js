class Shape {
  constructor(...genes) {
    if (genes.length !== GENE_COUNT) {
      throw new Error(`Received ${genes.length} genes, expected ${GENE_COUNT}. Aborting constructor...`);
    }

    this.genes = genes;
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
}
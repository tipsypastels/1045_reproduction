const getAddOrSub = i => (i % 2 === 0) ? 1 : -1;

const createChildCanvases = matrix => {
  var array = new Array;
  for (var i = 0; i < GENE_COUNT*2; i++) {
    array.push(`<canvas class="option" width="200" height="200" id="child_${i}" data-genes="${matrix[i].join(',')}"></canvas>`);
  }
  get.id("options").innerHTML = array.join("\n");
}

const parseGeneString = geneString => {
  return geneString.split(",").map(gene => {
    return parseInt(gene);
  });
}
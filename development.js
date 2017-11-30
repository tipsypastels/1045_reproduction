const simpleTree = (ctx, startX, startY, angle, branchThickness, bzInfo, length, rotDiv) => {
  ctx.lineWidth = branchThickness;
  ctx.beginPath();
  ctx.save();
  
  ctx.translate(startX, startY);
  ctx.rotate(angle * Math.PI/rotDiv);
  ctx.moveTo(0, 0);
  
  ctx.bezierCurveTo(
    bzInfo[0], 
    -length*bzInfo[1], 
    bzInfo[2], 
    -length*bzInfo[3], 
    0, -length
  );
  ctx.stroke();
  
  if (length < 10) {
    ctx.restore();
    return;
  }
  
  simpleTree(ctx, 0, -length, -15, branchThickness*0.8, bzInfo, length*0.8, rotDiv);
  simpleTree(ctx, 0, -length, 15, branchThickness*0.8, bzInfo, length*0.8, rotDiv);
  
  ctx.restore();
};

const formatGenes = genes => {
  if (genes.length !== GENE_COUNT) {
    throw new Error("Incorrect gene number provided.");
  }

  /*

    Format all genes for the appropriate ranges.
    See shape.js#doc for the list.
  
  */

  return [
    genes[0],
    (genes[1] + 10)/2,
    [
      genes[2],
      genes[3]+11,
      genes[4],
      genes[5]+11
    ],
    (genes[6]+10)*6,
    (genes[7]+10)*18+1
  ];
};

/*

  DEBUG FUNCTIONS
    Not to be used in production code.

*/
const randomGeneArray = () => {
  var array = new Array;
  for (var i = 0; i < GENE_COUNT; i++) {
    array.push(Math.floor((Math.random()*18)-9));
  }
  return array;
}

const testRandomParents = (canvas, ctx) => {
  var loop = setInterval(function(){
    var shape = new Shape(true, canvas, ctx, 0, ...randomGeneArray());
  }, 1000);
}
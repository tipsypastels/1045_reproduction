const get = {
  id: id => document.getElementById(id),
  "class": _class => document.getElementByClassName(_class)
};

window.onload = () => {
  const canvas = get.id("canvas");
  const ctx = canvas.getContext('2d');

  // let shape = new Shape(canvas, ctx, 0, ...GENE_STARTING_VALUES);

  var loop = setInterval(function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var shape = new Shape(canvas, ctx, 0, ...randomGeneArray());
  }, 1000);

}
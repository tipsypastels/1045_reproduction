const get = {
  id: id => document.getElementById(id),
  "class": _class => document.getElementsByClassName(_class)
};

window.onload = () => {
  const canvas = get.id("canvas");
  const ctx = canvas.getContext('2d');
  // createChildCanvases();


  var shape = new Shape(true, canvas, ctx, 0, ...GENE_STARTING_VALUES);

  // testRandomParents(canvas, ctx);

  const toggleHelp = function() {
    let modal = get.id("modal");
    switch(modal.style.display) {
      case "none":
        modal.style.display = "block";
        break;
      default:
        modal.style.display = "none";
    }
  };

  const chooseChild = function() {
    let newGenes = parseGeneString(this.dataset.genes);
    shape = new Shape(true, canvas, ctx, shape.generation + 1, ...newGenes);
    createChildHandlers();
  };

  const createChildHandlers = function() {
    // i hate myself
    for (var i = 0; i < GENE_COUNT*2; i++) {
      get.id(`child_${i}`).onclick = chooseChild;
    }
  }

  get.id("body").onkeypress = e => {
    if (e.key == 'h') toggleHelp();
  };

  get.id("close").onclick = toggleHelp;

  createChildHandlers();
}
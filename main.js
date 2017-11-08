const get = {
  id: id => document.getElementById(id),
  "class": _class => document.getElementByClassName(_class)
};

window.onload = () => {
  const canvas = get.id("canvas");
  const ctx = canvas.getContext('2d');

  let shape = new Shape(...GENE_STARTING_VALUES);
  console.log(shape.generateMutationMatrix());
}
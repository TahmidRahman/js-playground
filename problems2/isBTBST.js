let define_bst = (root, min, max) => {
  if (!root) {
    return true;
  }
  if (root.data < min || root.data > max) {
    return false;
  } else {
    return (
      define_bst(root.left, min, root.data - 1) &&
      define_bst(root.right, root.data + 1, max)
    );
  }
};
let is_bst = function (root) {
  //TODO: Write - Your - Code
  return define_bst(root, Number.MIN_VALUE, Number.MAX_VALUE);
};

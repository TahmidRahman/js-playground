var isOverlap = (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) => {
  return ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1;
};

var getOverlap = (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) => {
  if (isOverlap(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2)) {
    var width = Math.min(ax2, bx2) - Math.max(ax1, bx1);
    var height = Math.min(ay2, by2) - Math.max(ay1, by1);
    return width * height;
  } else {
    return 0;
  }
};

var computeArea = function (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  var aArea = (ax2 - ax1) * (ay2 - ay1);
  var bArea = (bx2 - bx1) * (by2 - by1);
  var overlap = getOverlap(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2);
  return aArea + bArea - overlap;
};

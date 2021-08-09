// BFS traversal

let level_order_traversal = function (root) {
  let result = '';
  //TODO: Write - Your - Code
  if (!root) {
    return;
  }
  let queues = [[], []];
  let current_queue = queues[0];
  let next_queue = queues[0];

  current_queue.push(root);
  let level_number = 0;

  while (current_queue.length > 0) {
    let temp = current_queue.shift();
    result += `${temp.data} `;
    if (temp.left) {
      next_queue.push(temp.left);
    }

    if (temp.right) {
      next_queue.push(temp.right);
    }

    if (!current_queue.length) {
      level_number++;
      current_queue = queues[level_number % 2];
      next_queue = queues[(level_number + 1) % 2];
    }
  }
  return result;
};

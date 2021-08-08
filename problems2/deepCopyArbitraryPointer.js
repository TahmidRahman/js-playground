let deep_copy_arbitrary_pointer = function (head) {
  //TODO: Write - Your - Code
  let ht = new Map();
  let new_head = null;
  let new_prev = null;
  let current = head;

  while (current) {
    let new_node = new LinkedListNode(current.data);
    new_node.arbitrary = current.arbitrary;
    ht.set(current, new_node);

    if (new_prev) {
      new_prev.next = new_node;
    } else {
      new_head = new_node;
    }
    new_prev = new_node;
    current = current.next;
  }

  let new_current = new_head;

  while (new_current) {
    if (new_current.arbitrary) {
      new_current.arbitrary = ht.get(new_current.arbitrary);
    }
    new_current = new_current.next;
  }
  return new_head;
};

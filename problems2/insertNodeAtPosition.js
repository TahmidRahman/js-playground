function insertNodeAtPosition(llist, data, position) {
  // Write your code here
  const newNode = new SinglyLinkedListNode(data);
  let current = llist;
  for (let currentPosition = 0; current.next; currentPosition++) {
    if (currentPosition == position - 1) {
      newNode.next = current.next;
      if (position > 0) {
        current.next = newNode;
      }
    }
    current = current.next;
  }

  return llist;
}

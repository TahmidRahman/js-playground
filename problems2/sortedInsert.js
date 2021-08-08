function sortedInsert(llist, data) {
  // Write your code here
  let head = llist;
  let prevData = null;
  let newNode = new DoublyLinkedListNode(data);
  let rest;

  if (!llist) {
    return newNode;
  } else if (data <= head.data) {
    newNode.next = head;
    head.prev = newNode;
    return newNode;
  } else {
    rest = sortedInsert(head.next, data);
    head.next = rest;
    rest.prev = head;
    return head;
  }
  return llist;
}

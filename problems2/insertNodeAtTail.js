function insertNodeAtTail(head, data) {
  if (!head) {
    let newHead = new SinglyLinkedListNode(data);
    newHead.next = head;
    return newHead;
  } else {
    let current = head;
    while (current.next) {
      current = current.next;
    }
    let newTail = new SinglyLinkedListNode(data);
    current.next = newTail;
    newTail.next = null;
  }

  return head;
}

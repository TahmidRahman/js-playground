function reverse(llist) {
  // Write your code here
  let temp = llist;
  let newHead = llist;
  while (temp) {
    let prev = temp.prev;
    temp.prev = temp.next;
    temp.next = prev;
    newHead = temp;
    temp = temp.prev;
  }

  return newHead;
}

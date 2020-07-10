function activityNotifications(expenditure, d) {
  let notificationCount = 0;
  let count = new Array(201).fill(0);
  let trailing = expenditure.slice(0, d);
  trailing.forEach((expense) => {
    ++count[expense];
  });
  let median;
  let leftIndex = Math.floor((d - 1) / 2);
  let rightIndex = Math.ceil((d - 1) / 2);
  let leftMedian;
  let rightMedian;

  for (let i = d; i < expenditure.length; i++) {
    for (let j = 0, k = 0; k <= leftIndex; j++) {
      k += count[j];
      leftMedian = j;
    }

    if (leftIndex == rightIndex) {
      median = leftMedian;
    } else {
      for (let j = 0, k = 0; k <= rightIndex; j++) {
        k += count[j];
        rightMedian = j;
      }
      median = (leftMedian + rightMedian) / 2;
    }

    if (expenditure[i] >= 2 * median) {
      notificationCount++;
    }

    count[expenditure[i - d]]--;
    count[expenditure[i]]++;
  }

  return notificationCount;
}

const {
  inputObject: { arr, d },
} = require('./input');
const { expect } = require('../test');

expect(activityNotifications(arr, d)).toBe(633);
expect(activityNotifications([3, 4, 2, 4, 8, 6], 4)).toBe(1);
expect(activityNotifications([2, 3, 4, 2, 3, 6, 8, 4, 5], 5)).toBe(2);

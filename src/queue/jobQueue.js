const { Heap } = require('heap-js');

class JobQueue {
  constructor() {
    this.heap = new Heap((a, b) => {
      // Compare by priority first (lower number = higher priority)
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      // If priorities are equal, compare by creation time
      return a.created_time - b.created_time;
    });
  }

  enqueue(batch) {
    this.heap.push({
      ...batch,
      created_time: Date.now()
    });
  }

  dequeue() {
    return this.heap.pop();
  }

  isEmpty() {
    return this.heap.isEmpty();
  }

  size() {
    return this.heap.size();
  }
}

module.exports = new JobQueue(); // Export singleton instance
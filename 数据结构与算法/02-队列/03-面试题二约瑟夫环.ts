import ArrayQueue from "./01-实现队列结构";

function lastRemaining(n: number, m: number): number {
  const queue = new ArrayQueue<number>();
  for (let i = 0; i < n; i++) {
    queue.enqueue(i);
  }
  while (queue.size() > 1) {
    for (let i = 1; i < m; i++) {
      queue.enqueue(queue.dequeue()!);
    }
    queue.dequeue();
  }
  return queue.dequeue()!;
}
console.log(lastRemaining(5, 3)); // 3
console.log(lastRemaining(10, 17)); // 2

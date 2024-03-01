import ArrayQueue from "./01-实现队列结构";

function hotPotato(names: string[], num: number): number {
  if (!names.length) return -1;
  const queue = new ArrayQueue<string>();
  for (let name of names) {
    queue.enqueue(name);
  }
  while (queue.size() > 1) {
    for (let i = 1; i < num; i++) {
      const name = queue.dequeue();
      if (name) queue.enqueue(name);
    }
    queue.dequeue();
  }
  const lastName = queue.dequeue()!;
  return names.indexOf(lastName);
}

const leftIndex = hotPotato(
  ["why", "james", "kobe", "curry", "abc", "cba", "nba", "mba"],
  4
);
console.log(leftIndex);

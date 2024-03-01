import IList from "../types/IList";

export default interface IQueue<T> extends IList<T> {
  enqueue(element: T): void;
  dequeue(): T | undefined;
}

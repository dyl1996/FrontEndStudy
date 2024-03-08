/**
 * 类型参数化
 */
function useState<T>(initialState: T): [T, (newState: T) => void] {
  let state = initialState;
  function setState(newState: T): void {
    state = newState;
  }
  return [state, setState];
}

/**
 * 泛型接口
 */
interface Person<T, K> {
  name: T;
  age: K;
}

/**
 * 泛型类
 */
class Point<T, K> {
  x: T;
  y: K;
  constructor(x: T, y: K) {
    this.x = x;
    this.y = y;
  }
}

/**
 * 泛型约束 extends
 */
interface ILength {
  length: number;
}
function getInfo<T extends ILength>(args: T): T {
  return args;
}

// keyof 获取类型O的key的字面量联合类型
function getObjectProperty<O, K extends keyof O>(o: O, k: K): O[K] {
  return o[k];
}

/**
 * 映射类型
 */

export default {};

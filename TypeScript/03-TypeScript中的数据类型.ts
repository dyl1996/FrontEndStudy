/**
 * Array
 * string[type]
 * Array<type>
 */
let names: string[] = ["a", "b"];
let nums: Array<number> = [1, 2, 3];

/**
 * Object
 */
type IInfo = {
  name: string;
  age: number;
  height: number;
};
let info: IInfo = {
  name: "why",
  age: 18,
  height: 1.88,
};

/**
 * 函数参数与返回值
 * 参数需要明确指定类型
 * 返回值类型可以明确的指定, 也可以自动进行类型推导
 * 匿名函数是否需要添加类型注解呢? 最好不要添加类型注解
 */
function sum(num1: number, num2: number): number {
  return num1 + num2;
}
names.forEach(function (item, index, arr) {
  console.log(item, index, arr);
});

/**
 * any
 * any类型就表示不限制标识符的任意类型, 并且可以在该标识符上面进行任意的操作(在TypeScript中回到JavaScript中)
 */
let id: any = "aaa";
id = 123;
id = false;

/**
 * unknown
 * unknown类型默认情况下在上面进行任意的操作都是非法的
 * 要求必须进行类型的校验(缩小), 才能根据缩小之后的类型, 进行对应的操作
 */
let foo: unknown = "aaa";
foo = 123;
if (typeof foo === "string") {
  console.log(foo.length);
}

/**
 * void
 * 1.在TS中如果一个函数没有任何的返回值, 那么返回值的类型就是void类型
 * 2.如果返回值是void类型, 那么我们也可以返回undefined(TS编译器允许这样做而已)
 */

function sum2(num1: number, num2: number): void {
  console.log(num1 + num2);
  // return 123 错误的做法
}
type FooFunType = () => void;
const fooFun: FooFunType = () => {};
// 基于上下文类型推导的函数中的返回值如果是void类型, 不强制要求不能返回任何的东西
names.forEach((item: string, index: number, arr: string[]) => {
  console.log(item);
  return 123;
});

/**
 * never
 * 实际开发中只有进行类型推导时, 可能会自动推导出来是never类型, 但是很少使用它
 */

// 返回never
function FooFun2(): never {
  //   while (true) {
  //     console.log("--");
  //   }
  throw new Error("");
}
function parse() {
  return [];
}

// 封装框架/工具库的时候可以使用一下never
// 其他时候在扩展工具的时候, 对于一些没有处理的case, 可以直接报错
function handleMessage(message: string | number | boolean) {
  switch (typeof message) {
    case "string":
      console.log(message.length);
      break;
    case "number":
      console.log(message);
      break;
    case "boolean":
      console.log(Number(message));
      break;
    default:
      const check: never = message;
  }
}

/**
 * 元祖(tuple)
 * 元组数据结构中可以存放不同的数据类型, 取出来的item也是有明确的类型
 */
const info2: [string, number, number] = ["why", 18, 1.88];
const value2 = info2[2];
function useState(initialState: number): [number, (newValue: number) => void] {
  let stateValue = initialState;
  function setValue(newValue: number) {
    stateValue = newValue;
  }
  return [stateValue, setValue];
}

export default {};

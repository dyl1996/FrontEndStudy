/**
 * 表示方式
 */
// 方案一: 函数类型表达式 function type expression
// 格式: (参数列表) => 返回值
type BarType = (num1: number) => number;
const bar: BarType = (arg: number): number => {
  return 123;
};

/**
 * 参数
 * TypeScript对于传入的函数类型的多余的参数会被忽略掉
 */
type CalcType = (num1: number, num2: number) => number;
function calc(calcFn: CalcType) {
  calcFn(10, 20);
}

calc(function (num) {
  return 123;
});

/**
 * 调用签名
 * 1.如果只是描述函数类型本身(函数可以被调用), 使用函数类型表达式(Function Type Expressions)
 * 2.如果在描述函数作为对象可以被调用, 同时也有其他属性时, 使用函数调用签名(Call Signatures)
 */
// 1.函数类型表达式
type BarType2 = (num1: number) => number;

// 2.函数的调用签名(从对象的角度来看待这个函数, 也可以有其他属性)
interface IBar {
  name: string;
  age: number;
  // 函数可以调用: 函数调用签名
  (num1: number): number;
}

const bar2: IBar = (num1: number) => {
  return num1;
};

bar2.age = 18;

/**
 * 构造签名
 * 类型定义中包含构造签名才能new实例化
 */
class Person {}
interface ICTORPerson {
  new (): Person;
}

function factory(P: ICTORPerson) {
  const newP = new P();
  return newP;
}

/**
 * 可选参数
 * number | undefined 联合类型
 */
function foo(x: number, y?: number) {
  if (y !== undefined) {
    console.log(y + 10);
  }
}

/**
 * 默认值参数
 * 有默认值的情况下, 参数的类型注解可以省略
 * 有默认值的参数, 是可以接收一个undefined的值
 */
function foo2(x: number, y = 100) {
  console.log(y + 10);
}
foo2(10);
foo2(10, undefined);
foo2(10, 55);

/**
 * 剩余参数
 */
function foo3(...args: (string | number)[]) {}

/**
 * 重载
 */
function add(arg1: number, arg2: string): number;
function add(arg1: string, arg2: number): string;
function add(arg1: number | string, arg2: number | string): number | string {
  return 1;
}

function add2(arg1: string): number;
function add2(arg1: number[]): number;
function add2(arg1: { length: number }): number {
  return arg1.length;
}

/**
 * 函数中this类型
 * 默认情况下, this是any类型
 * 在设置配置选项(编译选项compilerOptions, noImplicitThis设置为true, 不允许模糊的this存在)
 */

// 1.对象中的函数中的this
const obj = {
  name: "why",
  studying: function (this: {}) {
    // 默认情况下, this是any类型
    console.log(this, "studying");
  },
};
obj.studying.call({});

// 2.普通的函数
function foo4(this: { name: string }, info: { name: string }) {
  console.log(this, info);
}
foo.call({ name: "why" }, { name: "kobe" });

/**
 * this内置工具
 */
function foo5(this: { name: string }, info: { name: string }) {}
type FooType = typeof foo5;

// 1.ThisParameterType: 获取FooType类型中this的类型
type FooThisType = ThisParameterType<FooType>;
// 2.OmitOmitThisParameter: 删除this参数类型, 剩余的函数类型
type PureThisType = OmitThisParameter<FooType>;
// 3.ThisType: 用于绑定一个上下文的this
interface IState {
  name: string;
  age: number;
}
interface IStore {
  state: IState;
  eating: () => void;
  running: () => void;
}

const store: IStore & ThisType<IState> = {
  state: {
    name: "a",
    age: 0,
  },
  eating() {
    console.log(this.name);
  },
  running() {
    console.log(this.age);
  },
};
export default {};

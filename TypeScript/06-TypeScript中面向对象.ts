/**
 * 类的基本使用
 */
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  eating() {
    console.log(this.name + " eating");
  }
  running() {
    console.log(this.name + " running");
  }
}

const p1 = new Person("zs", 18);

/**
 * 成员修饰符
 * public(默认) protected private
 */
class Person2 {
  protected name: string;
  private age: number;
  sex: number = 1;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  private eating() {
    console.log(this.name + " eating");
  }
}

/**
 * readonly修饰符
 */
class Person3 {
  readonly name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const p3 = new Person3("zs", 18);
// p3.name = "ls";

/**
 * setter/getter
 */
class Person4 {
  private _name: string;
  private _age: number;
  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }
  set name(newVal: string) {
    this._name = newVal;
  }
  get name() {
    return this._name;
  }
  set age(newVal: number) {
    if (newVal > 0 && newVal < 200) {
      this._age = newVal;
    }
  }
  get age() {
    return this._age;
  }
}

/**
 * 参数属性
 * 必须加修饰符
 */
class Person5 {
  constructor(
    public name: string,
    private _age: number,
    readonly height: number
  ) {}
}
// 等同于 👇
/*class Person5 {
  public name: string;
  private _age: number;
  readonly height: number;
  constructor(name: string, _age: number, height: number) {
    this.name = name;
    this._age = _age;
    this.height = height;
  }
}*/

const p5 = new Person5("A", 18, 188);
console.log(p5.name, p5.height);

/**
 * 抽象类和抽象方法
 */
abstract class Sharp {
  abstract getArea(): number;
}

class Rectangle extends Sharp {
  constructor(public width: number, public height: number) {
    super();
  }
  getArea(): number {
    return this.width * this.height;
  }
}

class Radius extends Sharp {
  constructor(public radius: number) {
    super();
  }
  getArea(): number {
    return this.radius ** 2 * Math.PI;
  }
}

function calcArea(sharp: Sharp): number {
  return sharp.getArea();
}

calcArea(new Rectangle(20, 20));
calcArea(new Radius(5));
calcArea({
  getArea() {
    return 1;
  },
});

/**
 * 鸭子类型
 * 只关心属性和行为是否一致, 不关心是不是对应的类型
 */
class Person6 {
  constructor(public name: string, public age: number) {}
}
class Person7 {
  constructor(public name: string, public age: number) {}
}
const p6: Person6 = new Person7("zs", 23);

/**
 * 类的作用
 * 1.可以创建类对应的实例对象
 * 2.类本身可以作为这个实例的类型
 * 3.类也可以当成有一个构造签名的函数
 */
class Person8 {}
class Person9 {}
const p8: Person8 = new Person8();
function printPerson(p: Person8) {}
function factory(ctor: new () => Person8) {}
factory(Person8);

/**
 * 对象类型修饰符
 */
type IPerson = {
  name?: string;
  readonly age: number;
};

interface IPerson2 {
  name?: string;
  readonly age: number;
}

/**
 * 索引签名
 * TS的索引签名必须是 string 或者 number。symbols 也是有效的
 */
// 1. number类型索引签名:用来约束数组
interface numberIndex {
  [index: number]: string;
}
const testArr: numberIndex = ["1", "2"];
// 2. string类型索引签名:用于约束对象
interface objIndex {
  [index: string]: { message: string };
}
const testObj: objIndex = {
  a: { message: "hello" },
};
// 3. 同时使用 string 和 number 类型的索引签名
// 数字索引的返回值必须是字符串索引返回值类型的子类型(使用 number 来索引时，JavaScript 会将它转换成 string 然后再去索引对象)
interface Animal {
  name: string;
}
interface Dog extends Animal {
  age: number;
}
interface Okay {
  [index: string]: Animal;
  [index: number]: Dog;
}
// 4. 声明一个索引签名时，所有明确的成员都必须符合索引签名
interface Foo {
  [index: string]: number;
  x: number;
  y: number;
}
// 5. 一个索引签名可以通过映射类型来使索引字符串为联合类型中的一员
type Index = "a" | "b" | "c";
type FromIndex = { [k in Index]?: number };

/**
 * 接口继承
 */
interface Fathor {
  name: string;
}
interface Son extends Fathor {
  age: number;
}

/**
 * 类实现接口
 */
interface Person10 {
  name: string;
  age: number;
  running: () => void;
}

class MyPerson implements Person10 {
  name: string = "";
  age: number = 0;
  running() {}
}

/**
 * 严格字面量复制检测
 *
 */
interface IPerson3 {
  name: string;
  age: number;
}

const info: IPerson3 = {
  name: "why",
  age: 18,

  // 多了一个height属性
  // height: 1.88, ❌
};
const obj = {
  name: "why",
  age: 18,

  // 多了一个height属性
  height: 1.88,
};
const info2: IPerson3 = obj;
export default {};

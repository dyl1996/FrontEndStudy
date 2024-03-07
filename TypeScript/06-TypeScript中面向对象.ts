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

export default {};

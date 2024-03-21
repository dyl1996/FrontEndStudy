/**
 * 装饰器（Decorator）是一种语法结构，用来在定义时修改类（class）的行为。
 * 在语法上，装饰器有如下几个特征。
 * （1）第一个字符（或者说前缀）是@，后面是一个表达式。
 * （2）@后面的表达式，必须是一个函数（或者执行后可以得到一个函数）。
 * （3）这个函数接受所修饰对象的一些相关值作为参数。
 * （4）这个函数要么不返回值，要么返回一个新对象取代所修饰的目标对象。
 */
function simpleDecorator(target: any, context: any) {
  console.log("hi, this is " + target);
  return target;
}

@simpleDecorator
class A {}

/**
 * 装饰器结构
 * value：所装饰的对象。
 * context：上下文对象，TypeScript 提供一个原生接口ClassMethodDecoratorContext，描述这个对象。
 * context对象的属性，根据所装饰对象的不同而不同，其中只有两个属性（kind和name）是必有的，其他都是可选的。
 */

// （1）kind：字符串，表示所装饰对象的类型，可能取以下的值。
// 'class'
// 'method'
// 'getter'
// 'setter'
// 'field'
// 'accessor'
// 这表示一共有六种类型的装饰器。

// （2）name：字符串或者 Symbol 值，所装饰对象的名字，比如类名、属性名等。

// （3）addInitializer()：函数，用来添加类的初始化逻辑。以前，这些逻辑通常放在构造函数里面，对方法进行初始化，现在改成以函数形式传入addInitializer()方法。注意，addInitializer()没有返回值。

// （4）private：布尔值，表示所装饰的对象是否为类的私有成员。

// （5）static：布尔值，表示所装饰的对象是否为类的静态成员。

// （6）access：一个对象，包含了某个值的 get 和 set 方法。
//type Decorator = (
//   value: DecoratedValue,
//   context: {
//     kind: string;
//     name: string | symbol;
//     addInitializer?(initializer: () => void): void;
//     static?: boolean;
//     private?: boolean;
//     access: {
//       get?(): unknown;
//       set?(value: unknown): void;
//     };
//   }
// ) => void | ReplacementValue;

/**
 * 类装饰器
 * 类装饰器接受两个参数：value（当前类本身）和context（上下文对象）。其中，context对象的kind属性固定为字符串class。
 */
// type ClassDecorator = (
//   value: Function,
//   context: {
//     kind: "class";
//     name: string | undefined;
//     addInitializer(initializer: () => void): void;
//   }
// ) => Function | void;

function Greeter(value: Function, context: ClassDecoratorContext) {
  if (context.kind === "class") {
    value.prototype.greet = function () {
      console.log("hello");
    };
  }
}
@Greeter
class User {
  [x: string]: any;
}

let u1 = new User();
u1.greet();

// 类装饰器可以返回一个函数，替代当前类的构造方法。
function CountInstance(value: any, context: ClassDecoratorContext) {
  let instanceCount = 0;
  const wrapper = function (...args: any) {
    instanceCount++;
    const instance = new value(args);
    instance.count = instanceCount;
    return instance;
  } as any;
  wrapper.prototype = value.prototype;
  return wrapper;
}

@CountInstance
class MyClass {
  [x: string]: any;
}

const myClass1 = new MyClass();
console.log(myClass1.count);

// 类装饰器也可以返回一个新的类，替代原来所装饰的类。
function countInstances(value: any, context: any) {
  let instanceCount = 0;
  return class extends value {
    constructor(...args: any[]) {
      super(...args);
      instanceCount++;
      this.count = instanceCount;
    }
  };
}

@countInstances
class MyClass2 {
  [x: string]: any;
}

const inst1 = new MyClass2();
inst1 instanceof MyClass2; // true
inst1.count; // 1

// 下面的例子是通过类装饰器，禁止使用new命令新建类的实例
function functionCallable(value: any, { kind }: ClassDecoratorContext) {
  if (kind === "class") {
    return function (...args: any[]) {
      if (new.target !== undefined) {
        throw new TypeError("This function can’t be new-invoked");
      }
      return new value(...args);
    } as any;
  }
}

@functionCallable
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
const robin = (Person as Function)("Robin");
console.log(robin.name); // 'Robin'

// 类装饰器的上下文对象context的addInitializer()方法，用来定义一个类的初始化函数，在类完全定义结束后执行。
// function customElement(name: string) {
//   return <Input extends new (...args: any) => any>(
//     value: Input,
//     context: ClassDecoratorContext
//   ) => {
//     context.addInitializer(function () {
//       customElements.define(name, value);
//     });
//   };
// }

// @customElement("hello-world")
// class MyComponent extends HTMLElement {
//   constructor() {
//     super();
//   }
//   connectedCallback() {
//     this.innerHTML = `<h1>Hello World</h1>`;
//   }
// }

/**
 * 方法装饰器
 */

// 方法装饰器是一个函数，接受两个参数：value和context。
// 参数value是方法本身，参数context是上下文对象，有以下属性。
// kind：值固定为字符串method，表示当前为方法装饰器。
// name：所装饰的方法名，类型为字符串或 Symbol 值。
// static：布尔值，表示是否为静态方法。该属性为只读属性。
// private：布尔值，表示是否为私有方法。该属性为只读属性。
// access：对象，包含了方法的存取器，但是只有get()方法用来取值，没有set()方法进行赋值。
// addInitializer()：为方法增加初始化函数。
// type ClassMethodDecorator = (
//   value: Function,
//   context: {
//     kind: "method";
//     name: string | symbol;
//     static: boolean;
//     private: boolean;
//     access: { get: () => unknown };
//     addInitializer(initializer: () => void): void;
//   }
// ) => Function | void;

function trace(
  decoratedMethod: () => string,
  context: ClassMethodDecoratorContext
) {
  // ...
  console.log("aaa");
}

class C {
  @trace
  fun1() {
    console.log("some text");
    return "C";
  }
}

const c = new C();
// c.fun1();
// `@trace` 等同于
// C.prototype.toString = trace(C.prototype.toString);

// 如果方法装饰器返回一个新的函数，就会替代所装饰的原始函数。
class PP {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @log
  greet() {
    console.log(`hello ${this.name}`);
  }
}

function log(
  originMethod: (...args: any[]) => any,
  context: ClassMethodDecoratorContext
) {
  const methodName = context.name;
  function relpacementMethod(this: any, ...args: any[]) {
    console.log(`LOG: ${String(methodName)} Enter`);
    const result = originMethod.call(this, ...args);
    console.log(`LOG: ${String(methodName)} Exit`);
    return result;
  }
  return relpacementMethod;
}
const pp1 = new PP("HH");
pp1.greet();

class Logger {
  @delay(2000)
  static log(msg: string) {
    console.log(msg);
  }
}

function delay(millseconds = 0) {
  return function (
    value: (...args: any[]) => any,
    context: ClassMethodDecoratorContext
  ) {
    return function (this: any, ...args: any[]) {
      setTimeout(() => {
        value.apply(this, args);
      }, millseconds);
    };
  };
}

Logger.log("he");
// 方法装饰器的参数context对象里面，有一个addInitializer()方法。它是一个钩子方法，用来在类的初始化阶段，添加回调函数。这个回调函数就是作为addInitializer()的参数传入的，它会在构造方法执行期间执行，早于属性（field）的初始化。
class PP1 {
  name: string;
  constructor(name: string) {
    this.name = name;

    // greet() 绑定 this
    // this.greet = this.greet.bind(this);
  }

  @bindThis
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

function bindThis(
  this: any,
  value: (...args: any[]) => any,
  context: ClassMethodDecoratorContext
) {
  const methodName = String(context.name);
  context.addInitializer(function (this: any) {
    this[methodName] = this[methodName].bind(this);
  });
}

const pp1Greet = new PP1("name").greet;
pp1Greet();

/**
 * 属性装饰器
 *
 */

// 注意，装饰器的第一个参数value的类型是undefined，这意味着这个参数实际上没用的，装饰器不能从value获取所装饰属性的值。另外，第二个参数context对象的kind属性的值为字符串field，而不是“property”或“attribute”，这一点是需要注意的。
type ClassFieldDecorator = (
  value: undefined,
  context: {
    kind: "field";
    name: string | symbol;
    static: boolean;
    private: boolean;
    access: { get: () => unknown; set: (value: unknown) => void };
    addInitializer(initializer: () => void): void;
  }
) => (initialValue: unknown) => unknown | void;

// 属性装饰器要么不返回值，要么返回一个函数，该函数会自动执行，用来对所装饰属性进行初始化。该函数的参数是所装饰属性的初始值，该函数的返回值是该属性的最终值。
export default {};

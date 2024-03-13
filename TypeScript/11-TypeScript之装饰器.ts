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
 */
// type ClassDecorator = (
//   value: Function,
//   context: {
//     kind: "class";
//     name: string | undefined;
//     addInitializer(initializer: () => void): void;
//   }
// ) => Function | void;

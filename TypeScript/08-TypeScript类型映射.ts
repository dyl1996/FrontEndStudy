/**
 * 类型映射
 * 将一种类型按照映射规则，转换成另一种类型，通常用于对象类型
 */
type ToBoolean<T> = {
  [key in keyof T]: boolean;
};
// 联合类型映射
type MyObj = {
  [key in 0 | 1 | 2]: string;
};
// 等同于
/*
  type MyObj = {
    0: string
    1: string
    2: string
  }
  */

// 具体类型进行属性名映射
type MyObj2 = {
  [key in "foo"]: string;
};
// 等同于
/*
  type MyObj2 = {
    foo: string;
  }
  */

// 属性名索引形式的映射写法
type MyObj3 = {
  [key in string]: string;
};
// 等同于
/*
  type MyObj3 = {
    [key: string]: string;
  }
  */

// 可选映射
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// 只读映射
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// 映射会原样复制原始对象的可选属性和只读属性
type A = {
  name?: string;
  readonly age: number;
};

type B = {
  [K in keyof A]: A[K];
};
/*
  type B = {
      name?: string | undefined;
      readonly age: number;
  }
  */

// 修改映射修饰符
// 添加
type MyAdd<T> = {
  readonly [K in keyof T]?: T[K];
};
// 去除
type MySub<T> = {
  -readonly [K in keyof T]-?: T[K];
};

// 键名重映射
type MyObj4 = {
  name: string;
  age: number;
};
type MyObj5 = {
  [K in keyof MyObj4 as `${K}Key`]: MyObj4[K];
};

// 属性过滤
type FilterString<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

// 联合类型的映射
type S = {
  kind: "square";
  x: number;
  y: number;
};

type C = {
  kind: "circle";
  radius: number;
};

type MyEvents<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
};

type Config = MyEvents<S | C>;
// 等同于
/*
  type Config = {
    square: (event: S) => void;
    circle: (event: C) => void;
  };
  */

export default {};

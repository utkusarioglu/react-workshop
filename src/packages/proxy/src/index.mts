function sealed(constructor: new (...args: any[]) => any) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

function hide(
  target: object,
  name: PropertyKey,
  descriptor?: PropertyDescriptor,
) {
  if (descriptor) {
    descriptor.enumerable = false;
  } else {
    Object.defineProperty(target, name, {
      enumerable: false,
    });
  }
}

class Cls {
  @hide static cat = "meow";
  static dog = "woof";

  // @hide
  bird = "chirp";

  @hide
  method() {
    return "method";
  }

  @hide
  static meow() {
    return "aaa";
  }
}

console.log(Object.keys(Cls), Object.keys(Cls.prototype));
const c = new Cls();
console.log(Object.keys(c));

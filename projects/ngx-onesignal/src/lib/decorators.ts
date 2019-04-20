export function ExecIf(initProp: string) {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = function() {
      console.log(this, arguments);
      if (this[initProp]) {
        return method.apply(this, arguments);
      }
      return void 0;
    };
  };
}

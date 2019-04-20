import { ExecIf } from './decorators';

describe('ExecIf', () => {
  class TestClass {
    init = false;
    exec = false;
    @ExecIf('init')
    one() {
      this.exec = true;
      return 1;
    }
  }

  it('propetry check', () => {
    const test = new TestClass();
    expect(test.init).toBeFalsy();
    expect(test.exec).toBeFalsy();
    expect(test.one()).toBeUndefined();
    expect(test.init).toBeFalsy();
    expect(test.exec).toBeFalsy();
    test.init = true;
    expect(test.one()).toBe(1);
    expect(test.init).toBeTruthy();
    expect(test.exec).toBeTruthy();
  });
});

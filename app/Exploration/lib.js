// wrapper not working
export function typeChecker (type) { 
    return function (target, key, index) {
    const originalMethod = target[key];
    target[key] = function (...args) {
      const arg = args[index];
      if (typeof arg != type) {
        throw new Error(`Argument at index ${index} is not the fitting type.`);
      }
      return originalMethod.apply(this, args);
    };
  };
} 
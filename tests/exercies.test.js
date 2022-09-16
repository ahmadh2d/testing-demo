const {fizzBuzz} = require("../exercise1");

describe("FizzBuzz", () => {
    it("should throw exception if input is not a number", () => {
        expect(() => fizzBuzz("a")).toThrow();
    });

    it("should return Fizz if input number is divisible by 3", () => {
        expect(fizzBuzz(3)).toBe("Fizz");
    });
    
    
    it("should return Buzz if input number is divisible by 5", () => {
        expect(fizzBuzz(5)).toBe("Buzz");
    });

    it("should return FizzBuzz if input number is divisible by 3 and 5", () => {
        expect(fizzBuzz(15)).toBe("FizzBuzz");
    });
});
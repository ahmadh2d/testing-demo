const { absolute } = require("../lib");
const { greet } = require("../lib");
const { getCurrencies } = require("../lib");
const { getProduct } = require("../lib");
const { registerUser } = require("../lib");
const { notifyCustomer } = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute", () => {
    it("should return positive number test when +ve number is input", () => {
        expect(absolute(2)).toBe(2);
    });
    it("should return positive number test when -ve number is input", () => {
        expect(absolute(-2)).toBe(2);
    });
    it("should return positive number when 0 is input test", () => {
        expect(absolute(0)).toBe(0);
    });
});

describe("greet", () => {
    it("test greet function 1", () => {
        expect(greet("Ahmad")).toBe("Welcome Ahmad");
    });

    it("test greet function 2", () => {
        expect(greet("Ahmad")).toMatch(/Ahmad/);
    });
});

describe("Get Currencies", () => {
    it("Get Currencies Test 1", () => {
        const result = getCurrencies();

        // too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // too specific
        expect(result[0]).toBe("PKR");

        // proper
        expect(result).toContain("USD");

        // better
        // expect(result).toEqual(expect.arrayContaining(["USD", " PKR", "INR", "EURO"]));
    });
});

describe("Get Product", () => {
    it("should return the product with given id", () => {
        const result = getProduct(1);

        expect(result).toMatchObject({ id: 1, price: 10 });

        expect(result).toHaveProperty('id', 1);
    });
});

describe("RegisterUser", () => {
    it("Register User - Exception test", () => {
        // const result = registerUser(null);

        [null, undefined, NaN, '', 0].forEach(element => {
            expect(() => registerUser(element)).toThrow();
        });
    });

    it("Register User - Happy Scenario test", () => {
        const result = registerUser("ahmad");

        expect(result).toMatchObject( { username: "ahmad" });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe("notifyCustomer", () => {
    it("notifyCustomer - test 1", () => {
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });

        mail.send = jest.fn();

        notifyCustomer({ customerId: 1 });

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});

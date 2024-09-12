import { random } from "."

describe("random", () => {
  it("generates random number in the range", () => {
    let val = random(0, 10);
    expect(val).toBeGreaterThanOrEqual(0)
    expect(val).toBeLessThanOrEqual(10);
  })

  it("throws error for invalid input", () => {
    expect(() => random(10, 0)).toThrow();
  }) 
})
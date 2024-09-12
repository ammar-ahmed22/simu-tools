import { Color } from ".";

describe("Color", () => {
  it("initializes with rgb", () => {
    const color = new Color(1, 2, 3);
    expect(color.r).toBe(1);
    expect(color.g).toBe(2);
    expect(color.b).toBe(3);
    expect(color.a).toBe(1);
  })

  it("initializes with rgba", () => {
    const color = new Color(1, 2, 3, 0.75);
    expect(color.r).toBe(1);
    expect(color.g).toBe(2);
    expect(color.b).toBe(3);
    expect(color.a).toBe(0.75);
  })

  it("initializes with hex string", () => {
    const color = new Color("#ff0000");
    expect(color.r).toBe(255);
    expect(color.g).toBe(0);
    expect(color.b).toBe(0);
    expect(color.a).toBe(1);
  })

  it("throws error for incorrect initialization", () => {
    expect(() => new Color(300, 0, 0)).toThrow();
    expect(() => new Color(0, 0, 0, 1.2)).toThrow();
    expect(() => new Color("abcdefghi")).toThrow();
  })

  it("converts to hex", () => {
    const color = new Color(255, 0, 0);
    expect(color.hex()).toBe("#ff0000");
    expect(new Color(255, 0, 0, 0).hex()).toBe("#ff000000");
  })

  it("converts hex to rgba", () => {
    const [r, g, b, a] = Color.hex2rgba("#ff0000ff");
    expect(r).toBe(255);
    expect(g).toBe(0);
    expect(b).toBe(0);
    expect(a).toBe(1);

    expect(() => Color.hex2rgba("abc")).toThrow();
  })

  it("converts rgba to hex", () => {
    const hex = Color.rgba2hex([255, 0, 0, 0]);
    expect(hex).toBe("#ff000000");

    expect(() => Color.rgba2hex([300, 0, 0, 1.2])).toThrow();
  })
})
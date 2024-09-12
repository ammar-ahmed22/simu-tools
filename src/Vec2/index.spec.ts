import { Vec2 } from "./index";

describe("Vec2", () => {
  let v: Vec2;
  beforeEach(() => {
    v = new Vec2(2, 2);
  });

  it("adds numbers", () => {
    v.add(2);
    expect(v.x).toBe(4);
    expect(v.y).toBe(4);
  });

  it("adds vectors", () => {
    v.add(new Vec2(2, 4));
    expect(v.x).toBe(4);
    expect(v.y).toBe(6);
  });

  it("subtracts numbers", () => {
    v.sub(2);
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
  });

  it("subtracts vectors", () => {
    v.sub(new Vec2(2, 4));
    expect(v.x).toBe(0);
    expect(v.y).toBe(-2);
  });

  it("scales by numbers", () => {
    v.scale(3);
    expect(v.x).toBe(6);
    expect(v.y).toBe(6);
  });

  it("scales by vectors", () => {
    v.scale(new Vec2(2, 4));
    expect(v.x).toBe(4);
    expect(v.y).toBe(8);
  });

  it("divides by numbers", () => {
    v.div(2);
    expect(v.x).toBe(1);
    expect(v.y).toBe(1);
  });

  it("divides by vectors", () => {
    v.div(new Vec2(2, 4));
    expect(v.x).toBe(1);
    expect(v.y).toBe(0.5);
  });

  it("clones vectors", () => {
    let cloned = v.clone();
    let a = v;
    expect(a === v).toBe(true);
    expect(cloned === v).toBe(false);
  });

  it("returns a tuple of the x and y values", () => {
    let v = new Vec2(3, 4);
    expect(v.tuple()[0]).toBe(v.x);
    expect(v.tuple()[1]).toBe(v.y);
  });

  it("calculates the magnitude", () => {
    let v = new Vec2(3, 4);
    expect(v.magnitude).toBe(5);
  });

  it("sets the magnitude", () => {
    v.setMag(10);
    expect(v.magnitude).toBeCloseTo(10);
  });

  it("limits the magnitude", () => {
    let v = new Vec2(100, 100);
    v.limit(50);
    expect(v.magnitude).toBeCloseTo(50);
    v = new Vec2(100, 100);
    let mag = v.magnitude;
    v.limit(200);
    expect(v.magnitude).toBeCloseTo(mag);
  });

  it("converts to string", () => {
    expect(v.toString()).toBe("{ x: 2, y: 2 }");
  });

  it("normalizes the vector", () => {
    let v = new Vec2(43, 24);
    v.normalize();
    expect(v.magnitude).toBeCloseTo(1);
  });

  it("adds two vectors", () => {
    let a = new Vec2(1, 2);
    let b = new Vec2(3, 4);
    expect(Vec2.Add(a, b)).toEqual(new Vec2(4, 6));
  });

  it("subtracts two vectors", () => {
    let a = new Vec2(1, 2);
    let b = new Vec2(3, 4);
    expect(Vec2.Subtract(a, b)).toEqual(new Vec2(-2, -2));
  });

  it("computes the dot product", () => {
    let a = new Vec2(1, 2);
    let b = new Vec2(3, 4);
    expect(Vec2.Dot(a, b)).toBe(11);
  });

  it("computes the distance between 2 vectors", () => {
    let a = new Vec2(1, 2);
    let b = new Vec2(3, 4);
    expect(Vec2.Distance(a, b)).toBeCloseTo(Math.sqrt(8));
  });

  it("returns the zero vector", () => {
    let zero = Vec2.Zero();
    expect(zero.x).toBe(0);
    expect(zero.y).toBe(0);
  });

  it("generates a random vector with magnitude", () => {
    let r = Vec2.RandomDirection(100);
    expect(r.magnitude).toBeCloseTo(100);
  });

  it("generates a random vector constrained to an area", () => {
    let r = Vec2.RandomConstrained(
      new Vec2(10, 10),
      new Vec2(50, 50),
    );
    expect(r.x).toBeGreaterThanOrEqual(10);
    expect(r.x).toBeLessThanOrEqual(50);
    expect(r.y).toBeGreaterThanOrEqual(10);
    expect(r.y).toBeLessThanOrEqual(50);
  });
});

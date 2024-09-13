import { random } from "../rand";

export class Vec2 {
  constructor(
    public x: number = 0,
    public y: number = 0,
  ) {}

  /**
   * Checks if a Vec2 is equal
   * @param v The Vec2 to check equality with
   * @returns boolean
   */
  equals(v: Vec2): boolean {
    return v.x === this.x && v.y === this.y;
  }

  /**
   * Clones the Vec2
   * @returns A copy of the Vec2
   */
  clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  /**
   * Spreads the Vec2's components into a tuple
   * @returns A tuple of (x, y)
   */
  tuple(): [number, number] {
    return [this.x, this.y];
  }

  add(v: number): Vec2;
  add(v: Vec2): Vec2;
  /**
   * Adds a number or Vec2 value
   * @param v The number or Vec2 to add
   */
  add(v: number | Vec2): Vec2 {
    if (typeof v === "number") {
      this.x += v;
      this.y += v;
    } else {
      this.x += v.x;
      this.y += v.y;
    }
    return this;
  }

  sub(v: number): Vec2;
  sub(v: Vec2): Vec2;
  /**
   * Subtracts a number or Vec2 value
   * @param v The number or Vec2 to subtract
   */
  sub(v: number | Vec2): Vec2 {
    if (typeof v === "number") {
      this.x -= v;
      this.y -= v;
    } else {
      this.x -= v.x;
      this.y -= v.y;
    }
    return this;
  }

  scale(m: number): Vec2;
  scale(m: Vec2): Vec2;
  /**
   * Scales the Vec2 by a number or Vec2 value (element-wise)
   * @param v The number or Vec2 to scale by
   */
  scale(m: number | Vec2): Vec2 {
    if (typeof m === "number") {
      this.x *= m;
      this.y *= m;
    } else {
      this.x *= m.x;
      this.y *= m.y;
    }
    return this;
  }

  div(m: number): Vec2;
  div(m: Vec2): Vec2;
  /**
   * Divides the Vec2 by a number or Vec2 value (element-wise)
   * @param v The number or Vec2 to divide by
   */
  div(m: number | Vec2): Vec2 {
    if (typeof m === "number") {
      this.x /= m;
      this.y /= m;
    } else {
      this.x /= m.x;
      this.y /= m.y;
    }
    return this;
  }

  /**
   * Limits the Vec2 magnitude to a max value
   * @param max The limit for the magnitude
   * @returns
   */
  limit(max: number) {
    if (this.magnitude > max) {
      this.setMag(max);
    }
    return this;
  }

  /**
   * Sets the magnitude to a number value
   * @param mag The magnitude to set to
   */
  setMag(mag: number) {
    this.normalize();
    this.scale(mag);
  }

  /**
   * Converts to a string format
   * @returns string
   */
  toString(): string {
    return `{ x: ${this.x}, y: ${this.y} }`;
  }

  /**
   * Normalizes the Vec2
   * @returns
   */
  normalize(): Vec2 {
    let mag = this.magnitude;
    return this.div(mag);
  }

  /**
   * The magnitude of the Vec2
   *
   * @readonly
   * @type {number}
   */
  get magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  /**
   * Adds two Vec2's
   * @param a Vec2
   * @param b Vec2
   * @returns
   */
  static Add(a: Vec2, b: Vec2): Vec2 {
    return new Vec2(a.x + b.x, a.y + b.y);
  }

  /**
   * Subtracts two Vec2's (a - b)
   * @param a Vec2
   * @param b Vec2
   * @returns
   */
  static Subtract(a: Vec2, b: Vec2): Vec2 {
    return new Vec2(a.x - b.x, a.y - b.y);
  }

  /**
   * Computes the dot product of two Vec2's
   * @param a Vec2
   * @param b Vec2
   * @returns
   */
  static Dot(a: Vec2, b: Vec2): number {
    return a.x * b.x + a.y * b.y;
  }

  /**
   * Computes the distance between two Vec2's
   * @param a Vec2
   * @param b Vec2
   * @returns
   */
  static Distance(a: Vec2, b: Vec2): number {
    return Vec2.Subtract(a, b).magnitude;
  }

  /**
   * Generates a Vec2 with a random direction and set magnitude
   * @param mag The magnitude of the Vec2
   * @returns
   */
  static RandomDirection(mag: number): Vec2 {
    let angle = random(0, 2 * Math.PI);
    return new Vec2(mag * Math.cos(angle), mag * Math.sin(angle));
  }

  /**
   * Generates a random Vec2 constrained to some min and max values
   * @param min The minimum x and y values as Vec2
   * @param max The maximum x and y values as Vec2
   * @returns
   */
  static RandomConstrained(min: Vec2, max: Vec2): Vec2 {
    let x = random(min.x, max.x);
    let y = random(min.y, max.y);
    return new Vec2(x, y);
  }

  /**
   *
   * @returns zero vector
   */
  static Zero = () => new Vec2();
}

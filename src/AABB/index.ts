import { Vec2 } from "../Vec2";


export class AABB {
  public origin: Vec2;
  public size: Vec2;
  constructor(x: number, y: number, w: number, h: number);
  constructor(origin: Vec2, size: Vec2);
  constructor(...args: [number, number, number, number] | [Vec2, Vec2]) {
    if (args.length === 2) {
      let [origin, size] = args;
      this.origin = origin.clone();
      this.size = size.clone();
    } else {
      let [x, y, w, h] = args;
      this.origin = new Vec2(x, y);
      this.size = new Vec2(w, h);
    }
  }

  get min() {
    return this.origin.clone();
  }

  get max() {
    return Vec2.Add(this.origin, this.size);
  }

  /**
   * Spreads the origin and size into a tuple
   * @returns 
   */
  tuple(): [number, number, number, number] {
    return [...this.origin.tuple(), ...this.size.tuple()]
  }

  /**
   * Checks if a point is contained within the AABB
   * @param p the point of interest
   */
  public contains(p: Vec2): boolean {
    return p.x >= this.origin.x && p.x <= this.origin.x + this.size.x && p.y >= this.origin.y && p.y <= this.origin.y + this.size.y;
  }

  /**
   * Checks if another AABB intersects
   * @param other The other AABB
   * @returns 
   */
  public intersects(other: AABB): boolean {
    if (this.origin.x + this.size.x < other.origin.x || other.origin.x + other.size.x < this.origin.x) {
      return false;
    }

    if (this.origin.y + this.size.y < other.origin.y || other.origin.y + other.size.y < this.origin.y) {
      return false;
    }
    return true;
  }

  static fromCenter(x: number, y: number, w: number, h: number): AABB;
  static fromCenter(center: Vec2, size: Vec2): AABB;
  static fromCenter(...args: [number, number, number, number] | [Vec2, Vec2]): AABB {
    let center: Vec2;
    let size: Vec2;
    if (args.length === 2) {
      center = args[0];
      size = args[1];
    } else {
      const [x, y, w, h] = args;
      center = new Vec2(x, y);
      size = new Vec2(w, h);
    }

    // origin = center - (size / 2)
    const origin = center.clone().sub(size.clone().div(2));
    return new AABB(origin, size);
  }
}
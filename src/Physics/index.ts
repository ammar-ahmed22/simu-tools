import { Vec2 } from "../Vec2";

export class Physics {
  public pos: Vec2 = new Vec2();
  public vel: Vec2 = new Vec2();
  public acc: Vec2 = new Vec2();
  public mass: number = 1;

  static integrate(v: Vec2, dv: Vec2, dt: number) {
    return v.clone().add(dv.clone().scale(dt))
  }

  /**
   * Sets the position
   * @param p Vec2
   */
  setPosition(p: Vec2) {
    this.pos = p;
  }

  /**
   * Sets the velocity
   * @param v Vec2
   */
  setVelocity(v: Vec2) {
    this.vel = v;
  }

  /**
   * Sets the acceleration
   * @param a Vec2
   */
  setAcceleration(a: Vec2) {
    this.acc = a;
  } 

  /**
   * Sets the mass
   * @param m number
   */
  setMass(m: number) {
    this.mass = m;
  }

  /**
   * Adds a force (a += F / m)
   * @param f force to add
   */
  addForce(f: Vec2) {
    this.acc.add(f.clone().div(this.mass));
  }
}
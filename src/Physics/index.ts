import { Vec2 } from "../Vec2";

export class Physics {
  public pos: Vec2 = new Vec2();
  public vel: Vec2 = new Vec2();
  public acc: Vec2 = new Vec2();
  public mass: number = 1;

  static integrate(v: Vec2, dv: Vec2, dt: number) {
    return v.clone().add(dv.clone().scale(dt))
  }

  setPosition(p: Vec2) {
    this.pos = p;
  }

  setVelocity(v: Vec2) {
    this.vel = v;
  }

  setAcceleration(a: Vec2) {
    this.acc = a;
  } 

  setMass(m: number) {
    this.mass = m;
  }
}
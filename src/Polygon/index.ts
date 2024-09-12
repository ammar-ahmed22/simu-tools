import { Vec2 } from "../Vec2";

export class Polygon {
  constructor(
    public vertices: Vec2[],
    public center: Vec2,
  ) {}

  /**
   * Rotates the polygon
   * @param angle The angle from the positive x-axis to rotate to
   */
  rotate(angle: number) {
    const cosTheta = Math.cos(angle);
    const sinTheta = Math.sin(angle);
    this.vertices = this.vertices.map((vertex) => {
      const translated = Vec2.Subtract(vertex, this.center);
      const x = translated.x * cosTheta - translated.y * sinTheta;
      const y = translated.x * sinTheta + translated.y * cosTheta;

      return Vec2.Add(new Vec2(x, y), this.center);
    });
  }

  /**
   * Generates a chevron shaped Polygon
   * @param center The center of the chevron (starting point)
   * @param w The width of the chevron
   * @param h The height of the chevron
   * @returns 
   */
  static Chevron(center: Vec2, w: number, h: number): Polygon {
    const p = new Polygon([center.clone()], center.clone());
    p.vertices.push(center.clone().add(new Vec2(-h / 3, -w / 2)));
    p.vertices.push(center.clone().add(new Vec2((2 * h) / 3, 0)));
    p.vertices.push(center.clone().add(new Vec2(-h / 3, w / 2)));
    return p;
  }

  /**
   * Generates a triangle shaped Polygon
   * @param center The center of the triangle
   * @param w The width of the triangle
   * @param h The height of the triangle
   * @returns 
   */
  static Triangle(center: Vec2, w: number, h: number): Polygon {
    const p = new Polygon([], center.clone());
    p.vertices.push(center.clone().add(new Vec2(-h / 3, -w / 2)));
    p.vertices.push(center.clone().add(new Vec2((2 * h) / 3, 0)));
    p.vertices.push(center.clone().add(new Vec2(-h / 3, w / 2)));
    return p;
  }
}

import { AABB } from "../AABB";
import { Vec2 } from "../Vec2";

export type QuadTreeData<T> = {
  pos: Vec2,
  data: T
}

export class QuadTree<T> {
  children?: QuadTree<T>[];
  public data?: QuadTreeData<T>;
  constructor(public aabb: AABB) {}

  public insert(p: Vec2, data: T): boolean {
    if (this.aabb.contains(p)) {
      if (!this.data) {
        this.data = { pos: p, data };
        return true;
      }

      if (!this.children) {
        this.subdivide();
      }

      for (let child of this.children!) {
        if (child.insert(p, data)) {
          return true;
        }
      }
    }

    return false;
  }
  public subdivide() {
    if (this.children) return;
    const { origin, size } = this.aabb;
    const half = size.clone().div(2);
    this.children = [];
    for (let x = 0; x <= 1; x++) {
      for (let y = 0; y <= 1; y++) {
        const bb = new AABB(origin.clone().add(new Vec2(half.x * x, half.y * y)), half.clone());
        this.children!.push(new QuadTree(bb));
      }
    }
    if (this.data) {
      const { pos, data } = this.data;
      for (let child of this.children) {
        if (child.insert(pos, data)) {
          break;
        }
      }
      this.data = undefined;
    }
  }

  public query(query: AABB, results: QuadTreeData<T>[] = []) {
    if (!this.aabb.intersects(query)) {
      return;
    }

    if (this.data && query.contains(this.data.pos)) {
      results.push(this.data);
    }
    if (this.children) {
      for (let child of this.children) {
        child.query(query, results);
      }
    }

    // return data;
  }
}
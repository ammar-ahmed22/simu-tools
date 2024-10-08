import { AABB } from "../AABB";
import { Vec2 } from "../Vec2";

export type QuadTreeData<T> = {
  pos: Vec2,
  data: T
}

export class QuadTree<T, S = any> {
  children?: QuadTree<T, S>[];
  public state?: S;
  public data?: QuadTreeData<T>;
  constructor(public aabb: AABB) {}
  public setState(state: S) {
    this.state = state;
  }
  
  /**
   * Inserts into the tree
   * @param p The position for the insertion
   * @param data Associated data for the insertion
   * @returns 
   */
  public insert(p: Vec2, data: T): boolean {
    if (this.aabb.contains(p)) {      
      if (this.children) {
        for (let child of this.children) {
          if (child.insert(p, data)) {
            this.data = undefined;
            return true;
          }
        }
      }


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

  /**
   * Subdivides the tree
   * @returns 
   */
  private subdivide() {
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
          this.data = undefined;
          return;
        }
      }
      this.data = undefined;
    }
  }

  /**
   * Queries the tree for values that are contained within an AABB
   * @param query The query AABB area
   * @param results The results of the query (will be mutated)
   * @returns 
   */
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
  }

  /**
   * Post-order traversal of the tree
   * @param node The starting node
   * @param callbackfn Callback function for each node in the traversal
   */
  static postOrder<T, S = any>(node: QuadTree<T, S>, callbackfn: (node: QuadTree<T, S>) => void) {
    if (node.children) {
      for (let child of node.children) {
        QuadTree.postOrder(child, callbackfn);
      }
    }

    callbackfn(node);
  } 

  /**
   * Pre-order traversal of the tree
   * @param node The starting node
   * @param callbackfn Callback function for each node in the traversal
   */
  static preOrder<T, S = any>(node: QuadTree<T, S>, callbackfn: (node: QuadTree<T, S>) => void) {
    callbackfn(node);
    if (node.children) {
      for (let child of node.children) {
        QuadTree.preOrder(child, callbackfn);
      }
    }
  } 
}
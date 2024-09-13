import { QuadTree, QuadTreeData } from ".";
import { AABB } from "../AABB";
import { Vec2 } from "../Vec2";


describe("QuadTree", () => {
  let bb: AABB;
  beforeEach(() => {
    bb = new AABB(0, 0, 100, 100);
  })
  it("creates a quadtree", () => {
    const tree = new QuadTree(bb)
    expect(tree.children).not.toBeDefined();
  })

  it("inserts value", () => {
    const tree = new QuadTree(bb);
    const p = new Vec2(25, 25);
    tree.insert(p, undefined);
    expect(tree.data).toBeDefined();
    expect(tree.data!.pos).toEqual(p);
    expect(tree.children).toBeUndefined();
  })

  it("inserts multiple values", () => {
    const tree = new QuadTree(bb);
    const p1 = new Vec2(25, 25);
    const p2 = new Vec2(30, 30);
    tree.insert(p1, undefined);
    expect(tree.data).toBeDefined();
    expect(tree.data!.pos).toEqual(p1);
    expect(tree.children).toBeUndefined();

    tree.insert(p2, undefined);
    expect(tree.children).toBeDefined();
    expect(tree.children).toHaveLength(4);
    let found = false;
    const find = (node: QuadTree<any>, p: Vec2) => {
      if (node.data && node.data.pos.equals(p)) {
        return true;
      }
      if (node.children) {
        for (let child of node.children) {
          if (find(child, p)) {
            return true;
          }
        }
      }
      return false;
    }
    found = find(tree, p2);
    expect(found).toBe(true)
  })

  it("subdivides", () => {
    const tree = new QuadTree(bb);
    const p1 = new Vec2(25, 25);
    const p2 = new Vec2(30, 30);
    tree.insert(p1, undefined);
    tree.insert(p2, undefined);
    expect(tree.data).toBeUndefined(); // data should be moved to leaf nodes
    expect(tree.children).toBeDefined();
    expect(tree.children).toHaveLength(4);

    const parentSize = bb.size;
    for (let child of tree.children!) {
      const { aabb } = child;
      const { size } = aabb;
      expect(size.equals(parentSize.clone().div(2))).toBe(true);
    }
  })

  it("queries", () => {
    const tree = new QuadTree<number>(bb);
    tree.insert(new Vec2(10, 10), 1); // should be in result
    tree.insert(new Vec2(1, 1), 2); // should be in result
    tree.insert(new Vec2(60, 60), 3); 
    tree.insert(new Vec2(4, 12), 4); // should be in result
    tree.insert(new Vec2(40, 40), 5);
    tree.insert(new Vec2(56, 75), 6);

    let query = new AABB(0, 0, 20, 20);
    let queryResults: QuadTreeData<number>[] = [];
    tree.query(query, queryResults);
    expect(queryResults).toHaveLength(3);
    for (let result of queryResults) {
      expect(result.pos.x).toBeLessThanOrEqual(20);
      expect(result.pos.y).toBeLessThanOrEqual(20);
    }
  })
})
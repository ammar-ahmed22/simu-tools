<div align="center">
  <h1>simu-tools</h1>
  <p>
    Helper classes for my personal use when creating simulations using the HTML5 Canvas API
  </p>
</div>

## Available Classes/Functions
- **Vec2**: 2D vector with numerous helper methods for vector math.
- **random**: random number generator
- **Color**: Utility to help convert between hex and rgba colors
- **AABB**: Axis-aligned bounding box
- **Physics**: Utility to store physical values used for moving objects (position, velocity, acceleration, mass, etc.)
- **Graphics**: Canvas context wrapper and rendering helper
- **Polygon**: Utility to create and manipulate polygon vertices
- **QuadTree**: QuadTree spatial partitioning using AABB's

## Installation
```bash
npm i @ammar-ahmed22/simu-tools
# yarn add @ammar-ahmed22/simu-tools
```

## Usage
```typescript
import { Vec2, Graphics, Color } from "@ammar-ahmed22/simu-tools"

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const currDimensions = () => new Vec2(canvas.width, canvas.height);
const graphics = new Graphics(canvas);
graphics.resizeCanvas();

graphics.addHandler("predraw", (graphics) => {
  graphics.save();
  graphics.resizeCanvas();
  graphics.clear();
})

graphics.addHandler("draw", (graphics) => {
  graphics.circle(...currDimensions().div(2).tuple(), 20 * Math.sin(graphics.frames * 0.01) ** 2, { fill: Color.WHITE });
})

graphics.addHandler("postdraw", (graphics) => {
  graphics.restore();
})

graphics.run();
```

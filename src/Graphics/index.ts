import { Color } from "../Color";
import { Polygon } from "../Polygon";
import { Vec2 } from "../Vec2";

const GRAPHICS_HANDLERS = ["draw", "predraw", "postdraw"] as const;

export type GraphicsHandler = (typeof GRAPHICS_HANDLERS)[number];

export type GraphicsHandlerMap = {
  [k in GraphicsHandler]?: (graphics: Graphics) => void;
};

export type FillStrokeValue = string | CanvasGradient | CanvasPattern | Color;

export type FillStrokeOpts = {
  fill?: FillStrokeValue
  stroke?: FillStrokeValue
  lineWidth?: number;
};

export class Graphics {
  private frameCount: number = 0;
  public ctx: CanvasRenderingContext2D;
  private handlerMap: GraphicsHandlerMap = {};

  private lastFrameTime: number = 0;
  private fps: number = 0;
  private fpsSmoothing: number = 0.1;
  constructor(public canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Cannot get 2d context!");
    } else {
      this.ctx = ctx;
    }
    this.render = this.render.bind(this);
  }

  
  /**
   * Gets the current frame count
   *
   * @readonly
   * @type {number}
   */
  get frames(): number {
    return this.frameCount;
  }

  /**
   * Increments the frame count
   */
  incrementFrames() {
    this.frameCount++;
  }
  /**
   * Resizes the drawing area to the same size as the canvas DOM element
   * @returns 
   */
  resizeCanvas() {
    const { width, height } = this.canvas.getBoundingClientRect();
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
      return true;
    }
    return false;
  }

  /**
   * Add a graphics handler
   * @param type The type of the graphics handler
   * @param handler The handler callback
   */
  addHandler(type: GraphicsHandler, handler: (graphics: Graphics) => void) {
    this.handlerMap[type] = handler;
  }

  
  /**
   * Recursive game loop function
   */
  private render(time: number) {
    this.updateFPS(time);
    if (this.handlerMap.predraw) this.handlerMap.predraw(this);
    if (this.handlerMap.draw) this.handlerMap.draw(this);
    if (this.handlerMap.postdraw) this.handlerMap.postdraw(this);
    this.incrementFrames();
    requestAnimationFrame(this.render);
  }

  private updateFPS(time: number) {
    const delta = time - this.lastFrameTime;
    const currFPS = 1000 / delta;
    this.fps = this.fps * (1 - this.fpsSmoothing) + currFPS * this.fpsSmoothing;
    this.lastFrameTime = time;
  }
  
  /**
   * Runs the graphics rendering
   */
  run() {
    this.lastFrameTime = performance.now();
    this.render(0);
  }

  
  /**
   * The width of the drawable area
   *
   * @readonly
   * @type {number}
   */
  get width(): number {
    return this.canvas.width;
  }

  /**
   * The height of the drawable area
   *
   * @readonly
   * @type {number}
   */
  get height(): number {
    return this.canvas.height;
  }

  /**
   * Extracts the primitive fill/stroke style value
   * @param value FillStrokeValue
   * @returns 
   */
  private extractFillStrokeValue = (value: FillStrokeValue) => {
    if (value instanceof Color) {
      return value.hex();
    } else {
      return value;
    }
  };

  // Drawing methods
  /**
   * Handles the fill and stroke of objects
   * @param opts FillStrokeOpts
   */
  public fillStroke(opts?: FillStrokeOpts) {
    if (opts?.fill) {
      this.ctx.fillStyle = this.extractFillStrokeValue(opts.fill);
      this.ctx.fill();
    }

    if (opts?.stroke) {
      this.ctx.strokeStyle = this.extractFillStrokeValue(opts.stroke);
      this.ctx.lineWidth = opts.lineWidth ?? 1;
      this.ctx.stroke();
    }
  }

  /**
   * Render a rectangle
   * @param x The top-left corner x position
   * @param y The top-left corner y position
   * @param w The width of the rectangle
   * @param h The height of the rectangle
   * @param opts FillStrokeOpts
   */
  rect(x: number, y: number, w: number, h: number, opts?: FillStrokeOpts) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.fillStroke(opts);
  }

  /**
   * Render an arc
   * @param x The center x position
   * @param y The center y position
   * @param r The radius of the arc
   * @param start The start angle of the arc
   * @param end The end angle of the arc
   * @param opts FillStrokeOpts
   */
  arc(
    x: number,
    y: number,
    r: number,
    start: number,
    end: number,
    opts?: FillStrokeOpts,
  ) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, start, end);
    this.fillStroke(opts);
  }

  /**
   * Render a circle
   * @param x The center x position
   * @param y The center y position
   * @param r The radius
   * @param opts FillStrokeOpts
   */
  circle(x: number, y: number, r: number, opts?: FillStrokeOpts) {
    this.arc(x, y, r, 0, 2 * Math.PI, opts);
  }

  polygon(vertices: Vec2[], opts?: FillStrokeOpts): void;
  polygon(polygon: Polygon, opts?: FillStrokeOpts): void;

  /**
   * Render a polygon with the Polygon object or an array of Vec2
   * @param arg Polygon or array of Vec2
   * @param opts FillStrokeOpts
   */
  polygon(arg: Vec2[] | Polygon, opts?: FillStrokeOpts) {
    let vertices: Vec2[];
    if (arg instanceof Polygon) {
      vertices = arg.vertices;
    } else {
      vertices = arg;
    }
    if (vertices.length < 3) {
      throw new Error("Polygon must have at least 3 vertices!");
    }
    this.ctx.beginPath();
    this.ctx.moveTo(...vertices[0].tuple());
    vertices.push(vertices[0].clone()); // adding the closing vertex (same as the first)
    for (let i = 1; i < vertices.length; i++) {
      this.ctx.lineTo(...vertices[i].tuple());
    }
    this.fillStroke(opts);
  }

  /**
   * Renders a line between two points
   * @param x1 start point x position
   * @param y1 start point y position
   * @param x2 end point x position
   * @param y2 end point y position
   * @param opts 
   */
  line(x1: number, y1: number, x2: number, y2: number, opts?: FillStrokeOpts) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.fillStroke(opts);
  }

  /**
   * Clear the canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Save the state of the canvas
   */
  save() {
    this.ctx.save();
  }

  /**
   * Restore the previously saved canvas state
   */
  restore() {
    this.ctx.restore();
  }
}

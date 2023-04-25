let obj = `
# v declares a vertex
# vt declares a uv coordinate(t as in texture)
# vn declares a vector normal
# f is a face ... vertex index/uv index/normal index
# all indices start at 1
v -1.000000 0.000000 1.000000
v 1.000000 0.000000 1.000000
v -1.000000 0.000000 -1.000000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 1.0000 0.0000
f 2/1/1 3/2/1 1/3/1
`

let lines = obj.split('\n');

let vertices = [];
let textures = [];
let normals = [];

for (let line of lines) {
  let trimmedLine = line.trim();
  if (trimmedLine.length == 0) continue;

  let parts = line.split(" ");
  if (parts.trim() == 'v') {
    //push onto v
    let v = {x:parseFloat(parts[0]), y:parseFloat(parts[1]), z:parseFloat(parts[2])};
  }

  if (parts.trim() == 'vt') {
    //push onto t
  }

  if (parts.trim() == 'vn') {
    //push onto n
    let first = parts[1];
    let coords = first.split('/');
    
  }
}




/**
 * Run our ray tracer
 * @param {Number} width The width of the rendederd image
 * @param {Number} height The height of the rendered image
 */
function main() {
  let width = 100;
  let height = 100;
  let image = new Image(width, height);

  let canvas = document.querySelector("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d")

  //Test code
  let v3 = new Vector3(1, 2, 3);
  v3.x = 0;
  console.log(v3)
  let v4 = v3.normalize()
  console.log(v4)

  console.log(new Vector3(1, 1, 1).dot(new Vector3(0, 2, 0)))
  console.log(new Vector3(0, 0, 1).cross(new Vector3(1, 0, 0)))

  let sphere = new Sphere(new Vector3(-2, 0, 0), 1);
  let rayOrigin = new Vector3(0, 0, 0);
  let rayDirection = new Vector3(-1, 0, 0);
  let collision = sphere.intersect(rayOrigin, rayDirection)
  console.log(collision);

  let s = new Sphere(new Vector3(-2, 0, 0), 1);
  let spheres = [s];

  //Ray Tracer starts

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x == 50 && y == 52) {
        console.log("stop")
      }

      let startX = x - width / 2;
      let startY = y - height / 2;
      let origin = new Vector3(startX, startY, 51);
      let direction = new Vector3(0, 0, -1);
      let s = new Sphere(new Vector3(0, 0, 0), 50);
      let c = s.intersect(origin, direction);

      let rayTracedPixel = new Pixel(255, 0, 0);

      if(c){
        let normal = (c.minus(c-s.center)).normalize()
        let dot = normal.dot(new Vector3(1,-1,1).normalize());
        if(dot <= 0)
          dot = 0
        rayTracedPixel = new Pixel(255 * dot,255*dot,255*dot);
      }

      image.setPixel(x, y, rayTracedPixel);


      let pixel = image.getPixel(x, y);
      let pixelString = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
      ctx.fillStyle = pixelString;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}
//Run the main ray tracer
main();

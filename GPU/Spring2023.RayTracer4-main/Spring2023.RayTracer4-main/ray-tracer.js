"use strict"

/** Get a random number in [-1,1] scaled by amount */
function evenRand(amount) {
  return (Math.random() * 2 - 1) * amount
}

/**
 * The main ray tracing routine
 */
async function main() {
  let canvas = document.querySelector("canvas");
  canvas.width = width * 2; // Allows for a view of importance sampling
  canvas.height = height;
  let ctx = canvas.getContext("2d")

  let image = Array.from(Array(width), () => new Array(height))
  let noise = Array.from(Array(width), () => new Array(height))
  let maxIteration = 0;
  let minCount = 5;
  let stop = samples;
  let noiseMax = 50;

  //Ray Tracer starts
  //Loop over all the pixels
  for (let i = 0; i < stop; i++) {
    for (let y = 0; y < height; y++) {
      setTimeout(() => {
        for (let x = 0; x < width; x++) {
          if (!image[x][y])
            image[x][y] = []
          if (!noise[x][y])
            noise[x][y] = 0
          let entry = image[x][y]
          let count = entry.length
          //Drop out if our color is consistent enough
          if (count > minCount) {
            let noop
            if (noise[x][y] < noiseMax)
              continue;
          }

          //Debugging code
          if (x == 200 && y == 0) {
            let noop;
          }

          let color = render(x, y, jitterAmount);

          //Increase the count of samples taken
          count++;
          //Push the new sample
          entry.push(color)

          //Find the average r,g, and b colors
          let r = entry.map(p => p.r).reduce((a, b) => a + b, 0) / count;
          let g = entry.map(p => p.g).reduce((a, b) => a + b, 0) / count;
          let b = entry.map(p => p.b).reduce((a, b) => a + b, 0) / count;

          //Get the variance
          let rstd = entry.map(p => Math.abs(p.r - r)).reduce((a, b) => a + b, 0) / count
          let gstd = entry.map(p => Math.abs(p.r - r)).reduce((a, b) => a + b, 0) / count
          let bstd = entry.map(p => Math.abs(p.r - r)).reduce((a, b) => a + b, 0) / count

          //Sum the total noise and save it
          let sumNoise = rstd + gstd + bstd
          noise[x][y] = sumNoise

          //Draw the color
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
          ctx.fillRect(x, y, 1, 1)

          //Draw the noise image as well
          //if (sumNoise > noiseMax) {
            ctx.fillStyle = `rgb(${sumNoise}, ${sumNoise}, ${sumNoise})`
            ctx.fillRect(x + width, y, 1, 1)
         // }
        }

        //Print to the console what our percentage complete is.
        //It's a little tricky because we are threaded.
        if (i > maxIteration) {
          maxIteration = i
          console.log(maxIteration / stop)
        }
      })

    }
  }

  ctx.fillStyle = "red";
  ctx.fillRect(width / 2, height / 2, 1, 1);
}

/**
 * Run our ray tracer
 */
function render(x, y, jitterAmount) {
  //Grab the background color from the scene object (if it is defined)
  let backgroundColor = Scene.scene?.options?.backgroundColor ? Scene.scene.options.backgroundColor : new Vector3(100, 100, 100)

  //Debug code
  if (x == 170 && y == 148) {
    //console.log("stop")
    let noop;
  }

  //The color of the closest collision for this pixel
  let rayTracedPixel = backgroundColor;

  //Determine the origin and direction of the ray
  let startX = x - width / 2;
  let startY = y - height / 2;
  let origin = Scene.scene.camera.getOrigin(startX, startY);
  let direction = Scene.scene.camera.getDirection(startX / (width / 2), startY / (height / 2));

  let jittered = direction.add(new Vector3(evenRand(jitterAmount), evenRand(jitterAmount), evenRand(jitterAmount))).normalize()

  direction = jittered;

  let result = closestCollision(origin, direction, null, 1);
  if (!result) return rayTracedPixel;
  rayTracedPixel = result.rayTracedObject.shader.illuminateObject(
    origin,
    result.collisionLocation,
    result.normalAtCollision,
    result.rayTracedObject,
    10
  )

  return rayTracedPixel;
}

function closestCollision(origin, direction, ignored = null, remaining = 10) {
  if (remaining <= 0) return;
  let closestPositiveT = Number.MAX_VALUE;
  let closestCollision;

  //The color of the closest collision for this pixel
  for (let rayTracedObject of Scene.scene.rayTracedObjects) {
    //Prevent self-collisions
    if (rayTracedObject == ignored) continue;
    
    //Get the geometry of the current object
    let geometry = rayTracedObject.geometry

    //Find the intersection with this object
    let collision = geometry.intersect(origin, direction);

    //Check to see if the collision exists...
    //...and if it is closer than any other collision we've seen
    if (collision && collision.timeToCollision < closestPositiveT) {
      //Get the distance to collision
      closestPositiveT = collision.timeToCollision
      collision.rayTracedObject = rayTracedObject;

      closestCollision = collision;
    }
  }
  return closestCollision;
}

//Run the main ray tracer
main();
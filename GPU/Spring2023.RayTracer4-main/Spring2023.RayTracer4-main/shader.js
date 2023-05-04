class Shader {

}

class DiffuseShader {
  constructor(diffuseColor) {
    this.diffuseColor = diffuseColor;
  }
  illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining) {
    

    let lightSum = Vector3.zero;
    for (let light of Scene.scene.lights) {
      let inShadow = false;

      //Manually check for shadows
      for (let object of Scene.scene.rayTracedObjects) {
        if (object == collisionObject) continue
        let directionToLight = light.direction.normalize()

        let collision = object.geometry.intersect(rayCollision, directionToLight)
        if (collision) {
          inShadow = true;
          break;
        }
      }

      let dot = normal.dot(light.direction.normalize());
      if (inShadow) dot = 0;
      if (dot <= 0)
        dot = 0
      lightSum = lightSum.add(new Vector3(this.diffuseColor.r * dot, this.diffuseColor.g * dot, this.diffuseColor.b * dot));
    }

    return { r: lightSum.r, g: lightSum.g, b: lightSum.b };
  }
}

class AmbientShader {
  constructor(ambientColor) {
    this.ambientColor = ambientColor;
  }
  illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining) {
    return this.ambientColor;
  }

}

class MixShader {
  constructor(one, two, amount) {
    this.one = one;
    this.two = two;
    this.amount = amount;
  }
  illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining) {
    let tempOne = this.one.illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining)
    let tempTwo = this.two.illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining)
    return {
      r: this.amount * tempOne.r + (1 - this.amount) * tempTwo.r,
      g: this.amount * tempOne.g + (1 - this.amount) * tempTwo.g,
      b: this.amount * tempOne.b + (1 - this.amount) * tempTwo.b
    }
  }

}

class MirrorShader {
  illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining) {
    if(remaining <= 0){
      return {r:0,g:0,b:0};
    }

    //In order to find the direction to the camera, negate the rayFrom
    let original = rayFrom.negate();
    let reflectedRay = original.minus(normal.scale(original.dot(normal)*2)).normalize()

    //Find the reflected ray original.minus(normal.scale(original.dot(normal) * 2)).normalize();
    // let reflectedRay = original.minus(normal.scale(original.dot(normal) * 2)).normalize();
    
    //Change the origin to the collision point
    let newOrigin = rayCollision;

    //Set the new direction to be the reflected ray
    let newDirection = reflectedRay;

    //Find the colosest collision point
    //Don't forget to add this object as the ignored object
    let result = closestCollision(newOrigin, newDirection, collisionObject, remaining);

    //Set a default color if there is no collision
    if (!result) return {r:100, g:100, b:100};

    //Illuminate this closest collision
    //Don't forget to decrement remaining
    let rayTracedPixel = result.rayTracedObject.shader.illuminateObject(
      newOrigin,
      result.collisionLocation,
      result.normalAtCollision,
      result.rayTracedObject,
      remaining-1
    ) 
    return rayTracedPixel;
    return {r:100, g:0, b:0}
  }
}

class VolumeShader {
  illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining) {

    //Divide each coordinate by the scale
    //Sum each coordinate
    //Take the abs
    //Take the %2
    //Color based on result of modulo

    let x = Math.floor(rayCollision.x/30)
    let y = Math.floor(rayCollision.y/30)
    let z = Math.floor(rayCollision.z/30)
    let sum = Math.abs(x + y + z)
    let remainder = sum % 2
    if (remainder == 0) {
      return {r:100, g:100, b:100}
    } else {
      return {r:150, g:150, b:150}
    }

    // let scale = 100;
    // let light = true;
    // let x = Math.floor(rayCollision.x/scale);
    // let y = Math.floor(rayCollision.y/scale);
    // let z = Math.floor(rayCollision.z/scale);
    // let sum = x + y + z;
    // //sum = Math.abs(sum)
    // if (sum % 2 != 0) {
    //   light = false;
    // }
    // if (light)
    //   return { r: 200, g: 200, b: 200 };
    // else
      return {r:150,g:150,b:150};
  }
}


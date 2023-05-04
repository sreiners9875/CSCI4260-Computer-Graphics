/**
 * A triangle class, with vertices specified in counter-clockwise order
 */
class Triangle{
  /**
   * 
   * @param {Vector3} one The first vertex
   * @param {Vector3} two The second vertex
   * @param {Vector3} three The third vertex
   */
  constructor(one, two, three){
    this.vertices = [];
    this.vertices.push(...[one, two, three])
  }
  
  /**
   * Get the first vertex
   */
  get one(){
    return this.vertices[0];
  }
  
  /**
   * Get the second vertex
   */
  get two(){
    return this.vertices[1]
  }
  
  /**
   * Get the third vertex
   */
  get three(){
    return this.vertices[2]
  }
  
  /**
   * Get the vector from one to two
   */
  get oneTwo(){
    return this.one.position.minus(this.two.position).normalize();
  }
  
  /**
   * Get the vector from three to two
   */
  get threeTwo(){
    return this.three.position.minus(this.two.position).normalize();
  }
  
  /**
   * Calculate the collision point with the triangle
   * @param {Vector3} origin The origin of the ray
   * @param {Vector3} direction The direction of the ray
   * @returns The cillion point
   */
  intersect(origin,direction){
    //First find the collision on the plane
    
    //Get the perpendicular (normal) of the plane that contains this triangle
    let ABC = this.oneTwo.cross(this.threeTwo).normalize();

    if(ABC.dot(direction) == 0){
      return;
    }
    
    //Calculate the D from the plane that contains this triangle
    let D = -(ABC.dot(this.one.position));

    //Calculate the time to collision
    let timeToCollision = (-D-origin.dot(ABC))/(direction.dot(ABC))
    if(timeToCollision <= 0)
      return;
      
    //Calculate the collision location
    let collisionLocation = origin.add(direction.scale(timeToCollision));
    
    //Return all the details about the collision
    return new Collision(timeToCollision, collisionLocation, ABC);
  }
}
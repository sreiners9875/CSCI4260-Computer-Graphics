vsSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main() {
      gl_Position = mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1) * uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
`;
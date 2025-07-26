export function createLiquidGlassCanvas(width = 320, height = 80) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
  
    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return canvas;
    }
  
    const vertShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0, 1);
      }
    `;
  
    const fragShaderSource = `
      precision mediump float;
      uniform float u_time;
      void main() {
        vec2 uv = gl_FragCoord.xy / vec2(${width.toFixed(1)}, ${height.toFixed(1)});
        float wave = sin(uv.y * 20.0 + u_time * 2.0) * 0.03;
        float alpha = 0.5 + wave;
        gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
      }
    `;
  
    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }
  
    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertShaderSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);
  
    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);
  
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  
    const posAttrib = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
  
    const timeLoc = gl.getUniformLocation(program, "u_time");
    let start = performance.now();
  
    function render() {
      const now = performance.now();
      const time = (now - start) / 1000;
      gl.uniform1f(timeLoc, time);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    }
    render();
  
    return canvas;
  }
  
/**
 * Colour-space helper shared by every hand-written shader.
 *
 * When the postprocessing composer is mounted it renders into a linear buffer
 * and encodes to sRGB at the end, so shaders must emit linear values. Without
 * the composer (mobile tier) three writes straight to the canvas and nothing
 * encodes for us — hence the switch. `uEncode` is 1 only in that second case.
 */
export const ENCODE_GLSL = /* glsl */ `
  uniform float uEncode;
  vec3 encodeOut(vec3 c) {
    return mix(c, pow(max(c, vec3(0.0)), vec3(0.4545)), uEncode);
  }
`;

export const BASIC_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

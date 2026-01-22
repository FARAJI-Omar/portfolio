import React, { forwardRef, useEffect, useRef } from 'react';

const fragmentShader = `
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.141592654

uniform vec2 iResolution;
uniform float iTime;
uniform float u_speed;
uniform float u_flightHeight;
uniform float u_crtEffect;
uniform float u_terrainDepth;

const vec4 hsv2rgb_K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 hsv2rgb(vec3 c) {
  vec3 p = abs(fract(c.xxx + hsv2rgb_K.xyz) * 6.0 - hsv2rgb_K.www);
  return c.z * mix(hsv2rgb_K.xxx, clamp(p - hsv2rgb_K.xxx, 0.0, 1.0), c.y);
}

vec4 alphaBlend(vec4 back, vec4 front) {
  float w = front.w + back.w*(1.0-front.w);
  vec3 xyz = (front.xyz*front.w + back.xyz*back.w*(1.0-front.w))/w;
  return w > 0.0 ? vec4(xyz, w) : vec4(0.0);
}

vec3 alphaBlend(vec3 back, vec4 front) {
  return mix(back, front.xyz, front.w);
}

float mod1(inout float p, float size) {
  float halfsize = size*0.5;
  float c = floor((p + halfsize)/size);
  p = mod(p + halfsize, size) - halfsize;
  return c;
}

float planex(vec2 p, float w) {
  return abs(p.y) - w;
}

float circle(vec2 p, float r) {
  return length(p) - r;
}

float pmin(float a, float b, float k) {
  float h = clamp(0.5+0.5*(b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k*h*(1.0-h);
}

float pmax(float a, float b, float k) {
  return -pmin(-a, -b, k);
}

float tanh_approx(float x) {
  float x2 = x*x;
  return clamp(x*(27.0 + x2)/(27.0+9.0*x2), -1.0, 1.0);
}

float hash(float co) {
  return fract(sin(co*12.9898) * 13758.5453);
}

float hash(vec2 p) {
  float a = dot (p, vec2 (127.1, 311.7));
  return fract(sin(a)*43758.5453123);
}

vec3 postProcess(vec3 col, vec2 q) {
  if (u_crtEffect > 0.5) {
    col *= 1.5*smoothstep(-2.0, 1.0, sin(0.5*PI*q.y*iResolution.y));
  }
  col = clamp(col, 0.0, 1.0);
  col = pow(col, vec3(1.0/2.2));
  col = col*0.6+0.4*col*col*(3.0-2.0*col);
  col = mix(col, vec3(dot(col, vec3(0.33))), -0.4);
  col *=0.5+0.5*pow(19.0*q.x*q.y*(1.0-q.x)*(1.0-q.y),0.7);
  return col;
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  float a = hash(i + vec2(0.0,0.0));
  float b = hash(i + vec2(1.0,0.0));
  float c = hash(i + vec2(0.0,1.0));
  float d = hash(i + vec2(1.0,1.0));
  float m0 = mix(a, b, u.x);
  float m1 = mix(c, d, u.x);
  float m2 = mix(m0, m1, u.y);
  return m2;
}

float fbm(vec2 p) {
  const float aa = 0.35;
  const float pp = 2.2-0.4;
  float sum = 0.0;
  float a   = 1.0;
  for (int i = 0; i < 3; ++i) {
    sum += a*vnoise(p);
    a *= aa;
    p *= pp;
  }
  return sum;
}

float height(vec2 p) {
  return fbm(p)*smoothstep(0.0, 1.25+0.25*sin(0.5*p.y), abs(p.x))-0.35;
}

vec3 offset(float z) {
  float a = z;
  vec2 p = -0.05*(vec2(cos(a), sin(a*sqrt(2.0))) + vec2(cos(a*sqrt(0.75)), sin(a*sqrt(0.5))));
  return vec3(p, z);
}

vec3 doffset(float z) {
  float eps = 0.1;
  return 0.5*(offset(z + eps) - offset(z - eps))/eps;
}

vec3 ddoffset(float z) {
  float eps = 0.1;
  return 0.5*(doffset(z + eps) - doffset(z - eps))/eps;
}

vec4 plane(vec3 ro, vec3 rd, vec3 pp, vec3 off, float aa, float n) {
  float h = hash(n);
  vec2 p = (pp-off*2.0*vec3(1.0, 1.0, 0.0)).xy;
  float he = height(vec2(p.x, pp.z));
  float d = p.y-he;
  float t = smoothstep(aa, -aa, d);
  vec3 hsv = vec3(fract(0.7+0.125*sin(0.6*pp.z)), 0.5, smoothstep(aa, -aa, abs(d)-aa));
  float g = exp(-90.*max(abs(d), 0.0));
  hsv.z += g;
  hsv.z += (he*he-pp.y-0.125)*0.5;
  vec3 col = hsv2rgb(hsv);
  return vec4(col, tanh_approx(t+g));
}

float sun(vec2 p) {
  const float ch = 0.0125;
  vec2 sp = p;
  vec2 cp = p;
  mod1(cp.y, ch*6.0);
  float d0 = circle(sp, 0.5);
  float d1 = planex(cp, ch);
  float d2 = p.y+ch*3.0;
  float d = d0;
  d = pmax(d, -max(d1, d2), ch*2.0);
  return d;
}

float df(vec2 p) {
  const float sc = 25.0;
  float ds = sun(p/sc)*sc;
  return ds;
}

vec3 skyColor(vec3 ro, vec3 rd) {
  float aa = 2.0/iResolution.y;
  vec2 p = rd.xy*2.0;
  p.y -= 0.25;
  vec3 sunCol = mix(vec3(1.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0), clamp((0.85 - p.y)*0.75, 0.0, 1.0));
  vec3 glareCol = sqrt(sunCol);
  float ss = smoothstep(-1.05, 0.0, p.y);
  vec3 glow = mix(vec3(1.0, 0.7, 0.6).zyx, glareCol, ss);
  vec3 col = vec3(1.0, 0.0, 1.0)*0.125;
  vec3 corona = 0.65*glow*ss;
  col += corona;
  // Sun removed - only keeping the gradient glow
  return col;
}

vec3 color(vec3 ww, vec3 uu, vec3 vv, vec3 ro, vec2 p) {
  vec2 np = p + 1.0/iResolution.xy;
  float rdd = 2.0;
  vec3 rd = normalize(p.x*uu + p.y*vv + rdd*ww);
  vec3 nrd = normalize(np.x*uu + np.y*vv + rdd*ww);
  float planeDist = 1.0-0.5;
  float furthest = u_terrainDepth;
  float fadeFrom = max(furthest-2.0, 0.0);
  float nz = floor(ro.z / planeDist);
  vec3 skyCol = skyColor(ro, rd);
  vec4 acol = vec4(0.0);
  const float cutOff = 0.95;

  for (int i = 1; i <= 24; ++i) {
    if (float(i) > furthest) break;
    float pz = planeDist*nz + planeDist*float(i);
    float pd = (pz - ro.z)/rd.z;
    vec3 pp = ro + rd*pd;
    if (pp.y < 1.25*u_flightHeight && pd > 0.0 && acol.w < cutOff) {
      vec3 npp = ro + nrd*pd;
      float aa = 3.0*length(pp - npp);
      vec3 off = offset(pp.z);
      vec4 pcol = plane(ro, rd, pp, off, aa, nz+float(i));
      float nz2 = pp.z-ro.z;
      float fadeIn = smoothstep(planeDist*furthest, planeDist*fadeFrom, nz2);
      float fadeOut = smoothstep(0.0, planeDist*0.1, nz2);
      pcol.xyz = mix(skyCol, pcol.xyz, fadeIn);
      pcol.w *= fadeOut;
      pcol = clamp(pcol, 0.0, 1.0);
      acol = alphaBlend(pcol, acol);
    } else {
      acol.w = acol.w > cutOff ? 1.0 : acol.w;
      break;
    }
  }
  vec3 col = alphaBlend(skyCol, acol);
  return col;
}

vec3 effect(vec2 p, vec2 q) {
  float tm  = iTime*0.25*u_speed;
  vec3 ro   = offset(tm);
  vec3 dro  = doffset(tm);
  vec3 ddro = ddoffset(tm);
  vec3 ww = normalize(dro);
  vec3 uu = normalize(cross(normalize(vec3(0.0,1.0,0.0)+ddro), ww));
  vec3 vv = normalize(cross(ww, uu));
  vec3 col = color(ww, uu, vv, ro, p);
  return col;
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 q = fragCoord/iResolution.xy;
  vec2 p = -1.0 + 2.0 * q;
  p.x *= iResolution.x/iResolution.y;
  vec3 col = effect(p, q);
  col *= smoothstep(0.0, 4.0, iTime);
  col = postProcess(col, q);
  gl_FragColor = vec4(col, 1.0);
}
`;

const vertexShader = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const SynthwaveCanyonShaders = forwardRef(
  (
    {
      className = '',
      speed = 1.0,
      flightHeight = 1.0,
      crtEffect = false,
      terrainDepth = 24.0,
      style = {},
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const glRef = useRef(null);
    const programRef = useRef(null);
    const startTimeRef = useRef(Date.now());

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        console.error('WebGL not supported');
        return;
      }
      glRef.current = gl;

      // Compile shaders
      const vs = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vs, vertexShader);
      gl.compileShader(vs);

      const fs = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fs, fragmentShader);
      gl.compileShader(fs);

      if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        console.error('Fragment shader error:', gl.getShaderInfoLog(fs));
        return;
      }

      // Link program
      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);
      programRef.current = program;

      // Setup geometry
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      // Get uniform locations
      const iResolutionLocation = gl.getUniformLocation(program, 'iResolution');
      const iTimeLocation = gl.getUniformLocation(program, 'iTime');
      const speedLocation = gl.getUniformLocation(program, 'u_speed');
      const flightHeightLocation = gl.getUniformLocation(program, 'u_flightHeight');
      const crtEffectLocation = gl.getUniformLocation(program, 'u_crtEffect');
      const terrainDepthLocation = gl.getUniformLocation(program, 'u_terrainDepth');

      const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      resize();
      window.addEventListener('resize', resize);

      // Intersection Observer to pause when not visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!animationRef.current) {
                render();
              }
            } else {
              if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(canvas);

      const render = () => {
        const time = (Date.now() - startTimeRef.current) / 1000;
        
        gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
        gl.uniform1f(iTimeLocation, time);
        gl.uniform1f(speedLocation, speed);
        gl.uniform1f(flightHeightLocation, flightHeight);
        gl.uniform1f(crtEffectLocation, crtEffect ? 1.0 : 0.0);
        gl.uniform1f(terrainDepthLocation, terrainDepth);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        animationRef.current = requestAnimationFrame(render);
      };
      render();

      return () => {
        window.removeEventListener('resize', resize);
        if (observer) {
          observer.disconnect();
        }
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        if (gl && program) {
          gl.deleteProgram(program);
        }
      };
    }, [speed, flightHeight, crtEffect, terrainDepth]);

    return (
      <canvas
        ref={canvasRef}
        className={className}
        style={{ width: '100%', height: '100%', ...style }}
        {...props}
      />
    );
  }
);

SynthwaveCanyonShaders.displayName = 'SynthwaveCanyonShaders';

export default SynthwaveCanyonShaders;

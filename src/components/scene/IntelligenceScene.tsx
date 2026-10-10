import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
const vertex = [
  "uniform float uTime; uniform float uScroll; uniform float uPixelRatio;",
  "attribute float aSeed; varying float vSeed; varying float vDepth;",
  "void main(){ vSeed=aSeed; vec3 p=position;",
  " float wave=sin(p.y*5.0+uTime*.55+aSeed*3.0)*cos(p.x*4.0-uTime*.32);",
  " p+=normalize(p)*wave*.075; float angle=uScroll*.4+p.y*.045*sin(uTime*.3);",
  " p.xz=mat2(cos(angle),-sin(angle),sin(angle),cos(angle))*p.xz;",
  " vec4 mv=modelViewMatrix*vec4(p,1.0); vDepth=smoothstep(-9.0,-3.0,mv.z);",
  " gl_Position=projectionMatrix*mv; gl_PointSize=uPixelRatio*(1.1+aSeed*1.6)*(6.0/-mv.z); }",
].join("\n");
const fragment = [
  "varying float vSeed; varying float vDepth;",
  "void main(){ float d=length(gl_PointCoord-.5); if(d>.5) discard;",
  " vec3 c=mix(vec3(.15,.8,1.0),vec3(.57,.4,1.0),vSeed);",
  " float alpha=pow(1.0-d*2.0,1.4)*(.35+vDepth*.65); gl_FragColor=vec4(c*1.6,alpha); }",
].join("\n");
export default function IntelligenceScene({
  onUnavailable,
}: {
  onUnavailable: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      onUnavailable();
      return;
    }
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.75),
    );
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.setAttribute(
      "aria-label",
      "Animated Genie intelligence core",
    );
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
    camera.position.set(0, 0, 7.5);
    const group = new THREE.Group();
    scene.add(group);
    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
    };
    const count = mobile ? 6500 : 14000;
    const positions = new Float32Array(count * 3),
      seeds = new Float32Array(count);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let index = 0; index < count; index++) {
      const y = 1 - (index / (count - 1)) * 2,
        radius = Math.sqrt(1 - y * y),
        angle = goldenAngle * index;
      const shell = 1.52 + Math.sin(index * 1.73) * 0.015;
      positions[index * 3] = Math.cos(angle) * radius * shell;
      positions[index * 3 + 1] = y * shell;
      positions[index * 3 + 2] = Math.sin(angle) * radius * shell;
      seeds[index] = Math.abs((Math.sin(index * 12.9898) * 43758.5453) % 1);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    group.add(
      new THREE.Points(
        geometry,
        new THREE.ShaderMaterial({
          vertexShader: vertex,
          fragmentShader: fragment,
          uniforms,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      ),
    );
    group.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(1.36, 64, 64),
        new THREE.MeshPhysicalMaterial({
          color: "#081027",
          metalness: 0.85,
          roughness: 0.28,
          emissive: "#0b183b",
          emissiveIntensity: 0.5,
        }),
      ),
    );
    scene.add(new THREE.AmbientLight("#304080", 1.2));
    const light = new THREE.PointLight("#69aaff", 45, 20);
    light.position.set(3, 2, 4);
    scene.add(light);
    const violet = new THREE.PointLight("#7b4aff", 35, 20);
    violet.position.set(-3, -1, 2);
    scene.add(violet);
    const orbit = new THREE.Group();
    orbit.rotation.set(0.95, 0.25, -0.38);
    group.add(orbit);
    for (let index = 0; index < 3; index++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(
          2.05 + index * 0.15,
          index === 0 ? 0.009 : 0.0035,
          6,
          220,
        ),
        new THREE.MeshBasicMaterial({
          color: index === 0 ? "#759bff" : "#546197",
          transparent: true,
          opacity: index === 0 ? 0.8 : 0.3,
        }),
      );
      ring.rotation.set(index * 0.06, index * 0.08, 0);
      orbit.add(ring);
    }
    for (let index = 0; index < 22; index++) {
      const y = -1.4 + index * 0.133,
        radius = Math.sqrt(Math.max(0, 1.52 * 1.52 - y * y));
      const line = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.002, 3, 150),
        new THREE.MeshBasicMaterial({
          color: "#53c4ff",
          transparent: true,
          opacity: 0.13 + (index % 3) * 0.04,
        }),
      );
      line.rotation.x = Math.PI / 2;
      line.position.y = y;
      group.add(line);
    }
    const satellite = new THREE.Mesh(
      new THREE.SphereGeometry(0.065, 16, 16),
      new THREE.MeshBasicMaterial({ color: "#bdcdff" }),
    );
    orbit.add(satellite);
    const starsGeometry = new THREE.BufferGeometry(),
      starPositions = new Float32Array(180 * 3);
    for (let index = 0; index < 180; index++) {
      starPositions[index * 3] = Math.sin(index * 77.33) * 6;
      starPositions[index * 3 + 1] = Math.cos(index * 39.47) * 5;
      starPositions[index * 3 + 2] = -2 - (index % 7);
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    scene.add(
      new THREE.Points(
        starsGeometry,
        new THREE.PointsMaterial({
          color: "#6786b5",
          size: 0.015,
          transparent: true,
          opacity: 0.6,
        }),
      ),
    );
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(
      new UnrealBloomPass(new THREE.Vector2(1, 1), 0.75, 0.5, 0.5),
    );
    composer.addPass(new OutputPass());
    let pointerX = 0,
      pointerY = 0,
      scroll = 0,
      visible = true,
      lastFrame = 0;
    const resize = new ResizeObserver(() => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      composer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    resize.observe(container);
    function frame(time: number) {
      if (time - lastFrame < (mobile ? 32 : 16)) return;
      lastFrame = time;
      const seconds = time / 1000;
      uniforms.uTime.value = seconds;
      uniforms.uScroll.value += (scroll - uniforms.uScroll.value) * 0.05;
      group.rotation.y +=
        (pointerX * 0.85 + seconds * 0.045 + scroll * 0.5 - group.rotation.y) *
        0.04;
      group.rotation.x +=
        (pointerY * 0.4 + Math.sin(seconds * 0.25) * 0.07 - group.rotation.x) *
        0.04;
      group.position.x += (pointerX * 0.25 - group.position.x) * 0.04;
      group.position.y = Math.sin(seconds * 0.65) * 0.06 - scroll * 0.1;
      orbit.rotation.z = -0.38 + seconds * 0.04;
      satellite.position.set(
        Math.cos(seconds * 0.32) * 2.05,
        Math.sin(seconds * 0.32) * 2.05,
        0,
      );
      camera.position.z = 7.5 - Math.min(scroll, 1) * 0.5;
      composer.render();
    }
    function updateActivity() {
      renderer.setAnimationLoop(visible && !document.hidden ? frame : null);
    }
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      updateActivity();
    });
    observer.observe(container);
    const onPointer = (event: PointerEvent) => {
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
    };
    const onScroll = () => {
      scroll = window.scrollY / window.innerHeight;
    };
    const onLost = (event: Event) => {
      event.preventDefault();
      onUnavailable();
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", updateActivity);
    renderer.domElement.addEventListener("webglcontextlost", onLost);
    onScroll();
    updateActivity();
    return () => {
      renderer.setAnimationLoop(null);
      resize.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", updateActivity);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      scene.traverse((object) => {
        const item = object as THREE.Object3D & {
          geometry?: THREE.BufferGeometry;
          material?: THREE.Material | THREE.Material[];
        };
        item.geometry?.dispose();
        if (item.material)
          for (const material of Array.isArray(item.material)
            ? item.material
            : [item.material])
            material.dispose();
      });
      for (const pass of composer.passes) pass.dispose();
      composer.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [onUnavailable]);
  return (
    <div
      className="intelligence-scene"
      data-testid="intelligence-scene"
      ref={host}
      aria-hidden="true"
    />
  );
}

import * as THREE from "three";

// Scene 설정
const scene = new THREE.Scene();

// Renderer 설정
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera 설정
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

// Material 설정
const material = new THREE.LineBasicMaterial({ color: "green" });

// Geometry 설정
const geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10, 0, 0)); // 꼭지점들
geometry.vertices.push(new THREE.Vector3(0, 10, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));

// Object 생성
const line = new THREE.Line(geometry, material);

// Scene 내에 Object 추가
scene.add(line);

// Scene Render
renderer.render(scene, camera);

// Animation
// const animate = () => {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// };
// animate();

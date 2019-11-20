import * as THREE from "three";
import Stats from "stats.js";
import * as dat from "dat.gui";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xeeeeee, 1.0));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;

const axes = new THREE.AxisHelper(20);
scene.add(axes);

const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
plane.receiveShadow = true;
scene.add(plane);

const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
const cubeMaterial = new THREE.MeshLambertMaterial({
  color: 0xff0000
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;
cube.castShadow = true;
scene.add(cube);

const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
const sphereMaterial = new THREE.MeshLambertMaterial({
  color: 0x7777ff
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;
sphere.castShadow = true;
scene.add(sphere);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;
scene.add(spotLight);

camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

document.body.appendChild(renderer.domElement);
// renderer.render(scene, camera);

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

let step = 0;
// const controls = new (function() {
//   this.rotationSpeed = 0.02;
//   this.bouncingSpeed = 0.03;
// })();
const controls = { rotationSpeed: 0.02, bouncingSpeed: 0.03 };
const gui = new dat.GUI();
gui.add(controls, "rotationSpeed", 0, 0.1);
gui.add(controls, "bouncingSpeed", 0, 0.1);

const renderScene = () => {
  stats.begin();
  cube.rotation.y += controls.rotationSpeed;
  cube.rotation.x += controls.rotationSpeed;
  cube.rotation.z += controls.rotationSpeed;
  step += controls.bouncingSpeed;
  sphere.position.x = 20 + 10 * Math.cos(step);
  sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));
  renderer.render(scene, camera);
  stats.end();
  requestAnimationFrame(renderScene);
};
renderScene();

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onResize, false);

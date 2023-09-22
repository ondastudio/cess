let pauseIt = false;

const container = document.querySelector(".experience-container");
let renderer = null;
let scene = null;
let camera = null;

let width = container.getBoundingClientRect().width;
let height = container.getBoundingClientRect().height;
let fixedWidth = container.getBoundingClientRect().width;
let fixedHeight = container.getBoundingClientRect().height;
let dim = Math.min(width, height);
let initDim = dim;

let mouse = { x: width * 0.5, y: height * 0.5 };
let tmouse = { x: width * 0.5, y: height * 0.5 };
let time = 0;
let perspective = 800;

let mesh1, mesh2;
let vel = (tvel = 0.01);
let lightDist, lightOffset, spotLight, backLight1, backLight2;

let updateID = -1;

init();

function init() {
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    stencil: false,
    preserveDrawingBuffer: false // use TRUE to capture sceens;
  });

  renderer.setSize(width, height);

  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x201f1f);

  addEvents();
  setupQuality();
  createMesh();
  initLights();
  initCamera();
  update();
}

function addEvents() {
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  });
  window.addEventListener("click", () => {
    tvel = 0.2;
  });
}

function initLights() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
  scene.add(hemisphereLight);

  scene.add(new THREE.AmbientLight(0x111111));

  lightDist = 4;
  lightOffset = 2;

  backLight1 = new THREE.PointLight(0xffffff, 2);
  backLight1.position.set(dim, dim, 0);
  backLight1.lookAt(0, 0, 0);
  scene.add(backLight1);

  backLight2 = new THREE.PointLight(0xffffff, 2);
  backLight2.position.set(-dim, -dim, 0);
  backLight2.lookAt(0, 0, 0);
  scene.add(backLight2);
}

function initCamera() {
  const fov = (180 * (2 * Math.atan(height / 2 / perspective))) / Math.PI;

  camera = new THREE.PerspectiveCamera(fov, width / height, 50, 900);
  camera.position.set(0, 0, perspective);
  camera.lookAt(0, 0, 0);
}

function createMesh() {
  const texture = new THREE.TextureLoader().load(
    "https://uploads-ssl.webflow.com/650168f5904590fda6b78759/650ab28d4f5e58ac964c7cc1_map.png",
    () => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      const geometry1 = new THREE.SphereGeometry(dim * 0.32, 128, 128);
      const geometry2 = new THREE.SphereGeometry(dim * 0.4, 128, 128);

      const material1 = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true
      });
      const material2 = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true
      });

      mesh1 = new THREE.Mesh(geometry1, material1);
      mesh2 = new THREE.Mesh(geometry2, material2);

      mesh1.position.x = 0;
      mesh1.position.y = 0;
      mesh2.position.x = 0;
      mesh2.position.y = 0;

      scene.add(mesh1, mesh2);
    }
  );
}

function setupQuality() {
  renderer.setClearColor(0x201f1f, 0);
  renderer.shadowMap.autoUpdate = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.gammaFactor = 2.1;
  renderer.physicallyCorrectLights = false;
  renderer.toneMappingExposure = 1;
  renderer.powerPreference = "high-performance";
  renderer.antialias = true;
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
}

function update() {
  if (renderer === undefined || scene === undefined || camera === undefined)
    return;

  if (pauseIt) {
    cancelAnimationFrame(updateID);
  } else {
    updateID = requestAnimationFrame(() => update());
  }

  vel += (tvel - vel) * 0.05;
  time += vel;

  if (tvel > 0.01) tvel -= 0.005;

  if (mesh1) mesh1.rotation.y = time * 0.75;
  if (mesh2) mesh2.rotation.y = time * 0.9;

  renderer.render(scene, camera);
}

function resize() {
  width = container.getBoundingClientRect().width;
  height = container.getBoundingClientRect().height;

  dim = Math.min(width, height);
  const scl = dim / initDim;

  mesh1.scale.set(scl, scl, scl);
  mesh2.scale.set(scl, scl, scl);

  renderer.setSize(width, height);
  camera.fov = (180 * (2 * Math.atan(height / 2 / perspective))) / Math.PI;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function map(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

function pause() {
  pauseIt = true;
}

function start() {
  pauseIt = false;
  update();
}

// Create a scene
const scene = new THREE.Scene();

// Create a camera with perspective view
const camera = new THREE.PerspectiveCamera(
    50, //fov
    window.innerWidth / window.innerHeight,
    0.1, // Near clipping plane
    1000 // Far clipping plane
);
camera.position.z = 5; // Move the camera away from the origin

// make renderer and add it to the DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//torus geometry moment
const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 200, 30);
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("https://bruno-simon.com/prismic/matcaps/3.png"); //i guess we are using web link instead of 3.png who car

const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
const cube = new THREE.Mesh(geometry, material);
cube.position.x = 2;

// Add the cube to the scene
scene.add(cube);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // cube rotate (should be torus rotate instead of cube rotate but who car)
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
}

// window resizing
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


window.addEventListener('mousemove', event => {
    const cursor = { x: 0, y: 0 };
    cursor.x = event.clientX / window.innerWidth - 0.5;
    cursor.y = event.clientY / window.innerHeight - 0.5;
    const cameraX = cursor.x;
    const cameraY = -cursor.y;
    camera.position.x += (cameraX - camera.position.x) / 10;
    camera.position.y += (cameraY - camera.position.y) / 10;
});

// Start the animation loop
animate();

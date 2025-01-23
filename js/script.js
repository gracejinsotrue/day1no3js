// Create a scene
const scene = new THREE.Scene();

// Create a camera with perspective view
const camera = new THREE.PerspectiveCamera(
    50, // FOV
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
);
camera.position.z = 5; // Move the camera away from the origin

// Make renderer and add it to the DOM
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load background texture
const textureLoader = new THREE.TextureLoader();
const bgTexture = textureLoader.load('testbg.png');
scene.background = bgTexture; // Set the background of the scene

// Torus Knot geometry
const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 200, 30);
const matcapTexture = textureLoader.load("https://bruno-simon.com/prismic/matcaps/3.png"); // Using an external texture
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
const torusKnot = new THREE.Mesh(geometry, material);

// Position the torus and add it to the scene
torusKnot.position.x = 2;
torusKnot.position.y = 0;
torusKnot.position.z = 0;
scene.add(torusKnot);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the torus
    torusKnot.rotation.x += 0.1;
    torusKnot.rotation.y += 0.1;

    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// torus moves from mouse,away from mouse, etc
window.addEventListener("mousemove", event => {
    const cursor = { x: 0, y: 0 };
    cursor.x = event.clientX / window.innerWidth - 0.5;
    cursor.y = event.clientY / window.innerHeight - 0.5;
    const cameraX = cursor.x;
    const cameraY = -cursor.y;
    camera.position.x += (cameraX - camera.position.x) / 10;
    camera.position.y += (cameraY - camera.position.y) / 10;
});


animate();

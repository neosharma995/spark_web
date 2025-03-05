"use client";
import { useEffect, useRef, useContext } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SectorDataContext } from "@/context/apiContext";
// import { RGBELoader } from "three/examples/jsm/Addons.js";

export default function MatrixEffect() {
  const canvasRef = useRef();
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'portfolio')?.acf;
  console.log(mainData);

  const images = mainData?.portfolio?.map((e) => e.image) || [];
  const links = mainData?.portfolio?.map((e) => e.link) || [];

 

  useEffect(() => {
    if (images.length === 0 || links.length === 0) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    let toggleButton = document.querySelector('#toggle');
    const loadingManager = new THREE.LoadingManager();
    let loadingWrapper = document.querySelector('.loading');

    loadingManager.onProgress = function (loaded, total) {
      let percentLoaded = Math.floor((loaded / total) * 100);
      if (loadingWrapper) {
        loadingWrapper.value = percentLoaded;
        loadingWrapper.innerText = `${percentLoaded}%`;
      }
    };

    let loadingContainer = document.querySelector('.loading');
    loadingManager.onLoad = function () {
      loadingContainer.style.display = 'none';
    };

    const sizes = { width: window.innerWidth, height: window.innerHeight };
    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 2000);
    camera.position.set(0, 0, 100);

    const loader = new THREE.TextureLoader(loadingManager);
    let texture1 = loader.load('/images/p4.png');
    texture1.colorSpace = THREE.SRGBColorSpace;

    const textures = images.map((imageUrl) => loader.load(imageUrl));
    textures.colorSpace = THREE.SRGBColorSpace;

    // Plane Geometry (Kept unchanged)
    const geometry = new THREE.PlaneGeometry(1000, 1000);
    geometry.rotateX(4.7);
    const material = new THREE.MeshBasicMaterial({ map: texture1 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, -30, 0);
    scene.add(cube);

    
    const cubes = [];
    const geometry1 = new THREE.BoxGeometry(20, 20, 5, 10, 10, 10);

    for (let i = 0; i < images.length * 6; i++) {
      const originalIndex = i % images.length; 
      const material1 = new THREE.MeshBasicMaterial({ map: textures[originalIndex] });
      const cube1 = new THREE.Mesh(geometry1, material1);

      cube1.position.x = Math.random() * 800 - 400;
      cube1.position.y = 0;
      cube1.position.z = Math.random() * 800 - 400;

      cube1.userData = { link: links[originalIndex] }; // Assign correct link
      scene.add(cube1);
      cubes.push(cube1);
    }

    // Raycaster for detecting clicks on portfolio cubes
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubes);

      if (intersects.length > 0) {
        const clickedCube = intersects[0].object;
        const link = clickedCube.userData.link;
        if (link) window.open(link, "_blank"); // Open link in new tab
      }
    };

    // Change cursor to pointer when hovering over a portfolio cube
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubes);

      if (intersects.length > 0) {
        canvas.style.cursor = "pointer";
      } else {
        canvas.style.cursor = "default";
      }
    };

    window.addEventListener("click", onMouseClick);
    window.addEventListener("mousemove", onMouseMove);

    const controls = new OrbitControls(camera, canvas);
    controls.screenSpacePanning = false;
    controls.enableDamping = true;
    controls.minDistance = 50;
    controls.maxDistance = 400;
    controls.maxPolarAngle = Math.PI / 2;

    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    });

    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch(err => {
          console.error(`Fullscreen request failed: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    };

    canvas.addEventListener('dblclick', toggleFullscreen);
    toggleButton.addEventListener('click', toggleFullscreen);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    function animate() {
      renderer.render(scene, camera);
      controls.update();
      window.requestAnimationFrame(animate);
    }

    animate();

    return () => {
      renderer.dispose();
      window.removeEventListener("click", onMouseClick);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [images, links]);

  return (
    <>
      <canvas ref={canvasRef} className="app" />

      <div className="loading">
        <h1>Loading...</h1>
       
      </div>
    </>
  );
}

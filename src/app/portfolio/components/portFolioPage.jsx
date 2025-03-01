'use client'
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function MatrixEffect() {
  const canvasRef = useRef();

  useEffect(() => {
    // Canvas and Renderer
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false; // Prevent clearing between renders

    // Main Scene
    const scene = new THREE.Scene();
    const matrixScene = new THREE.Scene();

    // Cameras
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 20;
    scene.add(camera);

    const matrixCamera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      -window.innerHeight / 2,
      -1,
      1
    );
    matrixCamera.position.z = 1;

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.maxDistance = 50;
    controls.minDistance = 10;

    // Textures
    const textureLoader = new THREE.TextureLoader();
    const textures = [
      "./images/377dfb3a6f6be92038a856784c55436b.jpg",
      "./images/377dfb3a6f6be92038a856784c55436b.jpg",
      "./images/377dfb3a6f6be92038a856784c55436b.jpg",
      "./images/377dfb3a6f6be92038a856784c55436b.jpg",
      "./images/377dfb3a6f6be92038a856784c55436b.jpg",
      "./images/377dfb3a6f6be92038a856784c55436b.jpg",
    ].map((path) => {
      const texture = textureLoader.load(path);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    });

    // Sprites
    const createMesh = (texture) => {
      const material = new THREE.SpriteMaterial({ map: texture, depthWrite: true });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(6, 6, 1); // Scale to fit the image aspect ratio
      return sprite;
    };

    const sprites = textures.map((texture, index) => {
      const sprite = createMesh(texture);
      const row = Math.floor(index / 3);
      const col = index % 3;
      sprite.position.set(-10 + col * 10, 5 - row * 10, 0);
      scene.add(sprite);
      return sprite;
    });

    // Matrix Effect
    const fontSize = 12;
    const languages = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const canvasMatrix = document.createElement("canvas");
    const ctxMatrix = canvasMatrix.getContext("2d");
    canvasMatrix.width = 2048;
    canvasMatrix.height = 1024;

    const columns = Math.floor(canvasMatrix.width / fontSize);
    const rows = Math.floor(canvasMatrix.height / fontSize);
    const drawText = Array(columns).fill().map(() => Array(rows).fill(""));
    const drawStatus = Array(columns).fill().map(() => Array(rows).fill(0));

    const randomSizeColumn = (col) => {
      for (let y = 0; y < rows; y++) {
        drawText[col][y] = languages[Math.floor(Math.random() * languages.length)];
      }
    };

    const randomStart = () => {
      if (Math.random() > 0.5) {
        const column = Math.floor(Math.random() * columns);
        if (drawStatus[column].every((status) => status === 0)) {
          drawStatus[column][0] = 100;
        }
      }
    };

    const fallSpeed = 2;
    let frameCounter = 0;
    
    function drawMatrixEffect() {
      ctxMatrix.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctxMatrix.fillRect(0, 0, canvasMatrix.width, canvasMatrix.height);
    
      for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
          if (drawStatus[x][y] === 100) {
            if (frameCounter % fallSpeed === 0) {
              drawStatus[x][y] = 0;
              ctxMatrix.font = `${fontSize}px Monospace`;
              ctxMatrix.fillStyle = "green";
              ctxMatrix.fillText(drawText[x][y], x * fontSize, y * fontSize);
    
              if (y + 1 < rows) {
                drawStatus[x][y + 1] = 100;
              } else {
                randomSizeColumn(x);
              }
            }
            break;
          }
        }
      }
    
      frameCounter++;
    }
    
    

    const matrixTexture = new THREE.CanvasTexture(canvasMatrix);
    const matrixMaterial = new THREE.MeshBasicMaterial({ map: matrixTexture });
    const matrixPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(window.innerWidth, window.innerHeight),
      matrixMaterial
    );
    matrixScene.add(matrixPlane);

    // Resize Handler
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      matrixPlane.geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
      matrixTexture.needsUpdate = true;
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      randomStart();
      drawMatrixEffect();
      matrixTexture.needsUpdate = true;

      sprites.forEach((sprite, index) => {
        sprite.rotation.z = Math.sin(elapsedTime + index) * 0.5;
      });

      controls.update();

      renderer.clear();
      renderer.render(matrixScene, matrixCamera);
      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="app" />;
}

'use client'
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function MatrixEffect() {
  const canvasRef = useRef();

  useEffect(() => {
     
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.background=new THREE.Color(0x171717)

    const sizes={
      width:window.innerWidth,
      height:window.innerHeight
    }
   
    
    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 2000);
    camera.position.set(0, 0, 100);
    
    let texture1=new THREE.TextureLoader().load('/images/image.png')
    let texture2=new THREE.TextureLoader().load('/images/pexels-eberhardgross-448714.jpg')
    const geometry = new THREE.PlaneGeometry(1000,1000);
    geometry.rotateX(4.7)
    const material = new THREE.MeshBasicMaterial({ map:texture1 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0,-30,0)
    scene.add(cube);



    const geometry1 = new THREE.BoxGeometry(20,20,5,10,10,10);
    const material1 = new THREE.MeshBasicMaterial({ map:texture2 });

    for(let i=0;i<100;i++){
      const cube1 = new THREE.Mesh(geometry1, material1);
      cube1.position.x=Math.random()*800-400
      cube1.position.y=0
      cube1.position.z=Math.random()*800-400
      scene.add(cube1);
    }

    const controls = new OrbitControls(camera, canvas);
    controls.screenSpacePanning=false
    controls.enableDamping = true;
    controls.minDistance = 100;
    controls.maxDistance = 500;
    controls.maxPolarAngle=Math.PI/2



    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
  });
    
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    function animate() {

        renderer.render(scene, camera);  
        controls.update()      
        window.requestAnimationFrame(animate)
    }
    animate()

    return () => {
      
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="app" />;
}

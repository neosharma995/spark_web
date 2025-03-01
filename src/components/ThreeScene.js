'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { COUNT_OF_VERTEXES, ANIMATION_SPEED, LIL_GUI_COLOR, PARTICLE_GEOMETRY__COLOR } from '@/utils/constents';
import { FontLoader, TextGeometry, TTFLoader } from 'three/examples/jsm/Addons.js';
import { useTheme } from '@/context/ThemeContext';

export const ThreeRenderScene = () => {

    const { isLightMode } = useTheme();

   

    const canvasRef = useRef(null);

    useEffect(() => {
        // 1. Create Scene
        const scene = new THREE.Scene();

        // 2. Get Canvas Element
        const canvas = canvasRef.current;

        // 3. Load Texture
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('./images/water.jpg');

        // 4. Initial Properties
        const initialProps = {
            radius: 1.6,
            widthSegments: 48,
            heightSegments: 44,
            color: LIL_GUI_COLOR,
            positionX: 0,
            positionY: 0.1,
        };

        const prop = { ...initialProps };

        // 5. Particles Geometry and Material
        const particlesGeometry = new THREE.BufferGeometry();
        const count = COUNT_OF_VERTEXES;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 12;
            colors[i] = Math.random();
        }

        // Set particle attributes
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.01,
            sizeAttenuation: true,
            color: new THREE.Color(PARTICLE_GEOMETRY__COLOR),
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
        });

        // Create particles
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // 6. Sphere Geometry and Material
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(prop.radius, prop.widthSegments, prop.heightSegments),
            new THREE.MeshBasicMaterial({ wireframe: true, map: texture })
        );
        scene.add(sphere);

        const loader = new TTFLoader();
        const fontLoader = new FontLoader();
        let textMesh = null;
        let explosion = true;
        let textMaterial;





        
        const fireTexture = new THREE.TextureLoader().load('./textures/fire.jpg'); // Load fire texture
        loader.load('./fonts/Montserrat-Regular.ttf', function (json) {
        const font = fontLoader.parse(json);

        const textGeometry = new TextGeometry('🔥 Sparkweb Solutions 🔥', {
        font: font,
        size: 1,
        color:red,
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4
    });

    // Fire Shader Material
    textMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            fireTexture: { value: fireTexture },
            color1: { value: new THREE.Color(0xffffff) }, // White
            color2: { value: new THREE.Color(0xfff8dc) }, // Off-white
            intensity: { value: 1.0 }
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vPosition;
            uniform float time;
            void main() {
                vUv = uv;
                vPosition = position;
                vec3 pos = position;
                pos.y += sin(time + pos.x * 5.0) * 0.15; // Wavy fire movement
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            varying vec2 vUv;
            uniform float time;
            uniform sampler2D fireTexture;
            uniform vec3 color1;
            uniform vec3 color2;
            uniform float intensity;
    
            float noise(vec2 p) {
                return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            }
    
            void main() {
                float flame = noise(vUv * 10.0 + time * 3.0);
                vec3 color = mix(color1, color2, flame); // Smooth transition from white to off-white
    
                vec4 fire = texture2D(fireTexture, vUv + vec2(0.0, sin(time * 2.0) * 0.05)); 
    
                // Ensure full brightness by increasing intensity
                gl_FragColor = vec4(color * fire.rgb * 1.5, intensity); 
            }
        `,
        transparent: true
    });
    










    // Create text mesh
    textMesh = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(textMesh);

    textMesh.position.set(4, -1.5, 0); // Start from the right and move along the bottom
    textMesh.scale.set(0.1, 0.1, 0.1);

    // Fire Animation
    function animateFire() {
        textMaterial.uniforms.time.value += 0.02;

        if (textMesh.position.x > -6 && !explosion) {
            textMesh.position.x -= 0.02; // Marquee effect
        } else if (!explosion) {
            triggerExplosion(); // When it reaches the left, trigger explosion
        }

        requestAnimationFrame(animateFire);
    }

    animateFire();
});

// Meteor Explosion Effect + Loop
function triggerExplosion() {
    explosion = true;
    let explosionScale = 0.1;

    function explode() {
        if (explosionScale < 2.5) {
            explosionScale += 0.05;
            textMesh.scale.set(explosionScale, explosionScale, explosionScale);
            textMaterial.uniforms.intensity.value -= 0.03; // Reduce fire brightness
            textMesh.position.y += 0.05; // Move upwards as if burning away
            requestAnimationFrame(explode);
        } else {
            resetTextMesh(); // Reset after explosion to create a loop
        }
    }
    explode();
}

// Reset Text for Looping Effect
function resetTextMesh() {
    textMesh.position.set(4, -1.5, 0); // Restart at right side
    textMesh.scale.set(0.1, 0.1, 0.1);
    textMaterial.uniforms.intensity.value = 1.0; // Restore brightness
    explosion = false;
   }

        sphere.position.y = 0;

        // 7. Create GUI
        const gui = new GUI({ title: 'Play With 3D Scene', closeFolders: true });
        gui.close();

        const heightAndWidth = gui.addFolder('Height Width');
        const settings = gui.addFolder('Scene Settings');

        settings.add(sphere.position, 'y').min(-3).max(3).step(0.1).name('Position Y');
        settings.add(sphere.position, 'x').min(-3).max(3).step(0.1).name('Position X');
        settings.add(sphere.material, 'wireframe').name('Wireframe');
        settings.addColor(prop, 'color').onChange(() => {
            sphere.material.color.set(prop.color);
        });

        const updateGeometry = () => {
            sphere.geometry.dispose();
            sphere.geometry = new THREE.SphereGeometry(prop.radius, prop.widthSegments, prop.heightSegments);
        };

        heightAndWidth.add(prop, 'radius').min(0.1).max(10).step(0.1).name('Radius').onChange(updateGeometry);
        heightAndWidth.add(prop, 'widthSegments').min(3).max(64).step(1).name('Width Segments').onChange(updateGeometry);
        heightAndWidth.add(prop, 'heightSegments').min(3).max(64).step(1).name('Height Segments').onChange(updateGeometry);

        gui.add(
            {
                reset: () => {

                    Object.assign(prop, initialProps);
                    sphere.material.color.set(prop.color);
                    sphere.geometry.dispose();
                    sphere.geometry = new THREE.SphereGeometry(prop.radius, prop.widthSegments, prop.heightSegments);
                    sphere.position.x = prop.positionX;
                    sphere.position.y = prop.positionY;


                    gui.controllers.forEach((controller) => controller.updateDisplay());
                },
            },
            'reset'
        ).name('Reset');

        // 8. Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };


        // 9. Camera
        const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 1000);
        camera.position.z = 4;
        scene.add(camera);

        // 10. Controls
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;
        controls.maxDistance = 5;

        // Handle scroll to the next section
        const nextSection = document.querySelector('.section_2');
        const handleScroll = (event) => {
            const distance = camera.position.distanceTo(controls.target);
            if (distance >= controls.maxDistance) {
                event.preventDefault(); // Stop default zoom behavior

                setTimeout(() => {
                    nextSection.scrollIntoView({ behavior: 'smooth' });

                }, 500);
            }
        };

        canvas.addEventListener('wheel', handleScroll, { passive: false });

        const toggleButton = document.getElementById('toggle'); 
        const toggleGUIAndButton = () => {
            const section1 = document.querySelector('.section_1');
            const section0 = document.querySelector('.section_0');

            if (section1 && section0) {
                const section1Rect = section1.getBoundingClientRect();
                const section0Rect = section0.getBoundingClientRect();

                if (section1Rect.top <= window.innerHeight / 2 && section1Rect.bottom >= 0) {
                    gui.hide();
                    if (toggleButton) toggleButton.style.display = 'none';
                } else if (section0Rect.top <= window.innerHeight / 2 && section0Rect.bottom >= 0) {
                    gui.show();
                    if (toggleButton) toggleButton.style.display = 'block'; 
                }
            }
        };

        window.addEventListener('scroll', toggleGUIAndButton);




        // 11. Handle Window Resize
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


        let welcomeTextMesh = null; // Static welcome text

        loader.load('./fonts/Montserrat-Regular.ttf', function (json) {
            const font = fontLoader.parse(json);
        
            // Create Text Geometry for "Welcomes You"
            const welcomeGeometry = new TextGeometry('Spark Web Solutions Welcomes You', {
                font: font,
                size: 1, // Smaller than marquee text
                depth: 0.21,
                bevelEnabled: true,
                bevelThickness: 0.07,
                bevelSize: 0.06,
                bevelOffset: 0,
                bevelSegments: 6
            });
        
            const welcomeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff}); // Pure white color
        
            // Create Mesh for Welcome Text
            welcomeTextMesh = new THREE.Mesh(welcomeGeometry, welcomeMaterial);
            scene.add(welcomeTextMesh);
        
            // Position Above Everything
            welcomeTextMesh.position.set(-1.3, 0, 0); // Slightly above the fire text
            welcomeTextMesh.scale.set(0.1, 0.1, 0.1); // Make sure it's proportional
        });
        
        

        // 11. Renderer
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        if (isLightMode) {
            renderer.setClearColor(0x59B0FF, 0.7);  
          } else {
            renderer.setClearColor(0x000000, 0.7);  
          }
       
         


        // 12. Handle Window Resize
        window.addEventListener('resize', () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
        });

        // 13. Animation
        const clock = new THREE.Clock();
      
        const tick = () => {
            const elapsedTime = clock.getElapsedTime();

            // Rotate particles and sphere
            particles.rotation.y = elapsedTime * ANIMATION_SPEED;
            sphere.rotation.y = elapsedTime * ANIMATION_SPEED;

            // Update controls
            controls.update();

            // Render the scene
            renderer.render(scene, camera);
            

            // Call tick again on the next frame
            window.requestAnimationFrame(tick);
        };

        tick();

        return () => {
            gui.destroy();
            canvas.removeEventListener('wheel', handleScroll);
            renderer.dispose();
        };
    }, [isLightMode]);

    return (
        <>
            <canvas ref={canvasRef} className="app" />

        </>
    );
};
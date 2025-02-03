'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { COUNT_OF_VERTEXES, ANIMATION_SPEED, LIL_GUI_COLOR, PARTICLE_GEOMETRY__COLOR } from '@/utils/constents';
import { FontLoader, TextGeometry, TTFLoader } from 'three/examples/jsm/Addons.js';

export const ThreeRenderScene = () => {
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
            radius: 1,
            widthSegments: 32,
            heightSegments: 32,
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
            positions[i] = (Math.random() - 0.5) * 10;
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
        let textGeometry = null;
        let index = 0;
        const fullText = `welcome to the starkweb solutions`;



        loader.load('./fonts/Montserrat-Regular.ttf', function (json) {
            const font = fontLoader.parse(json);

            // Initial empty geometry
            textGeometry = new TextGeometry('', {
                font: font,
                size: 1,
                depth: 0,  
                bevelEnabled: false,
                bevelThickness: 0,
                bevelSize: 0,
                bevelOffset: 0,
                bevelSegments: 0
            });

            const textMaterial = new THREE.MeshBasicMaterial({ color: '#F24B74' });

            // Create text mesh
            textMesh = new THREE.Mesh(textGeometry, textMaterial);
            // scene.add(textMesh);

            
            textMesh.position.set(-4, -1.5, 0)
            textMesh.scale.set(0.1, 0.1, 0.1);


            function typeText() {
                if (index > fullText.length) {
                    index = 0;
                    setTimeout(typeText, 1000);
                    return;
                }

                // Update text geometry
                textMesh.geometry.dispose();
                textMesh.geometry = new TextGeometry(fullText.substring(0, index), {
                    font: font,
                    size: 1,
                    depth: 0,
                    bevelEnabled: false,
                    bevelThickness: 0,
                    bevelSize: 0,
                    bevelOffset: 0,
                    bevelSegments: 0
                });

                index++;


                setTimeout(typeText, 200);
            }

            typeText();

        });









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
        camera.position.z = 3;
        scene.add(camera);

        // 10. Controls
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;
        controls.maxDistance = 5;
      

    
        // Handle scroll to the next section
        const nextSection = document.querySelector('.section_1');
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




        // 11. Renderer
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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



            if (textMesh) {
                textMesh.quaternion.copy(camera.quaternion);
                controls.enabled = true; 
            }
            
            




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
    }, []);

    return (
        <>
            <canvas ref={canvasRef} className="three-canvas" />
            <style jsx>{`
                .three-canvas {
                    width: 100%;
                    height: 700px;
                }

                @media (max-width: 992px) {
                    .three-canvas {
                        height: 700px;
                    }
                }

                @media (max-width: 768px) {
                    .three-canvas {
                        height: 600px;
                    }
                }

                @media (max-width: 600px) {
                    .three-canvas {
                        height: 500px;
                    }
                }

                @media (max-width: 480px) {
                    .three-canvas {
                        height: 500px;
                    }
                }

                @media (max-width: 400px) {
                    .three-canvas {
                        height: 500px;
                    }
                }

                @media (max-width: 320px) {
                    .three-canvas {
                        height: 500px;
                    }
                }
            `}</style>
        </>

    );
};
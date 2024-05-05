<template>

    <canvas id="canvas"></canvas>
    <Options :key="selectedTechnology" :selectedTechnology="(selectedTechnology) ? selectedTechnology : {}" @technoChanged="technoChanged"/>
    <TechnologyCard v-if="selectedTechnologyCard" :technologyInfo="selectedTechnologyCard" @closeCard="selectedTechnology = null"/>
</template>

<script setup lang="ts">

    import { onMounted, computed, ref } from "vue";
    import * as THREE from "three";
    import { OrbitControls } from "three/addons/controls/OrbitControls";
    import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
    // import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare.js";
    import { TECHNOLOGIES } from "@/constants";
    import Options from "@components/Options.vue";
    import TechnologyCard from "@components/TechnologyCard.vue";

    const loader = new GLTFLoader();
    const emits = defineEmits(["onSceneLoad"]);

    const speed = ref<number>(86400);
    const selectedTechnologyCard = ref(null);

    let clickedTechnology = null;
    let selectedTechnology = ref(null);
    let hoverObject = {
        technology: null,
        outline: null,
    };
    let technologies = [];

    onMounted(async () => {
        // Create scene
        const scene = createScene();
        const bacakgroundScene = createBackgroundScene();
        const camera = createCamera();
        const renderer = createRenderer(scene, camera);

        setupLighting(scene);

        const controls = createControls(camera, renderer);

        await createSolarSystem(scene);

        const clock = new THREE.Clock();

        const mouse = new THREE.Vector2();

        const raycaster = new THREE.Raycaster();

        renderer.autoClear = false;
        camera.layers.enable(1);

        renderer.setAnimationLoop(() => {
            // Update technologies
            let delta = clock.getDelta();
            for (let technology of technologies) {
                technology.tick(delta);
            }
            // Make cameara follow selected technology
            if (selectedTechnology.value) {
                selectedTechnology.value.children[0].getWorldPosition(controls.target);
                let box = new THREE.Box3().setFromObject(selectedTechnology.value.children[0].children[0]);
                let diameter = Math.max(Math.abs(box.max.x - box.min.x), Math.abs(box.max.y - box.min.y), Math.abs(box.max.z - box.min.z));
                // Set default distance and target to nicolas
                // Change min/max camera distance to suit given technology
                controls.minDistance = (selectedTechnology.value.name === "nicolas") ? 60 : diameter * 1.25;
                controls.maxDistance = (selectedTechnology.value.name === "nicolas") ? 500 : diameter * 2.5;
                if (selectedTechnology.value.name === "nicolas") controls.target.set(0, 0, 0);

                selectedTechnologyCard.value = selectedTechnology.value.userData;
            }
            else selectedTechnologyCard.value = null;
            
            controls.update();
            
            // Technology hover effect
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(technologies, true);
            if (intersects.length > 0 && hoverObject.technology == null) {
                hoverObject.technology = intersects[0].object;
                hoverObject.outline = highlightTechnology(intersects[0].object);
            }
            else if (intersects.length > 0 && hoverObject.technology !== intersects[0].object) {
                unhighlightTechnology(hoverObject.technology);
                hoverObject.technology = intersects[0].object;
                hoverObject.outline = highlightTechnology(intersects[0].object);
            }
            else if (intersects.length === 0 && hoverObject.technology != null) {
                unhighlightTechnology(hoverObject.technology);
                hoverObject.technology = null;
                hoverObject.outline = null;
            }

            renderer.clear();
            camera.layers.set(1);
            renderer.render(bacakgroundScene, camera);
            renderer.render(scene, camera);

            camera.layers.set(0);
            renderer.render(scene, camera);
        })

        // Resize renderer when window size changes 
        window.onresize = () => {
            // Update renderer
            resizeRenderer(renderer);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }

        const canvas = document.getElementById("canvas");
        canvas.addEventListener("mousemove", (e) => {
	        e.preventDefault();

            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
        });

        canvas.addEventListener("mousedown", (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;

            if (hoverObject.technology != null) {
                const technology = findMeshTechnology(hoverObject.technology);
                if (technology) clickedTechnology = technology.name;
            }
        });

       canvas.addEventListener("mouseup", (e) => {
            if (!clickedTechnology) return;
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;

            if (hoverObject.technology != null) {
                const technology = findMeshTechnology(hoverObject.technology);
                if (technology.name !== clickedTechnology) {
                    clickedTechnology = null; 
                    return;
                }
                
                selectedTechnology.value = technology;
                clickedTechnology = null;
            }
        });

        emits('onSceneLoad');
    });

    // Look through list of all technologies and initialize them
    async function createSolarSystem(scene) {
        for (let technology of TECHNOLOGIES) {
            // Load 3D model
            let gltf = await loader.loadAsync(`/assets/gltf/${technology.name}.glb`);
            let updateObject;
            let userData = getUserDataFor(technology);
            // Get the object the technology is orbitting
            if (technology.orbitObject) {
                let orbitObject = findOrbitObject(technologies, technology.orbitObject);
                gltf.scene.position.z = technology.scaledOrbitalRadius;
                gltf.scene.rotation.z = THREE.MathUtils.degToRad(technology.axialTilt ?? 0);

                // Create a pivot for orbit
                let pivot = new THREE.Object3D();
                pivot.name = technology.name;
                pivot.userData = userData;
                pivot.userData.isPivot = true;
                pivot.add(gltf.scene);
                pivot.rotation.x = THREE.MathUtils.degToRad(technology.orbitalInclination);

                updateObject = pivot;

                // Create trajectory for technology's orbit
                const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
                material.side = THREE.DoubleSide;
                material.transparent = true;
                material.opacity = 0.15;
                let trajectory = new THREE.Mesh(new THREE.TorusGeometry(technology.scaledOrbitalRadius, 0.05, 8, 64 ), material);
                trajectory.rotation.x = THREE.MathUtils.degToRad(90);
                pivot.add(trajectory);

                gltf.scene.children[0].userData.trajectory = trajectory;
                gltf.scene.children[0].userData.canHover = true;

                orbitObject.add(pivot);
                technologies.push(pivot);
            }
            else {
                // This is basically only for Sun
                let group = new THREE.Group();
                gltf.scene.rotation.z = THREE.MathUtils.degToRad(technology.axialTilt ?? 0);
                group.add(gltf.scene);
                group.userData = userData;
                gltf.scene.userData.canHover = true;
                group.name = technology.name;

                updateObject = group;

                scene.add(group);
                technologies.push(group);
            }

            // Update event
            createUpdateLoop(updateObject);
        }
    }

    // Creates outline around technology and makes trajectory brighter
    function highlightTechnology(mesh) {
        if (!mesh.parent.userData.canHover) return;
        mesh.parent.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material.emissive = new THREE.Color(0x404040);
                child.material.emissiveIntensity = 1.31;
            }
        });

        const trajectory = mesh.parent.userData.trajectory;
        if (trajectory) {
            trajectory.material.opacity = 1;
        }

        return null;
    }
    
    // Removes outline from technology and makes trajectory transparent
    function unhighlightTechnology(mesh) {
        if (!mesh?.parent.userData.canHover) return;
        mesh.parent.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material.emissive = new THREE.Color(0x000000);
            }
        });
        const trajectory = mesh.parent.userData.trajectory;
        if (trajectory) {
            trajectory.material.opacity = 0.15;
        }
    }

    // Finds the correct object to orbit in the list of technologies
    function findOrbitObject(technologies, name) {
        let technology = technologies.find(p => p.name === name);
        if (technology.userData.isPivot) {
            return technology.children.find(p => !p.userData.isPivot);
        }
        return technology;
    }

    // Return the technology that contains given mesh
    function findMeshTechnology(mesh) {
        if (mesh.userData.isTechnology) return mesh;
        return mesh.parent == null ? null : findMeshTechnology(mesh.parent);
    }

    // Adds tick method to technology that runs every frame 
    function createUpdateLoop(technology) {
        technology.tick = (e) => {
            // Technology orbit around its parent
            if (technology.userData.orbitalRadius !== 0) {
                technology.userData.currentDistance += (technology.userData.orbitalVelocity * e) * speed.value;

                if (technology.userData.currentDistance > technology.userData.orbitalCircumference) {
                    technology.userData.currentDistance = technology.userData.currentDistance % technology.userData.orbitalCircumference
                }

                technology.rotation.y = technology.userData.currentDistance / technology.userData.orbitalCircumference * Math.PI * 2;
            }

            // Technology rotation around its own axis 
            technology.userData.currentRotation += (technology.userData.rotationVelocity * e) * speed.value;
            let rY = technology.userData.currentRotation / technology.userData.technologyCircumference * Math.PI * 2;
            // Find the Group that holds the Meshes and roatate it
            if (technology.userData.isPivot) {
                technology.children[0].children[0].rotation.y = rY;
            }
            else {
                technology.children[0].rotation.y = rY;
            }
        };  
    }

    function createScene() {
        const scene = new THREE.Scene();

        return scene;
    }

    // Create and cofigure camera and return it 
    function createCamera() { 
        const camera = new THREE.PerspectiveCamera(47, window.innerWidth / window.innerHeight, 0.1, 1000);

        return camera;
    }

    // Create a separate scene with background 
    function createBackgroundScene() {
        const backgroundScene = new THREE.Scene();
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            './assets/universe.jpg',
            './assets/universe.jpg',
            './assets/universe.jpg',
            './assets/universe.jpg',
            './assets/universe.jpg',
            './assets/universe.jpg',
        ]);            
        backgroundScene.background = texture;

        return backgroundScene;
    }

    // Create and configure renderer and return it 
    function createRenderer(scene, camera) {
        const renderer = new THREE.WebGLRenderer({
            powerPreference: "high-performance",
            canvas: document.getElementById("canvas"),
            antialias: true,
            alpha: true,
        });
        renderer.setClearColor(0x000000, 0);

        resizeRenderer(renderer);

        renderer.autoClearColor = false;
        renderer.render(scene, camera);

        return renderer;
    }
    
    // Create and configure controls and return it 
    function createControls(camera, renderer) {
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.autoRotate = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.enablePan = false;
        controls.minDistance = 60;
        controls.maxDistance = 500;
        controls.object.rotation.x = -0.841;
        controls.object.rotation.y = 0.528;
        controls.object.rotation.z = 0.513;
        controls.object.position.x = 98.467;
        controls.object.position.y = 125.67;
        controls.object.position.z = 112.32;

        return controls;
    }

    function setupLighting(scene) {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        // Light from the Sun
        // const pointLight = new THREE.PointLight(0xffe8e0, 1.5, 300);
        // scene.add(pointLight);

        // Add a sun texture to the point of light
        // const textureLoader = new THREE.TextureLoader();
        // const textureFlare0 = textureLoader.load( "./assets/textures/lensflare0.png" );
        // const textureFlare1 = textureLoader.load( "./assets/textures/lensflare1.png" );
        // const lensflare = new Lensflare();
        // lensflare.layers.enable(1);
        // lensflare.addElement( new LensflareElement(textureFlare0, 100));
        // lensflare.addElement( new LensflareElement(textureFlare1, 40));
        // pointLight.add(lensflare);

        // Lights used to bright up the sun
        // const rectLight1 = new THREE.RectAreaLight(0xffffff, 7, 20, 25);
        // rectLight1.position.set(-12, 0, 0);
        // rectLight1.lookAt(0, 0, 0)
        // scene.add(rectLight1);

        // const rectLight2 = new THREE.RectAreaLight(0xffffff, 7, 20, 25);
        // rectLight2.position.set(12, 0, 0);
        // rectLight2.lookAt(0, 0, 0)
        // scene.add(rectLight2);

        const rectLight3 = new THREE.RectAreaLight(0xffffff, 7, 20, 20);
        rectLight3.position.set(0, 10, 12);
        rectLight3.lookAt(0, 0, 0)
        scene.add(rectLight3);

        const rectLight4 = new THREE.RectAreaLight(0xffffff, 7, 20, 20);
        rectLight4.position.set(0, 10, -12);
        rectLight4.lookAt(0, 0, 0)
        scene.add(rectLight4);

        const rectLight5 = new THREE.RectAreaLight(0xffffff, 7, 20, 20);
        rectLight5.position.set(0, -10, 12);
        rectLight5.lookAt(0, 0, 0)
        scene.add(rectLight5);

        const rectLight6 = new THREE.RectAreaLight(0xffffff, 7, 20, 20);
        rectLight6.position.set(0, -10, -12);
        rectLight6.lookAt(0, 0, 0)
        scene.add(rectLight6);

        // Directional lights used to get better shading
        const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.1);
        dirLight1.position.set(-250, 15, 0);
        dirLight1.lookAt(0, 0, 0);
        scene.add(dirLight1);
            
        const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.1);
        dirLight2.position.set(250, 15, 0);
        dirLight2.lookAt(0, 0, 0);
        scene.add(dirLight2);
            
        const dirLight3 = new THREE.DirectionalLight(0xffffff, 0.1);
        dirLight3.position.set(0, 15, -250);
        dirLight3.lookAt(0, 0, 0);
        scene.add(dirLight3);
        
        const dirLight4 = new THREE.DirectionalLight(0xffffff, 0.1);
        dirLight4.position.set(0, 15, 250);
        dirLight4.lookAt(0, 0, 0);
        scene.add(dirLight4);
    }

    // Set's the renderers size to current window size
    function resizeRenderer(renderer) { 
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // triggerred when technomenu is clicked
    function technoChanged(new_techno) {
        clickedTechnology = new_techno;
        const technology = getTechnoFromName(new_techno);
        selectedTechnology.value = technology;
        hoverObject.technology = technology;
        clickedTechnology = null;
    }

    function getTechnoFromName(name) {
        for (let i = 0; i < technologies.length; i++) {
            if (technologies[i].name === name) return technologies[i];
        }
        return null;
    }

    function getUserDataFor(technology) {
        return {
            orbitObject: technology.orbitObject,
            orbitalVelocity: technology.orbitalVelocity,
            orbitalRadius: technology.orbitalRadius,
            currentDistance: 2 * Math.PI * technology.orbitalRadius * Math.random(),
            currentRotation: 0,
            technologyCircumference: 2 * Math.PI * technology.radius,
            orbitalCircumference: 2 * Math.PI * technology.orbitalRadius,
            scaledOrbitalRadius: technology.scaledOrbitalRadius,
            rotationVelocity: technology.rotationVelocity,
            isPivot: false,
            isTechnology: true,
            name: technology.name,
            displayName: technology.displayName,
            caption: technology.caption,
            description: technology.description,
            containerManager: technology.containerManager,
            sourceCode: technology.sourceCode,
        };
    }

</script>

<style scoped lang="scss">

    #canvas{
        width: 100vw;
        height: 100vh;
    }

    .date-display {
        position: absolute;
        top: 0;
        left: 0;
        padding: 1em;
        display: flex;
        gap: 8px;

        &.disabled{
            opacity: 0.2;
        }
    }

    @media (max-width: 560px) {
        .date-display {
            top: 16px;
        }
    }

</style>
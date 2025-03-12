// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// window.onload = () => loadModel();

// function loadModel() {
//   const loader = new GLTFLoader();
//   const loadingElement = document.getElementById('avaturn-loading');

//   loader.load('model/avatar.glb',
//     (gltf) => {
//       setupScene(gltf);
//       if (loadingElement) {
//         loadingElement.style.display = 'none';
//       }
//     },
//     (xhr) => {
//       if (loadingElement) {
//         const percentCompletion = Math.round((xhr.loaded / xhr.total) * 100);
//         loadingElement.innerText = `Loading... ${percentCompletion}%`;
//         console.log(`Loading model... ${percentCompletion}%`);
//       }
//     },
//     (error) => {
//       console.log('Error:', error);
//       if (loadingElement) {
//         loadingElement.innerText = 'Error loading model';
//       }
//     }
//   );
// }

// function setupScene(gltf) {
//   const renderer = new THREE.WebGLRenderer({
//     antialias: true,
//     alpha: true
//   });
//   renderer.outputColorSpace = THREE.SRGBColorSpace;

//   const container = document.getElementById('avaturn-container');
//   renderer.setSize(container.clientWidth, container.clientHeight);
//   renderer.setPixelRatio(window.devicePixelRatio);

//   renderer.shadowMap.enabled = true;
//   renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//   container.appendChild(renderer.domElement);

//   // camera
//   const camera = new THREE.PerspectiveCamera(
//     45,
//     container.clientWidth / container.clientHeight,
//     0.1,
//     1000
//   );
//   camera.position.set(0.2, 0.5, 1);

//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.enableDamping = true;
//   controls.enablePan = false;
//   controls.enableZoom = false;
//   controls.minDistance = 3;
//   controls.minPolarAngle = 1.4;
//   controls.maxPolarAngle = 1.4;
//   controls.target = new THREE.Vector3(0, 0.75, 0);
//   controls.update();

//   // scene
//   const scene = new THREE.Scene();

//   // lights
//   scene.add(new THREE.AmbientLight());

//   const spotLight = new THREE.SpotLight(0xffffff, 20, 8, 1);
//   spotLight.penumbra = 0.5;
//   spotLight.position.set(0, 4, 2);
//   spotLight.castShadow = true;
//   scene.add(spotLight);

//   const keyLight = new THREE.DirectionalLight(0xffffff, 2);
//   keyLight.position.set(1, 1, 2);
//   keyLight.lookAt(new THREE.Vector3(0, 0, 0));
//   scene.add(keyLight);

//   // model
//   const avatar = gltf.scene;
//   avatar.traverse((child) => {
//     if (child.isMesh) {
//       child.castShadow = true;
//       child.receiveShadow = true;
//     }
//   });
//   scene.add(avatar);

//   // pedestal
//   const groundGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 64);
//   const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x00B7EB });
//   const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
//   groundMesh.castShadow = false;
//   groundMesh.receiveShadow = true;
//   groundMesh.rotation.y = 0.05;
//   scene.add(groundMesh);

//   // animation
//   const mixer = new THREE.AnimationMixer(avatar);
//   const clips = gltf.animations;
//   console.log('Available animations:', clips.map(clip => clip.name));
//   const waveClip = THREE.AnimationClip.findByName(clips, 'Waving');
//   const stumbleClip = THREE.AnimationClip.findByName(clips, 'Stagger');
//   // Автоматический запуск первой найденной анимации
//   if (clips.length > 0) {
//     const firstClip = clips[0];
//     const action = mixer.clipAction(firstClip);
//     action.play();
//   }
//   const waveAction = mixer.clipAction(waveClip);
//   const stumbleAction = mixer.clipAction(stumbleClip);
//   let isStumbling = false;
//   const raycaster = new THREE.Raycaster();
//   container.addEventListener('mousedown', (ev) => {
//     const coords = {
//       x: (ev.offsetX / container.clientWidth) * 2 - 1,
//       y: -(ev.offsetY / container.clientHeight) * 2 + 1
//     };

//     raycaster.setFromCamera(coords, camera);
//     const intersects = raycaster.intersectObject(avatar);

//     if (intersects.length > 0) {
//       if (isStumbling) return;
//       isStumbling = true;
//       stumbleAction.reset().play();
//       waveAction.crossFadeTo(stumbleAction, 0.3);

//       setTimeout(() => {
//         waveAction.reset().play();
//         stumbleAction.crossFadeTo(waveAction, 1);
//         setTimeout(() => isStumbling = false, 1000);
//       }, 4000);
//     }
//   });

//   const clock = new THREE.Clock();
//   function animate() {
//     requestAnimationFrame(animate);
//     mixer.update(clock.getDelta());
//     controls.update();
//     renderer.render(scene, camera);
//   }
//   animate();
// }



import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

window.onload = () => loadModel();

function loadModel() {
  const loader = new GLTFLoader();
  const loadingElement = document.getElementById('avaturn-loading');

  loader.load('model/avatar.glb',
    (gltf) => {
      setupScene(gltf);
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }
    },
    (xhr) => {
      if (loadingElement) {
        const percentCompletion = Math.round((xhr.loaded / xhr.total) * 100);
        loadingElement.innerText = `Loading... ${percentCompletion}%`;
        console.log(`Loading model... ${percentCompletion}%`);
      }
    },
    (error) => {
      console.log('Error loading model:', error);
      if (loadingElement) {
        loadingElement.innerText = 'Error loading model';
      }
    }
  );
}

function setupScene(gltf) {
  // Создаем основные компоненты Three.js
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const container = document.getElementById('avaturn-container');
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.appendChild(renderer.domElement);

  // Камера
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0.2, 0.5, 1);

  // Управление орбитой
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.minDistance = 3;
  controls.minPolarAngle = 1.4;
  controls.maxPolarAngle = 1.4;
  controls.target = new THREE.Vector3(0, 0.75, 0);
  controls.update();

  // Сцена
  const scene = new THREE.Scene();

  // Освещение
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  const spotLight = new THREE.SpotLight(0xffffff, 20, 8, 1);
  spotLight.penumbra = 0.5;
  spotLight.position.set(0, 4, 2);
  spotLight.castShadow = true;
  scene.add(spotLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2);
  keyLight.position.set(1, 1, 2);
  keyLight.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(keyLight);

  // Модель
  const avatar = gltf.scene;
  avatar.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(avatar);

  // Пьедестал
  const groundGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 64);
  const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x00B7EB });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.castShadow = false;
  groundMesh.receiveShadow = true;
  groundMesh.rotation.y = 0.05;
  groundMesh.position.y = -0.05; // Опускаем пьедестал чуть ниже
  scene.add(groundMesh);

  // Настройка анимаций
  const mixer = new THREE.AnimationMixer(avatar);
  const animations = gltf.animations;

  // Вывод информации обо всех анимациях для отладки
  console.log('Available animations:', animations.length);
  if (animations.length > 0) {
    animations.forEach((anim, index) => {
      console.log(`Animation ${index}: ${anim.name}`);
    });
  } else {
    console.warn('No animations found in the model!');
    return; // Выходим если нет анимаций
  }

  // Настройка анимаций на основе того, что есть в модели
  let waveAction = null;
  let stumbleAction = null;

  // Если анимации названы как в исходном коде
  const waveClip = THREE.AnimationClip.findByName(animations, 'Waving');
  const stumbleClip = THREE.AnimationClip.findByName(animations, 'Stagger');

  // Если анимации не найдены по имени, используем доступные по индексу
  if (waveClip) {
    waveAction = mixer.clipAction(waveClip);
    console.log('Found wave animation by name');
  } else if (animations.length > 0) {
    waveAction = mixer.clipAction(animations[0]);
    console.log('Using first animation as wave');
  }

  if (stumbleClip) {
    stumbleAction = mixer.clipAction(stumbleClip);
    console.log('Found stumble animation by name');
  } else if (animations.length > 1) {
    stumbleAction = mixer.clipAction(animations[1]);
    console.log('Using second animation as stumble');
  } else if (animations.length === 1) {
    // Если доступна только одна анимация, используем её для обоих действий
    stumbleAction = mixer.clipAction(animations[0]);
    console.log('Using first animation for both actions');
  }

  // Состояние анимации
  let isAnimationPlaying = false;
  let isStumbling = false;

  // Настройка raycast для определения клика по модели
  const raycaster = new THREE.Raycaster();

  // Обработчик клика
  container.addEventListener('mousedown', (event) => {
    // Вычисляем координаты клика в нормализованном пространстве устройства
    const coords = {
      x: (event.offsetX / container.clientWidth) * 2 - 1,
      y: -(event.offsetY / container.clientHeight) * 2 + 1
    };

    // Устанавливаем луч от камеры через точку клика
    raycaster.setFromCamera(coords, camera);

    // Проверяем пересечения со всеми объектами в сцене
    const intersects = raycaster.intersectObjects(scene.children, true);

    console.log('Click detected, intersections:', intersects.length);

    if (intersects.length > 0) {
      // Находим пересечение с моделью
      let isAvatarClicked = false;
      for (let i = 0; i < intersects.length; i++) {
        let obj = intersects[i].object;
        while (obj) {
          if (obj === avatar) {
            isAvatarClicked = true;
            break;
          }
          obj = obj.parent;
        }
        if (isAvatarClicked) break;
      }

      if (isAvatarClicked) {
        console.log('Avatar clicked!');

        // Если уже выполняется анимация спотыкания, не делаем ничего
        if (isStumbling) return;

        // Проверяем, какая анимация должна выполняться
        if (!isAnimationPlaying) {
          // Первый клик - волна
          if (waveAction) {
            waveAction.reset().play();
            isAnimationPlaying = true;
            console.log('Starting wave animation');
          }
        } else {
          // Последующие клики - спотыкание
          if (stumbleAction) {
            isStumbling = true;
            stumbleAction.reset().play();

            if (waveAction && waveAction !== stumbleAction) {
              waveAction.crossFadeTo(stumbleAction, 0.3);
            }

            console.log('Starting stumble animation');

            // Возвращаемся к махании после спотыкания
            setTimeout(() => {
              if (waveAction) {
                waveAction.reset().play();

                if (waveAction !== stumbleAction) {
                  stumbleAction.crossFadeTo(waveAction, 1);
                }
              }

              setTimeout(() => isStumbling = false, 1000);
            }, 4000);
          }
        }
      }
    }
  });

  // Функция анимации
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    // Обновляем микшер анимаций
    const delta = clock.getDelta();
    if (mixer) {
      mixer.update(delta);
    }

    // Обновляем контроллер камеры
    controls.update();

    // Рендерим сцену
    renderer.render(scene, camera);
  }

  // Запускаем цикл анимации
  animate();

  // Обработка изменения размера окна
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}
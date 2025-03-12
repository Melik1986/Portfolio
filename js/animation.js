const ICONS = [
  "fa-html5", "fa-css3-alt", "fa-js", "fa-react",
  "fa-node", "fa-git-alt", "fa-github", "fa-database",
  "fa-blender", "fa-figma"
];
const elementSpacing = 30;
const NUM_ICONS = 30; // Количество иконок в каждой спирали
const RADIUS_X = 150; // Горизонтальный радиус
const RADIUS_Y = 40;  // Вертикальный радиус
const SPEED = 0.01;   // Скорость вращения
let angle = 360;
const ANIMATION_DURATION = 4000; // Длительность полного оборота (мс)


// Colors for icons (in order of ICONS)
const COLORS = [
  '#E34F26', // HTML5 - orange
  '#1572B6', // CSS3 - blue
  '#F7DF1E', // JavaScript - yellow
  '#61DAFB', // React - light blue
  '#339933', // Node.js - green
  '#Ffffff', // Git - orange-red
  '#181717', // GitHub - almost black
  '#4479A1', // Database (usually MySQL) - blue
  '#F5792A', // Blender - orange
  '#0ACF83'  // Figma - green
];

// Контейнеры для спиралей
const spiral1 = document.querySelector("#spiral1");
const spiral2 = document.querySelector("#spiral2");

// Функция для создания иконок
const createIcon = (parent, index, offset) => {
  const icon = document.createElement("i");
  icon.classList.add("fab", ICONS[index % ICONS.length], "icon");
  icon.dataset.offset = offset;
  parent.appendChild(icon);
};

// Заполняем две спирали
for (let i = 0; i < NUM_ICONS; i++) {
  createIcon(spiral1, i, 0);
  createIcon(spiral2, i, Math.PI);
}

// Анимация
function animate() {
  angle += SPEED;

  document.querySelectorAll(".icon").forEach((icon, i) => {
    const parent = icon.parentElement.id;
    const phase = i * (Math.PI * 2 / NUM_ICONS); // Фазовый сдвиг
    const offset = parseFloat(icon.dataset.offset);

    const x = RADIUS_X * Math.sin(angle + phase);
    const y = RADIUS_Y * Math.sin((angle + phase) * 2);
    icon.style.transform = `translate(${x}px, ${y}px) scale(${Math.cos(angle + phase) * 0.5 + 0.5})`;
    icon.style.transform = `translate(${x - 50}px, ${y - 50}px) scale(${Math.cos(angle + phase) * 0.5 + 0.5})`;
  });

  requestAnimationFrame(animate);
}

animate();

// const ICONS = [
//   "fa-html5", "fa-css3-alt", "fa-js", "fa-react",
//   "fa-node", "fa-git-alt", "fa-github", "fa-database",
//   "fa-blender", "fa-figma" 
// ];

// // Configuration
// const NUM_ICONS = 30;          // Number of icons in each spiral
// const RADIUS_X = 150;          // Horizontal radius
// const RADIUS_Y = 40;           // Vertical radius
// const SPEED = 0.01;            // Rotation speed
// const ANIMATION_DURATION = 4000; // Full rotation duration (ms)

// // Colors for icons (in order of ICONS)
// const COLORS = [
//   '#E34F26', // HTML5 - orange
//   '#1572B6', // CSS3 - blue
//   '#F7DF1E', // JavaScript - yellow
//   '#61DAFB', // React - light blue
//   '#339933', // Node.js - green
//   '#F05032', // Git - orange-red
//   '#181717', // GitHub - almost black
//   '#4479A1', // Database - blue
//   '#F5792A', // Blender - orange
//   '#0ACF83'  // Figma - green
// ];

// // Store animation frame ID for cleanup
// let animationFrameId = null;
// // Initial angle
// let angle = 360;

// // Select spiral containers
// const spiral1 = document.querySelector("#spiral1");
// const spiral2 = document.querySelector("#spiral2");

// /**
//  * Creates an icon element and appends it to the parent
//  * @param {HTMLElement} parent - Parent element to append icon to
//  * @param {number} index - Icon index for selecting the icon type
//  * @param {number} offset - Phase offset value
//  */
// const createIcon = (parent, index, offset) => {
//   if (!parent) return;
  
//   const icon = document.createElement("i");
//   icon.classList.add("fab", ICONS[index % ICONS.length], "icon");
  
//   // Set icon color based on its type
//   icon.style.color = COLORS[index % COLORS.length];
  
//   // Store the offset as a data attribute
//   icon.dataset.offset = offset;
  
//   parent.appendChild(icon);
// };

// // Initialize spirals if containers exist
// if (spiral1 && spiral2) {
//   // Fill both spirals with icons
//   for (let i = 0; i < NUM_ICONS; i++) {
//     createIcon(spiral1, i, 0);
//     createIcon(spiral2, i, Math.PI); // Offset the second spiral by π radians
//   }

//   /**
//    * Animation function that updates icon positions
//    */
//   function animate() {
//     angle += SPEED;

//     document.querySelectorAll(".icon").forEach((icon, i) => {
//       const phase = i * (Math.PI * 2 / NUM_ICONS); // Phase shift
//       const offset = parseFloat(icon.dataset.offset);

//       // Calculate spiral coordinates
//       const x = RADIUS_X * Math.sin(angle + phase + offset);
//       const y = RADIUS_Y * Math.sin((angle + phase + offset) * 2);
      
//       // Scale effect based on position in rotation
//       const scale = Math.cos(angle + phase) * 0.5 + 0.5;
      
//       // Apply transform with center offset compensation (-50px)
//       icon.style.transform = `translate(${x - 50}px, ${y - 50}px) scale(${scale})`;
//     });

//     // Request next animation frame and store the ID
//     animationFrameId = requestAnimationFrame(animate);
//   }

//   // Start animation
//   animate();
  
//   // Cleanup function to cancel animation when needed
//   function cleanupAnimation() {
//     if (animationFrameId) {
//       cancelAnimationFrame(animationFrameId);
//     }
//   }
  
//   // Clean up on page unload (optional)
//   window.addEventListener('unload', cleanupAnimation);
// }
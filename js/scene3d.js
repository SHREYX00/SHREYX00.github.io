/**
 * 3D Interactive Cloud Network Canvas (Three.js)
 * Shreyash Kshirsagar - Aspiring Cloud Engineer Portfolio
 * 
 * Fresh & Happy Cloudy Palette:
 * - Crisp sky-blue, azure, and emerald cloud nodes
 * - Smooth network line segments with high clarity
 * - Orbiting data packets representing distributed traffic
 * - Full mouse drag rotation & 3D tilt physics on cards
 */

(function () {
  'use strict';

  window.addEventListener('DOMContentLoaded', () => {
    initThreeScene();
    init3DCardTilt();
  });

  function initThreeScene() {
    const container = document.getElementById('webgl-container');
    if (!container || typeof THREE === 'undefined') return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Network Group
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Fresh & Happy Cloudy Color Scheme
    const skyBlueColor = new THREE.Color(0x0284c7); // Rich sky blue
    const deepAzureColor = new THREE.Color(0x2563eb); // Deep blue
    const emeraldColor = new THREE.Color(0x059669); // Fresh active green
    const cyanColor = new THREE.Color(0x0ea5e9);

    // Generate Network Nodes
    const nodeCount = 42;
    const nodes = [];
    const nodeRadius = 8;
    const nodeGeometry = new THREE.SphereGeometry(0.28, 16, 16);

    const nodeLabels = [
      'AWS-EC2: Primary Cluster',
      'VPC-Gateway: 10.0.0.0/16',
      'Docker-Node: Master-01',
      'S3-Edge: CloudFront CDN',
      'Linux-Daemon: systemd:active',
      'CI/CD: GitHub Actions Runner',
      'MySQL-Replica: port 3306',
      'Route53: DNS Latency 14ms',
      'Azure-VM: Worker-East',
      'Subnet-Public: 10.0.1.0/24'
    ];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const r = nodeRadius * (0.85 + Math.random() * 0.3);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const isHub = i % 5 === 0;
      const material = new THREE.MeshBasicMaterial({
        color: isHub ? skyBlueColor : (i % 3 === 0 ? emeraldColor : deepAzureColor),
        wireframe: false
      });

      const sphere = new THREE.Mesh(nodeGeometry, material);
      sphere.position.set(x, y, z);
      sphere.userData = {
        origPos: new THREE.Vector3(x, y, z),
        label: nodeLabels[i % nodeLabels.length],
        pulseSpeed: 1.5 + Math.random() * 2,
        isHub: isHub
      };

      networkGroup.add(sphere);
      nodes.push(sphere);
    }

    // 3. Network Lines (Mesh Interconnects)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.28 // Clearly visible on fresh light background
    });

    const linePositions = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < 5.4) {
          linePositions.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    networkGroup.add(networkLines);

    // 4. Central Geometric Cloud Core
    const coreGeo = new THREE.IcosahedronGeometry(3.5, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    networkGroup.add(coreSphere);

    // Orbiting Data Ring
    const ringGeo = new THREE.TorusGeometry(5.2, 0.04, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.4
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    networkGroup.add(ring);

    // 5. Orbiting Data Packets
    const packetCount = 20;
    const packetGeo = new THREE.SphereGeometry(0.14, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x2563eb });
    const packets = [];

    for (let k = 0; k < packetCount; k++) {
      const p = new THREE.Mesh(packetGeo, packetMat);
      const startNode = nodes[Math.floor(Math.random() * nodes.length)];
      const endNode = nodes[Math.floor(Math.random() * nodes.length)];
      p.userData = {
        from: startNode.position,
        to: endNode.position,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008
      };
      networkGroup.add(p);
      packets.push(p);
    }

    // 6. Interactive Controls
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const hudEl = document.getElementById('cloudNodeHud');

    function onMouseMove(e) {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!isDragging) {
        mouseX = normX * 0.4;
        mouseY = normY * 0.4;
      } else {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        networkGroup.rotation.y += deltaX * 0.006;
        networkGroup.rotation.x += deltaY * 0.006;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }

      if (hudEl) {
        const raycaster = new THREE.Raycaster();
        const mouseVec = new THREE.Vector2(normX, normY);
        raycaster.setFromCamera(mouseVec, camera);
        const intersects = raycaster.intersectObjects(nodes);

        if (intersects.length > 0) {
          const targetNode = intersects[0].object;
          hudEl.textContent = `[NODE STATUS] ${targetNode.userData.label}`;
          hudEl.style.color = '#0284c7';
        } else {
          hudEl.textContent = '☁️ [DRAG TO ROTATE 3D CLOUD MESH]';
          hudEl.style.color = '#0369a1';
        }
      }
    }

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      container.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', onMouseMove);

    // Touch support for mobile
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        networkGroup.rotation.y += deltaX * 0.008;
        networkGroup.rotation.x += deltaY * 0.008;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    container.addEventListener('touchend', () => {
      isDragging = false;
    });

    // 7. Window Resize Handling
    window.addEventListener('resize', () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // 8. Animation Loop
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        networkGroup.rotation.y += 0.0022;
        networkGroup.rotation.x += (mouseY - networkGroup.rotation.x) * 0.04;
        networkGroup.rotation.z = Math.sin(elapsedTime * 0.3) * 0.05;
      }

      coreSphere.rotation.y -= 0.003;
      coreSphere.rotation.x += 0.002;
      ring.rotation.z += 0.004;

      // Pulse nodes
      nodes.forEach((n, idx) => {
        const scale = 1 + Math.sin(elapsedTime * n.userData.pulseSpeed + idx) * 0.15;
        n.scale.set(scale, scale, scale);
      });

      // Move data packets
      packets.forEach(p => {
        p.userData.progress += p.userData.speed;
        if (p.userData.progress >= 1) {
          p.userData.progress = 0;
          const fromNode = nodes[Math.floor(Math.random() * nodes.length)];
          const toNode = nodes[Math.floor(Math.random() * nodes.length)];
          p.userData.from = fromNode.position;
          p.userData.to = toNode.position;
        }
        p.position.lerpVectors(
          p.userData.from,
          p.userData.to,
          p.userData.progress
        );
      });

      renderer.render(scene, camera);
    }

    animate();
  }

  /* ========================================================================
     3D Interactive Card Tilt Physics
     ======================================================================== */
  function init3DCardTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt-3d]');
    if (!tiltElements.length) return;

    tiltElements.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((cardY - centerY) / centerY) * -6;
        const rotateY = ((cardX - centerX) / centerX) * 6;

        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

})();

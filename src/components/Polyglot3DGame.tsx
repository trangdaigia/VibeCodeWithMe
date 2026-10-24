import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Gamepad2,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Shield,
  Zap,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Camera,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { LanguageCourse } from '../data/curriculum';
import {
  POLYGLOT_3D_CHALLENGES,
  Polyglot3DChallenge,
  GameSessionState,
  createInitialGameSession,
  movePlayerLane,
  evaluateGateCollision,
} from '../utils/vipOmniVerseLogic';

interface Polyglot3DGameProps {
  course: LanguageCourse;
  selectedLanguageId: string;
  onGainXp: (amount: number) => void;
}

type CameraViewPreset = 'chase' | 'cockpit' | 'orbit';

export const Polyglot3DGame: React.FC<Polyglot3DGameProps> = ({
  course,
  selectedLanguageId,
  onGainXp,
}) => {
  const challenges: Polyglot3DChallenge[] =
    POLYGLOT_3D_CHALLENGES[selectedLanguageId] || POLYGLOT_3D_CHALLENGES.english;

  const [session, setSession] = useState<GameSessionState>(() =>
    createInitialGameSession(challenges.length)
  );
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cameraPreset, setCameraPreset] = useState<CameraViewPreset>('chase');
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<{
    type: 'correct' | 'wrong';
    text: string;
  } | null>(null);

  // Shuffle lane assignments deterministically per round
  const currentChallenge = challenges[session.roundIndex] || challenges[0];
  const [gateOptions, setGateOptions] = useState<
    {
      lane: -1 | 0 | 1;
      word: string;
      romanization: string;
      meaningVi: string;
      isCorrect: boolean;
    }[]
  >([]);

  useEffect(() => {
    const lanes: (-1 | 0 | 1)[] = [-1, 0, 1];
    const correctLaneIdx = (session.roundIndex * 2 + 1) % 3;
    const decoys = currentChallenge.decoys;
    let decoyIdx = 0;

    const built = lanes.map((lane, idx) => {
      if (idx === correctLaneIdx) {
        return {
          lane,
          word: currentChallenge.correctWord,
          romanization: currentChallenge.correctRomanization,
          meaningVi: currentChallenge.promptVi,
          isCorrect: true,
        };
      }
      const d = decoys[decoyIdx % decoys.length];
      decoyIdx++;
      return {
        lane,
        word: d.word,
        romanization: d.romanization,
        meaningVi: d.meaningVi,
        isCorrect: false,
      };
    });
    setGateOptions(built);
  }, [currentChallenge, session.roundIndex]);

  // Reset game when language changes
  useEffect(() => {
    setSession(createInitialGameSession(challenges.length));
    setLastFeedback(null);
  }, [selectedLanguageId, challenges.length]);

  // Procedural Web Audio Synthesizer for arcade feedback
  const playArcadeSound = useCallback(
    (effect: 'collect' | 'damage' | 'victory' | 'move') => {
      if (!soundEnabled || typeof window === 'undefined') return;
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        if (effect === 'collect') {
          [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.055);
            gain.gain.setValueAtTime(0.12, now + i * 0.055);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.055 + 0.18);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.055);
            osc.stop(now + i * 0.055 + 0.19);
          });
        } else if (effect === 'damage') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(160, now);
          osc.frequency.linearRampToValueAtTime(65, now + 0.25);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.29);
        } else if (effect === 'move') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(360, now);
          osc.frequency.exponentialRampToValueAtTime(520, now + 0.07);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.09);
        } else if (effect === 'victory') {
          [440, 554.37, 659.25, 880].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.09);
            gain.gain.setValueAtTime(0.14, now + i * 0.09);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.09);
            osc.stop(now + i * 0.09 + 0.36);
          });
        }
      } catch {
        // Ignore audio context autoplay errors
      }
    },
    [soundEnabled]
  );

  // Refs for syncing React state with the Three.js render loop
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef(session);
  sessionRef.current = session;
  const cameraPresetRef = useRef(cameraPreset);
  cameraPresetRef.current = cameraPreset;
  const gateOptionsRef = useRef(gateOptions);
  gateOptionsRef.current = gateOptions;
  const gateZRef = useRef(-32);

  // Trigger gate resolution (either when 3D gate reaches ship or user clicks a gate option directly)
  const handleSelectGateOption = useCallback(
    (option: {
      lane: -1 | 0 | 1;
      word: string;
      romanization: string;
      meaningVi: string;
      isCorrect: boolean;
    }) => {
      setSession((prev) => {
        if (prev.status !== 'playing') return prev;
        const moved = { ...prev, playerLane: option.lane };
        const nextState = evaluateGateCollision(moved, option.isCorrect);

        if (option.isCorrect) {
          playArcadeSound(nextState.status === 'victory' ? 'victory' : 'collect');
          setLastFeedback({
            type: 'correct',
            text: `Chính xác! "${option.word}" (${option.romanization}) — +${150 + nextState.combo * 35} Điểm`,
          });
          onGainXp(20);
        } else {
          playArcadeSound('damage');
          setLastFeedback({
            type: 'wrong',
            text: `Cảnh báo bẫy từ vựng! "${option.word}" nghĩa là "${option.meaningVi}" (-35% Khiên)`,
          });
        }
        gateZRef.current = -34;
        return nextState;
      });
    },
    [onGainXp, playArcadeSound]
  );

  // Keyboard controls (A/D, ArrowLeft/ArrowRight, Space to lock-in current lane)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (sessionRef.current.status !== 'playing') return;
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        e.preventDefault();
        playArcadeSound('move');
        setSession((prev) => ({
          ...prev,
          playerLane: movePlayerLane(prev.playerLane, 'left'),
        }));
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        e.preventDefault();
        playArcadeSound('move');
        setSession((prev) => ({
          ...prev,
          playerLane: movePlayerLane(prev.playerLane, 'right'),
        }));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const activeLane = sessionRef.current.playerLane;
        const found = gateOptionsRef.current.find((g) => g.lane === activeLane);
        if (found) {
          handleSelectGateOption(found);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleSelectGateOption, playArcadeSound]);

  // Three.js Scene Initialization & Software-WebGL-Safe Render Loop
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const gl = renderer.getContext();
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const glRenderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : '';
    const isSoftwareGl = /SwiftShader|llvmpipe|Software|Google Inc\. \(Google\)/i.test(
      String(glRenderer)
    );

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 480;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = !isSoftwareGl;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d1e);
    scene.fog = new THREE.FogExp2(0x090d1e, 0.018);

    // RoomEnvironment + PMREMGenerator for PBR metallic reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envMap = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    scene.environment = envMap;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 200);
    camera.position.set(0, 4.2, 8.5);
    camera.lookAt(0, 1.2, -12);

    // Warm Key Light + Cool Hemisphere Fill Light
    const hemiLight = new THREE.HemisphereLight(0xc8dcff, 0x2a2438, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e0, 2.2);
    keyLight.position.set(8, 14, 10);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 3.5, 30);
    rimLight.position.set(0, 5, -8);
    scene.add(rimLight);

    // Cyber Runway Grid & Lane Dividers
    const gridHelper = new THREE.GridHelper(120, 48, 0x38bdf8, 0x1e293b);
    gridHelper.position.set(0, 0, -25);
    scene.add(gridHelper);

    const lanePositions = [-3.4, 0, 3.4];
    lanePositions.forEach((xPos) => {
      const stripGeo = new THREE.PlaneGeometry(0.14, 90);
      const stripMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        side: THREE.DoubleSide,
      });
      const strip = new THREE.Mesh(stripGeo, stripMat);
      strip.rotation.x = -Math.PI / 2;
      strip.position.set(xPos, 0.02, -30);
      scene.add(strip);
    });

    // Composite 8-Part Hero Polyglot Scholar Mech/Airship (THREE.Group)
    const shipGroup = new THREE.Group();
    shipGroup.position.set(0, 1.1, 2.5);

    const hullMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.78,
      roughness: 0.22,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      metalness: 0.65,
      roughness: 0.28,
    });
    const canopyMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.65,
      transparent: true,
      opacity: 0.88,
    });
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x06b6d4,
      emissiveIntensity: 1.8,
      roughness: 0.2,
    });

    // Part 1: Main Fuselage
    const fuselage = new THREE.Mesh(new THREE.ConeGeometry(0.68, 2.8, 12), hullMat);
    fuselage.rotation.x = -Math.PI / 2;
    shipGroup.add(fuselage);

    // Part 2: Glass Cockpit Canopy
    const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), canopyMat);
    canopy.scale.set(0.85, 0.65, 1.65);
    canopy.position.set(0, 0.34, -0.15);
    shipGroup.add(canopy);

    // Part 3 & 4: Swept Left & Right Wings
    const wingGeo = new THREE.BoxGeometry(2.7, 0.1, 1.05);
    const wings = new THREE.Mesh(wingGeo, accentMat);
    wings.position.set(0, 0, 0.25);
    shipGroup.add(wings);

    // Part 5 & 6: Wingtip Stabilizer Fins
    const finGeo = new THREE.BoxGeometry(0.12, 0.65, 0.9);
    const leftFin = new THREE.Mesh(finGeo, glowMat);
    leftFin.position.set(-1.35, 0.22, 0.3);
    leftFin.rotation.z = 0.22;
    shipGroup.add(leftFin);

    const rightFin = new THREE.Mesh(finGeo, glowMat);
    rightFin.position.set(1.35, 0.22, 0.3);
    rightFin.rotation.z = -0.22;
    shipGroup.add(rightFin);

    // Part 7: Twin Vector Thruster Cones
    const thrusterGeo = new THREE.CylinderGeometry(0.18, 0.26, 0.65, 12);
    const leftThruster = new THREE.Mesh(thrusterGeo, glowMat);
    leftThruster.rotation.x = Math.PI / 2;
    leftThruster.position.set(-0.42, -0.05, 1.35);
    shipGroup.add(leftThruster);

    const rightThruster = new THREE.Mesh(thrusterGeo, glowMat);
    rightThruster.rotation.x = Math.PI / 2;
    rightThruster.position.set(0.42, -0.05, 1.35);
    shipGroup.add(rightThruster);

    // Part 8: Rotating Holo-Linguistic Energy Ring
    const holoRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.95, 0.045, 12, 32),
      glowMat
    );
    holoRing.rotation.x = Math.PI / 2;
    shipGroup.add(holoRing);

    scene.add(shipGroup);

    // 3 Gate Crystal Groups along the 3 lanes
    const gateGroups: THREE.Group[] = [];
    const gateCrystals: THREE.Mesh[] = [];
    const gateRings: THREE.Mesh[] = [];

    const crystalGeo = new THREE.OctahedronGeometry(0.75, 0);
    const gateRingGeo = new THREE.TorusGeometry(1.15, 0.08, 12, 28);

    lanePositions.forEach((xPos, idx) => {
      const gGroup = new THREE.Group();
      gGroup.position.set(xPos, 1.35, -28);

      const cMat = new THREE.MeshStandardMaterial({
        color: idx === 1 ? 0x10b981 : 0xf59e0b,
        emissive: idx === 1 ? 0x059669 : 0xd97706,
        emissiveIntensity: 0.9,
        metalness: 0.4,
        roughness: 0.2,
      });
      const crystal = new THREE.Mesh(crystalGeo, cMat);
      gGroup.add(crystal);

      const rMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.7,
        metalness: 0.8,
        roughness: 0.2,
      });
      const ring = new THREE.Mesh(gateRingGeo, rMat);
      gGroup.add(ring);

      scene.add(gGroup);
      gateGroups.push(gGroup);
      gateCrystals.push(crystal);
      gateRings.push(ring);
    });

    // Background Starfield & Floating Data Pillars
    const starCount = isSoftwareGl ? 120 : 280;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 90;
      starPositions[i * 3 + 1] = Math.random() * 32 + 1;
      starPositions[i * 3 + 2] = -Math.random() * 90 + 10;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.22 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Software-WebGL-Safe Frame Pacing Helper (from threejs/SKILL.md)
    let disposed = false;
    function afterDraw(cb: () => void) {
      if (!isSoftwareGl) {
        requestAnimationFrame(cb);
        return;
      }
      const gl2 = gl as WebGL2RenderingContext;
      if (typeof gl2.fenceSync !== 'function') {
        setTimeout(cb, 16);
        return;
      }
      const sync = gl2.fenceSync(gl2.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl2.flush();
      const poll = () => {
        if (disposed || !sync) return;
        const s = gl2.clientWaitSync(sync, 0, 0);
        if (s === gl2.TIMEOUT_EXPIRED) {
          setTimeout(poll, 4);
        } else {
          gl2.deleteSync(sync);
          cb();
        }
      };
      setTimeout(poll, 4);
    }

    let lastTime = performance.now();

    function tick() {
      if (disposed) return;
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const curSession = sessionRef.current;
      const targetX = curSession.playerLane * 3.4;

      // Smoothly interpolate ship X position and bank angle
      const dx = targetX - shipGroup.position.x;
      shipGroup.position.x += dx * Math.min(1, dt * 10);
      shipGroup.rotation.z = -dx * 0.28;
      shipGroup.position.y = 1.1 + Math.sin(now * 0.004) * 0.12;
      holoRing.rotation.z += dt * 2.2;

      // Camera preset positioning
      const preset = cameraPresetRef.current;
      if (preset === 'chase') {
        camera.position.x += (shipGroup.position.x * 0.45 - camera.position.x) * 0.1;
        camera.position.y += (4.1 - camera.position.y) * 0.1;
        camera.position.z += (8.4 - camera.position.z) * 0.1;
        camera.lookAt(shipGroup.position.x * 0.3, 1.2, -12);
      } else if (preset === 'cockpit') {
        camera.position.set(shipGroup.position.x, shipGroup.position.y + 0.65, 1.8);
        camera.lookAt(shipGroup.position.x, 1.2, -25);
      } else {
        const orbitAngle = now * 0.0005;
        camera.position.set(Math.sin(orbitAngle) * 11, 6.2, Math.cos(orbitAngle) * 11);
        camera.lookAt(0, 1.2, -8);
      }

      // Advance gates when playing
      if (curSession.status === 'playing') {
        gateZRef.current += curSession.speed * 0.45 * dt;
        if (gateZRef.current >= 2.2) {
          // Ship crossed the gate plane! Evaluate the lane the ship is currently in
          const activeOption = gateOptionsRef.current.find(
            (g) => g.lane === curSession.playerLane
          );
          if (activeOption) {
            handleSelectGateOption(activeOption);
          } else {
            gateZRef.current = -34;
          }
        }
      } else {
        // Gentle idle oscillation in title/pause state
        gateZRef.current = -22 + Math.sin(now * 0.0015) * 2.5;
      }

      gateGroups.forEach((g, idx) => {
        g.position.z = gateZRef.current;
        gateCrystals[idx].rotation.y += dt * 1.8;
        gateCrystals[idx].rotation.x += dt * 0.9;
        gateRings[idx].rotation.z -= dt * 1.2;
      });

      gridHelper.position.z = -25 + ((now * 0.012) % 2.5);

      renderer.render(scene, camera);
      afterDraw(tick);
    }

    tick();

    return () => {
      disposed = true;
      window.removeEventListener('resize', handleResize);
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, [handleSelectGateOption]);

  const startOrResumeGame = () => {
    playArcadeSound('collect');
    setSession((prev) => {
      if (prev.status === 'victory' || prev.status === 'gameover') {
        gateZRef.current = -34;
        return { ...createInitialGameSession(challenges.length), status: 'playing' };
      }
      return { ...prev, status: 'playing' };
    });
  };

  const restartGame = () => {
    playArcadeSound('move');
    gateZRef.current = -34;
    setLastFeedback(null);
    setSession({ ...createInitialGameSession(challenges.length), status: 'playing' });
  };

  return (
    <div className="rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
      {/* Top 3D Game Telemetry & Controls Bar */}
      <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
                Polyglot 3D Odyssey: Phi Thuyền Ngôn Ngữ {course.flagEmoji} {course.vietnameseName}
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-black uppercase">
                Three.js WebGL PBR
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Điều khiển phi thuyền 3D thu thập Tinh thể Từ vựng đúng với nghĩa tiếng Việt • Phím{' '}
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200 font-mono text-[10px]">
                A / D
              </kbd>{' '}
              hoặc chạm trực tiếp vào Tinh thể
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Camera Angle Switcher */}
          <button
            type="button"
            onClick={() =>
              setCameraPreset((prev) =>
                prev === 'chase' ? 'cockpit' : prev === 'cockpit' ? 'orbit' : 'chase'
              )
            }
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-700"
            title="Đổi góc quay Camera 3D"
          >
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              Camera:{' '}
              {cameraPreset === 'chase'
                ? 'Đuôi Phi Thuyền'
                : cameraPreset === 'cockpit'
                ? 'Buồng Lái 3D'
                : 'Quỹ Đạo Orbit'}
            </span>
          </button>

          {/* Audio Synth Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled((s) => !s)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
            aria-label={soundEnabled ? 'Tắt âm thanh Synth 3D' : 'Bật âm thanh Synth 3D'}
            title={soundEnabled ? 'Đang bật âm thanh Web Audio Synth' : 'Đang tắt âm thanh'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {session.status === 'playing' && (
            <button
              type="button"
              onClick={() => setSession((p) => ({ ...p, status: 'paused' }))}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Tạm dừng</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 3D Canvas Stage (No backdrop-filter over WebGL!) */}
      <div className="relative w-full h-[460px] sm:h-[520px] bg-slate-950 select-none overflow-hidden">
        <div
          ref={canvasContainerRef}
          className="w-full h-full"
          aria-label="Khung cảnh 3D phi thuyền ngôn ngữ"
        />

        {/* Low-occlusion HUD Overlay (Top Corners) */}
        <div className="pointer-events-none absolute top-4 left-4 right-4 flex flex-wrap items-start justify-between gap-3">
          {/* Left HUD: Score & Combo */}
          <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl px-4 py-2.5 flex items-center gap-4 shadow-lg">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Điểm Odyssey
              </div>
              <div className="text-xl font-black text-white tabular-nums">{session.score}</div>
            </div>
            <div className="h-7 w-px bg-slate-800" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Chuỗi Combo
              </div>
              <div className="text-xl font-black text-amber-400 tabular-nums flex items-center gap-1">
                <Zap className="w-4 h-4 fill-amber-400" />
                {session.combo}x
              </div>
            </div>
            <div className="h-7 w-px bg-slate-800" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Chặng Bay
              </div>
              <div className="text-base font-black text-cyan-300 tabular-nums">
                {session.roundIndex + 1} / {session.totalRounds}
              </div>
            </div>
          </div>

          {/* Center HUD: Active Vietnamese Target Prompt */}
          <div className="bg-slate-900/95 border-2 border-indigo-500/80 rounded-2xl px-5 py-2.5 text-center shadow-xl max-w-md mx-auto">
            <div className="text-[10px] font-black uppercase tracking-widest text-indigo-300">
              Nhiệm vụ Dịch &amp; Bắt Tinh Thể ({course.vietnameseName})
            </div>
            <div className="text-sm sm:text-base font-black text-white mt-0.5">
              “{currentChallenge.promptVi}”
            </div>
          </div>

          {/* Right HUD: Shield HP Bar */}
          <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl px-4 py-2.5 min-w-[165px] shadow-lg">
            <div className="flex items-center justify-between text-[11px] font-bold mb-1">
              <span className="text-slate-300 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Khiên Năng Lượng
              </span>
              <span className="text-emerald-400 tabular-nums">{session.shieldHp}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  session.shieldHp > 50
                    ? 'bg-emerald-500'
                    : session.shieldHp > 25
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${session.shieldHp}%` }}
              />
            </div>
          </div>
        </div>

        {/* Live Feedback Banner */}
        {lastFeedback && session.status === 'playing' && (
          <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 z-10">
            <div
              className={`px-4 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 shadow-lg ${
                lastFeedback.type === 'correct'
                  ? 'bg-emerald-950/95 border-emerald-500/70 text-emerald-200'
                  : 'bg-rose-950/95 border-rose-500/70 text-rose-200'
              }`}
            >
              {lastFeedback.type === 'correct' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{lastFeedback.text}</span>
            </div>
          </div>
        )}

        {/* Interactive 3-Lane Crystal Target Deck + Collapsible Bottom Dock */}
        {session.status === 'playing' && (
          <div className="absolute bottom-3 left-4 right-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-700">
                Làn phi thuyền hiện tại:{' '}
                <strong className="text-cyan-300">
                  {session.playerLane === -1
                    ? 'Làn Trái (-1)'
                    : session.playerLane === 0
                    ? 'Làn Giữa (0)'
                    : 'Làn Phải (+1)'}
                </strong>
              </span>
              <button
                type="button"
                onClick={() => setDockCollapsed((c) => !c)}
                className="px-3 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              >
                {dockCollapsed ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" /> Mở Bảng Tinh Thể 3 Làn
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5" /> Thu gọn HUD
                  </>
                )}
              </button>
            </div>

            {!dockCollapsed && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {gateOptions.map((opt) => {
                  const isShipInLane = session.playerLane === opt.lane;
                  const laneLabel =
                    opt.lane === -1 ? 'LÀN TRÁI (A)' : opt.lane === 0 ? 'LÀN GIỮA' : 'LÀN PHẢI (D)';
                  return (
                    <button
                      key={`${opt.lane}-${opt.word}`}
                      type="button"
                      onClick={() => handleSelectGateOption(opt)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isShipInLane
                          ? 'bg-indigo-950/95 border-cyan-400 ring-2 ring-cyan-400/40 text-white'
                          : 'bg-slate-900/95 border-slate-700/90 hover:border-indigo-400 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider">
                        <span className="text-cyan-300">{laneLabel}</span>
                        {isShipInLane && (
                          <span className="px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950">
                            Đang ngắm
                          </span>
                        )}
                      </div>
                      <div className="text-base font-black text-white mt-1">{opt.word}</div>
                      <div className="text-xs text-indigo-200 font-medium mt-0.5">
                        {opt.romanization}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Quick Lane Steering Bar */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  playArcadeSound('move');
                  setSession((p) => ({
                    ...p,
                    playerLane: movePlayerLane(p.playerLane, 'left'),
                  }));
                }}
                className="px-4 py-1.5 rounded-xl bg-slate-900/95 hover:bg-slate-800 text-white border border-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Lách Trái (A)
              </button>
              <button
                type="button"
                onClick={() => {
                  const found = gateOptions.find((g) => g.lane === session.playerLane);
                  if (found) handleSelectGateOption(found);
                }}
                className="px-5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs cursor-pointer shadow-md"
              >
                Thu Thập Tinh Thể Làn Này (Enter)
              </button>
              <button
                type="button"
                onClick={() => {
                  playArcadeSound('move');
                  setSession((p) => ({
                    ...p,
                    playerLane: movePlayerLane(p.playerLane, 'right'),
                  }));
                }}
                className="px-4 py-1.5 rounded-xl bg-slate-900/95 hover:bg-slate-800 text-white border border-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                Lách Phải (D) <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* State Machine Modal Overlays: Title Screen / Paused / Victory / Game Over */}
        {session.status !== 'playing' && (
          <div className="absolute inset-0 bg-slate-950/85 flex items-center justify-center p-4 z-20">
            <div className="max-w-md w-full bg-slate-900 border-2 border-indigo-500/60 rounded-3xl p-6 text-center shadow-2xl">
              {session.status === 'title' && (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center mx-auto text-cyan-300 mb-4">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-black uppercase tracking-wider">
                    Three.js 3D Interactive Arcade
                  </span>
                  <h4 className="text-2xl font-black text-white mt-2">
                    Du Hành Vũ Trụ Từ Vựng 3D ({course.vietnameseName})
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    Lái phi thuyền học thuật 8 mô-đun vượt qua 3 làn không gian. Đọc nghĩa tiếng Việt
                    trên radar và thu thập đúng Tinh thể Từ vựng bản xứ để nhận thưởng XP &amp; kích
                    hoạt chuỗi phản xạ thần kinh!
                  </p>
                  <button
                    type="button"
                    onClick={startOrResumeGame}
                    className="mt-5 w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Khởi Động Phi Thuyền 3D Ngay</span>
                  </button>
                </>
              )}

              {session.status === 'paused' && (
                <>
                  <h4 className="text-xl font-black text-white">Đã Tạm Dừng Chuyến Bay 3D</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Điểm hiện tại: {session.score} • Chuỗi Combo tối đa: {session.maxCombo}x
                  </p>
                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={startOrResumeGame}
                      className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs cursor-pointer"
                    >
                      Tiếp tục bay
                    </button>
                    <button
                      type="button"
                      onClick={restartGame}
                      className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer"
                    >
                      Chơi lại từ đầu
                    </button>
                  </div>
                </>
              )}

              {(session.status === 'victory' || session.status === 'gameover') && (
                <>
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                      session.status === 'victory'
                        ? 'bg-amber-500/20 border border-amber-400/50 text-amber-300'
                        : 'bg-rose-500/20 border border-rose-400/50 text-rose-300'
                    }`}
                  >
                    <Trophy className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-black text-white">
                    {session.status === 'victory'
                      ? 'Chinh Phục Thành Công Vũ Trụ 3D!'
                      : 'Khiên Năng Lượng Đã Cạn!'}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {session.status === 'victory'
                      ? `Tuyệt đỉnh! Bạn đã thu thập trọn vẹn ${session.correctCollected}/${session.totalRounds} Tinh thể học thuật.`
                      : 'Đừng nản lòng! Hãy quan sát kỹ phiên âm và nghĩa tiếng Việt trước khi lao vào cổng.'}
                  </p>

                  <div className="grid grid-cols-3 gap-2 my-4 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Tổng Điểm</div>
                      <div className="text-lg font-black text-white">{session.score}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Max Combo</div>
                      <div className="text-lg font-black text-amber-400">{session.maxCombo}x</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Khiên Còn</div>
                      <div className="text-lg font-black text-emerald-400">{session.shieldHp}%</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={restartGame}
                    className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Chơi Lại Chặng Mới Ngay</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls, Text, Box, useTexture } from '@react-three/drei';
import * as THREE from 'three'; // <--- 修复：导入 three 库

// 这是展厅组件，对应原 HTML 中的 room 对象
function Room() {
  // 定义展厅尺寸
  const roomSize = { width: 40, height: 20, depth: 60 };

  // 使用 drei 提供的 useTexture Hook 来加载纹理，这比原生方式更简洁
  // Suspense 会处理图片的异步加载
  const textures = useTexture([
    'https://picsum.photos/seed/1/1024/1024', // 右
    'https://picsum.photos/seed/2/1024/1024', // 左
    'https://picsum.photos/seed/3/1024/1024', // 上
    'https://picsum.photos/seed/4/1024/1024', // 下
    'https://picsum.photos/seed/5/1024/1024', // 前
    'https://picsum.photos/seed/6/1024/1024', // 后
  ]);

  return (
    // Box 是 drei 提供的便利组件，等同于 new THREE.BoxGeometry() 和 new THREE.Mesh()
    <Box args={[roomSize.width, roomSize.height, roomSize.depth]}>
      {textures.map((texture, index) => (
        // 为立方体的每个面分别应用材质
        <meshBasicMaterial key={index} attach={`material-${index}`} map={texture} side={THREE.BackSide} />
      ))}
    </Box>
  );
}

// 这是操作说明的 UI 组件，对应原 HTML 中的 #instructions
function Instructions() {
  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column', // 改为纵向排列
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: '24px',
      fontFamily: 'sans-serif',
      cursor: 'pointer',
    }}>
      <p>点击屏幕开始</p>
      <p style={{ fontSize: '18px', marginTop: '10px' }}>使用 W/A/S/D 或方向键移动</p>
      <p style={{ fontSize: '18px' }}>使用鼠标环顾四周</p>
    </div>
  );
}


// 主页面组件
const Gallery3DPage = () => {
  return (
    <div style={{ width: '100vw', height: 'calc(100vh - 6rem)', position: 'fixed', top: '6rem', left: 0 }}>
      {/* Canvas 组件创建了 Three.js 的渲染环境。
        我们不需要再手动创建 scene, camera, renderer。
      */}
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}>
        {/* Suspense 用于处理异步加载（如纹理），在加载完成前可以显示 fallback 内容 */}
        <Suspense fallback={<Text color="white">Loading...</Text>}>
          {/* 光源 */}
          <ambientLight intensity={0.7} />
          <pointLight intensity={0.8} position={[0, 8, 0]} />

          {/* 展厅 */}
          <Room />
        </Suspense>

        {/* PointerLockControls 组件封装了第一人称控制器。
          我们不再需要手动监听键盘和实现移动逻辑，它内置了 WASD 移动。
        */}
        <PointerLockControls />
      </Canvas>
      {/* 操作说明 UI 不再需要通过 PointerLockControls 的事件来控制显隐。
        drei 的 PointerLockControls 会自动在锁定时隐藏同级的 HTML 元素。
      */}
      <Instructions />
    </div>
  );
};

// 导出组件
export default Gallery3DPage;
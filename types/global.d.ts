// Global type extensions for React Three Fiber
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any
      coneGeometry: any
      meshStandardMaterial: any
      points: any
      bufferGeometry: any
      bufferAttribute: any
      pointsMaterial: any
      color: any
      fog: any
      hemisphereLight: any
      directionalLight: any
      planeGeometry: any
    }
  }
}

export {}

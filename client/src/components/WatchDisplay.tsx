import React, {Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import {PerspectiveCamera, OrbitControls, Environment} from '@react-three/drei'
import WatchModel from './WatchModel'
import {Bloom, ChromaticAberration, EffectComposer} from '@react-three/postprocessing'
import {Vector2} from 'three'
import { AnimatePresence, motion } from 'framer-motion'

export default function WatchDisplay() {


  const loadingScreen = () => {
    return <>
      <span className='text-5xl font-bold text-my_white'>LOADING</span>
    </>
  }

  return (
    <AnimatePresence>
      <motion.div
      initial={{opacity: 0, translateY: -32}}
      animate={{opacity: 1, translateY: 0}}
      transition={{duration: .5, delay: 1.5}}
      id='canvas-container' className="flex flex-col place-content-center items-center h-full">
        <Suspense fallback={loadingScreen()}> {/* Suspend app when loading 3D components */}
          <Canvas dpr={[1,2]}> {/* Canvas for the 3D scene */}

            {/* Camera & Controls */}
            <PerspectiveCamera fov={10} makeDefault position={[-30,0,-30]}/>
            <OrbitControls target={[0,0,0]} enableZoom={false} maxPolarAngle={5} enableDamping/>

            {/* Lighting & Environment */}
            <Environment files={process.env.PUBLIC_URL + '/assets/3d/hdr.exr'}/>

            {/* Meshes */}
            <WatchModel/>

            {/* Post Processing */}
            <EffectComposer>
              <Bloom
              mipmapBlur
              radius={.35}
              intensity={1}
              luminanceThreshold={.1}
              />

              <ChromaticAberration 
              radialModulation={false}
              modulationOffset={0}
              offset={new Vector2(.0005,.0005)}            
              />
            </EffectComposer>

          </Canvas>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}




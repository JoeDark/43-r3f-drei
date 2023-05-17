import { useThree, extend } from '@react-three/fiber'
import { MeshReflectorMaterial ,Float, Text, Html, PivotControls, OrbitControls, TransformControls } from '@react-three/drei'
import { useRef } from 'react'


export default function Experience() {
    const cubeRef = useRef()
    const sphereRef = useRef()

    const { camera, gl } = useThree()

    //Make default fixes moving object with transform controls and turning the camera
    return <>
        <OrbitControls makeDefault />


        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <PivotControls anchor={[0, 0, 0]}
            depthTest={false}
            lineWidth={4}
            axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
            scale={100}
            fixed={true}> {/*Show the pivot controls even when its inside an object */}

            <mesh position-x={- 2} ref={sphereRef}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />

                <Html position={[1, 1, 0]}
                    wrapperClass='label'
                    center
                    distanceFactor={8}
                    occlude={[sphereRef, cubeRef]}>Much longer test</Html>

            </mesh>
        </PivotControls>

        <mesh ref={cubeRef} position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={cubeRef} /> {/* Having this on the cube causes html occlusion to bug out */}
        {/* mode: translate, scale, rotate */}

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            {/* <meshStandardMaterial color="greenyellow" /> */}
            <MeshReflectorMaterial resolution={512}
            blur={[1000,1000]}
            mixBlur={1}
            mirror={0.75}
            color="greenyellow"/>
        </mesh>

        {/* This is troika three text */}
        <Float speed={5}
        floatIntensity={2}>
            <Text font='./bangers-v20-latin-regular.woff'
                fontSize={1}
                color={'salmon'}
                position-y={2}
                maxWidth={2}
                textAlign='center'>I AM R3F
                {/* <meshNormalMaterial/>  CHANGES MAT FOR TEXT*/}
            </Text>
        </Float>
    </>
}
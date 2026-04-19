import {useGLTF} from '@react-three/drei';
import React from 'react';

interface IWatchModel{
}

function WatchModel ( props: IWatchModel ){

    const gltf = useGLTF(process.env.PUBLIC_URL + "/assets/3d/watchButBetter.glb"); //Load the .glb file

    //Enable the mesh to recieve and case shadows
    React.useEffect(()=> {
        gltf.scene.traverse((obj)=>{
            obj.castShadow = true;
            obj.receiveShadow = true;
        });

        console.log(gltf);

    },[gltf]);

   return (
    <primitive object={gltf.scene}/>
    );
}

export default WatchModel
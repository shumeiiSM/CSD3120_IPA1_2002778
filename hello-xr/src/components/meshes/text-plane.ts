/************************************************************************/
/*! Start Header
\file: text-plane.ts
\author: Ting Shu Mei
\par email: shumei.ting@digipen.edu
\par DigiPen login: shumei.ting
\par Course: CSD3120 Introduction to Virtual Reality
\par Assignment IPA-B
\date 19/03/2023

Copyright (C) 2023 DigiPen Institute of Technology.
Reproduction or disclosure of this file or its contents without the
prior written consent of DigiPen Institute of Technology is prohibited.
*/
/* End Header
***********************************************************************/

import { Mesh, MeshBuilder, Scene } from 'babylonjs';
import { AdvancedDynamicTexture, TextBlock } from 'babylonjs-gui';

export class TextPlane {
    public mesh: Mesh;
    public textBlock: TextBlock;

    constructor(
        name: string,
        width: number,
        height: number,
        x: number,
        y: number,
        z: number,
        text: string,
        backgroundColor: string,
        textColor: string,
        fontSize: number,
        scene: Scene
    ) {
        const textPlane = MeshBuilder.CreatePlane(name, {
            width: width,
            height: height,
        });

        textPlane.position.set(x,y,z);

        const planeTexture = AdvancedDynamicTexture.CreateForMesh(textPlane, width*100, height*100, false);

        planeTexture.background = backgroundColor;
        const planeText = new TextBlock(name);
        planeText.text = text;
        planeText.color = textColor;
        planeText.fontSize = fontSize;
        planeTexture.addControl(planeText);

        this.mesh = textPlane;
        this.textBlock = planeText;
    }
}
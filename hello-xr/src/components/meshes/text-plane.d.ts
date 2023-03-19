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
import { Mesh, Scene } from 'babylonjs';
import { TextBlock } from 'babylonjs-gui';
export declare class TextPlane {
    mesh: Mesh;
    textBlock: TextBlock;
    constructor(name: string, width: number, height: number, x: number, y: number, z: number, text: string, backgroundColor: string, textColor: string, fontSize: number, scene: Scene);
}

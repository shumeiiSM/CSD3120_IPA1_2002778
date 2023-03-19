/*! Start Header
\file: hello-mesh.ts
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
import { AbstractMesh, Scene, Mesh, Observable } from "babylonjs";
import { TextPlane } from "./text-plane";
export interface HelloMesh {
    scene: Scene;
    mesh: Mesh;
    label: TextPlane;
    onDistanceChangeObservable: Observable<number>;
    onIntersectObservable: Observable<boolean>;
    sayHello(message?: string): void;
}
export declare class HelloSphere extends AbstractMesh implements HelloMesh {
    scene: Scene;
    mesh: Mesh;
    label: TextPlane;
    onDistanceChangeObservable: Observable<number>;
    onIntersectObservable: Observable<boolean>;
    constructor(name: string, options: {
        diameter: number;
    }, scene: Scene);
    sayHello(message?: string): void;
    private initActions;
}

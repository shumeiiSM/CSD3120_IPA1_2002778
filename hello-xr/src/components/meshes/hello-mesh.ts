/************************************************************************/
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
/* End Header
***********************************************************************/

import { AbstractMesh, Scene, ActionManager, Color3, ExecuteCodeAction, InterpolateValueAction, Mesh, MeshBuilder, Observable, PredicateCondition, SetValueAction, StandardMaterial, Vector3, MultiPointerScaleBehavior, PointerDragBehavior, SceneLoader, SixDofDragBehavior, UtilityLayerRenderer } from "babylonjs";
//import { AbstractMesh, Scene } from "babylonjs";

import { TextPlane } from "./text-plane"

export interface HelloMesh {
    scene: Scene;
    mesh: Mesh;
    label: TextPlane;
    onDistanceChangeObservable: Observable<number>;
    onIntersectObservable: Observable<boolean>;

    sayHello(message?: string): void;
}

export class HelloSphere extends AbstractMesh implements HelloMesh {
    scene: Scene;
    mesh: Mesh;
    label: TextPlane;
    onDistanceChangeObservable: Observable<number>;
    onIntersectObservable: Observable<boolean>;

    constructor (name: string, options: { diameter: number }, scene: Scene) {
        super(name, scene);
        this.scene = scene;
        this.mesh = MeshBuilder.CreateSphere("hello sphere mesh", options, scene);
        this.mesh.material = new StandardMaterial("hello sphere material", scene);
        this.addChild(this.mesh);
        this.label = new TextPlane("hello sphere label", 1.5, 1, 0, options.diameter/2+0.2, 0, "hello sphere", "purple", "white", 25, scene);
        this.addChild(this.label.mesh);

        this.initActions();
    }

    sayHello(message?: string): void {
        console.log("message from hello sphere: " + message);
    }

    private initActions() {
        const actionManager = this.actionManager = new ActionManager(this.scene);
        actionManager.isRecursive = true;

        const light = this.scene.getLightById("default light");
        actionManager.registerAction(
            new InterpolateValueAction(
                ActionManager.OnPickTrigger,
                light, 
                "diffuse",
                Color3.Black(),
                1000
            )
        ).then(
            new InterpolateValueAction(
                ActionManager.OnPickTrigger,
                light, 
                "diffuse",
                Color3.White(),
                1000
            )
        );
        actionManager.registerAction(
            new InterpolateValueAction(
                ActionManager.OnPickDownTrigger,
                this,
                "scaling",
                new Vector3(2,2,2),
                1000,
                new PredicateCondition(
                    actionManager,
                    () => {
                        return light.diffuse.equals(Color3.Black());
                })
            )
        );
        const otherMesh = this.scene.getMeshById("sphere");
        actionManager.registerAction(
            new SetValueAction (
                {
                    trigger: ActionManager.OnIntersectionEnterTrigger,
                    parameter: {
                        mesh: otherMesh,
                        usePreciseIntersection: true,
                    }
                },
                this.mesh.material,
                "wireframe",
                true
            )
        );

        this.scene.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnKeyUpTrigger,
                    parameter: "r",
                },
                () => {
                    this.scaling.setAll(1);
                    this.mesh.material.wireframe = false;
                    console.log("r was pressed: reset " + this.name);
                }
            )
        );

        this.scene.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnKeyUpTrigger,
                    parameter: "d",
                },
                () => {
                    this.dispose();
                    console.log("d was pressed: delete " + this.name);
                }
            )
        );
    }
}

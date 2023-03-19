# Ting Shu Mei 2002778
CSD3120_IPA1_2002778

## File Directory

Under hello-xr folder:
- Contains all the configuration file for my project. 
- Dependencies all are listed inside package file

Under hello-xr\scr folder:
- Contains all the code file for my project.

Under hello-xr\scr\components folder:
- Contains all the export classes code I used to create the Mesh and Text

Under hello-xr\public\assets\models folder:
- Contains all the 3D models (.glb) I used in the scene

Under hello-xr\public\assets\sounds folder:
- Contains the background audio (.mp3) I used in the scene

Under hello-xr\public\assets\textures folder:
- Contains all the images (.png) I used in the scene

Under xrauthor-uploads\assets folder:
- Contains all the data of the video I recorded for teaching how to balanced a water equation using XRAuthor.

## Video Links
External link to the video:
https://youtu.be/YkVuektJZTs (real life)
https://youtu.be/nMpANDe1LJc (with interactive format)

Direct link to the video:
https://github.com/shumeiiSM/CSD3120_IPA1_2002778/blob/main/xrauthor-uploads/assets/videos/0.webm


## Mouse and Keyboard Controls
- Left Click (select/grab/drag objects)
- A/D (x-axis rotation)
- W/S (y-axis rotation)
- Q/E (z-axis rotation)
- Scroll wheel (scaling object)

Locomotion
- WebXR: Oculus Quest
- Mode: teleportation

## How To Run

Localhost Method - Go into hello-xr folder:
```
1. To install the depenpencies
npm install

2. Run the program
npm run serve

3. View the program by go into this link
http://localhost:3000/
```

Python Server Method - Go into hello-xr\dist folder:
```
1. To install the python server
python -m http.server

2. Run the program
npm run serve

3. View the program by go into this link
http://localhost:8000
```

## Description of the code file

1. hello-xr\webpack.config.js

This is a webpack configuration file that sets up the build process for a project.

The configuration specifies the following:
- The entry point for the application is the "./src/index.ts" file.
- The output of the build process will be a single file named "index.js" that will be placed in a "dist" folder.
- Webpack will look for files with the extensions ".ts" or ".js" when resolving imports.
- The "ts-loader" will be used to handle files with the ".ts" or ".tsx" extensions.
- The "development" mode is set, which means webpack will use un-minified code and output source maps.
devtool option is set to 'inline-source-map' which means it will include a source map of the original code in the final bundle.
- The devServer option is set to listen on port 3000.
- The HtmlWebpackPlugin is used to generate an HTML file that includes the output JS file. The template for the HTML file is src/index.html
- When webpack is run with this configuration, it will process the specified entry file and all of its dependencies, transpile the TypeScript code to JavaScript, bundle everything together, and output the result to the specified output file. Additionally, it will generate an index.html file that includes the output JS file and serve it on localhost:3000.


2. hello-xr\scr\index.ts

First, the code imports necessary classes from the Babylon.js and Babylon.js-gui libraries. Then, it imports an App class from another file.

Next, it creates a new Engine object and a canvas element to render the scene on. It also creates a new App object and calls its createScene method, which returns a Promise that resolves to a new Scene object.

When the Scene object is ready, the code starts the render loop with the engine.runRenderLoop method, which renders the scene continuously. The window object is also set to listen for the resize event and calls the engine.resize method when triggered.


3. hello-xr\scr\index.html

This is an HTML file that creates the structure for displaying the XR scene created by the createXRScene function.
This ensures that the canvas element that the XR scene is rendered on takes up the entire browser window.

The body of the HTML file includes a canvas element with the ID "renderCanvas" that matches the canvasID parameter passed to the createXRScene function. The canvas element is set to take up the entire browser window. The script tag at the end of the body imports the index.ts file which is the file that contains the createXRScene function.

When this HTML file is loaded in a web browser, the createXRScene function is called passing in the canvas ID as an argument, creating an XR scene on the canvas element and displaying it in the browser window.

4. hello-xr\scr\app.ts

<br>LoadModel</br>
The loadModel function takes several parameters, including a Scene object, a name string, a rootID string, a rootName string, a pos vector, a rotate vector, and a scale number.

The function then uses the SceneLoader class to asynchronously import a GLB model from the "assets/models/" directory with the specified name. Once the model is loaded, the function sets various properties on the root mesh, including its ID, name, position, rotation, and scaling.

If the model is not the ground model (named "ground"), the function adds several behaviors to the root mesh, including a PointerDragBehavior for moving the mesh with the mouse, a SixDofDragBehavior for moving the mesh in 6 degrees of freedom, and a MultiPointerScaleBehavior for scaling the mesh with multiple touch points.

Finally, if the model's name is not "+" or "=", the function creates a TextPlane object and adds it as a child of the root mesh, displaying the model's name in white on a purple background. The root mesh is then added to the scene.



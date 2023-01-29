# CSD3120_IPA1_2002778
# Ting Shu Mei 2002778

Under hello-xr folder:

Contains all the configuration file for my project. 

Under hello-xr\scr folder:

Contains all the code file for my project.
http://localhost:3000/

Under xrauthor-uploads\assets\waterBalanced folder:

Contains all the data of the video I recorded for teaching how to balanced a water equation using XRAuthor.
http://localhost:3000/learn/waterBalanced


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

This is an typescript file that exports a function called "createXRScene" that creates an XR scene using Babylon.js
The function takes in two parameters: "canvasID" is a string that specifies the ID of the canvas element on the HTML page where the scene will be rendered, and "authoringData" is an object that contains data used for authoring.

The function first creates an engine and a scene using the canvas element specified by the canvasID. 
Then it creates a sphere mesh and a plane mesh, positions them in the scene and sets the position of the 
plane mesh to be in front of the sphere mesh. The function then creates an AdvancedDynamicTexture for the plane mesh, adds a TextBlock to it and set the text and color of the TextBlock.

Finally, the function creates a default XR experience for the scene, sets the UI options for the session mode to 'immersive-ar' and runs the render loop to render the scene. The last line is for testing, it calls the function and passes in the canvas ID 'renderCanvas' and null as authoringData.


3. hello-xr\scr\index.html

This is an HTML file that creates the structure for displaying the XR scene created by the createXRScene function.
This ensures that the canvas element that the XR scene is rendered on takes up the entire browser window.

The body of the HTML file includes a canvas element with the ID "renderCanvas" that matches the canvasID parameter passed to the createXRScene function. The canvas element is set to take up the entire browser window. The script tag at the end of the body imports the index.ts file which is the file that contains the createXRScene function.

When this HTML file is loaded in a web browser, the createXRScene function is called passing in the canvas ID as an argument, creating an XR scene on the canvas element and displaying it in the browser window.

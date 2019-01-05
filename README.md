The main file you'll want to look at here is HorizontalPage.tsx. Page.tsx has my old attempt at using the library, but it didn't pan out and so is kind of buggy.

The repo for my patched version of react-beautiful-dnd can be found here:
https://github.com/lilymatcha/react-beautiful-dnd

My changes are pretty much all in src/view/drag-handle. These changes primarily have to do with getting rid of the mouse sensor and replacing it with the pointer sensor. I tidied up the code a bit (got rid of stuff I commented out, etc.) but it's probably still a bit messy. I need to trim the parts that are no longer needed given that the mouse-sensor isn't there anymore.

One part that might be confusing is in onPointerDown in drag-handle.jsx. The reason why we first check for if the browser is touch compatible is that PointerEvents of pointerType touch (note: different from a TouchEvent) didn't work with touch on Chrome, but the PointerEvents *did* work in Chrome when they were of type mouse. Therefore, in browsers that use TouchEvents (read: Chrome), we want TouchEvents to be used instead of PointerEvents. The reason why we have to do this check first is because PointerEvents are processed before TouchEvents (at least, from what I gathered after testing), so we essentially need to trash the PointerEvent so that the TouchEvent has a chance to get processed.

Also note that you'll get a react-beautiful-dnd development warning for not having a provided.placeholder as a child of a Droppable. I intentionally got rid of the placeholder because it caused the rows to move horizontally out of the way in a way that looked terrible and that I couldn't figure out how to make stop. There's probably a right way to fix it, but for now I'm just not using a placeholder and am ignoring the warnings.

How to patch react-beautiful-dnd in the prototype with my local development version:
1) Go into package.json in rearrangeable-layout and set react-beautiful-dnd to whatever version is latest, then npm install.
2) Clone my development version of react-beautiful-dnd into a separate repository.
3) Go into the react-beautiful-dnd folder and compile by running "yarn build:dist". You might have to install yarn. It likely won't compile all the way--that's okay, all we are going to need is react-beautiful-dnd.js, none of the others. react-beautiful-dnd.js will be located in react-beautiful-dnd/dist/
4) Go to rearrangeable-layout/node_modules/react-beautiful-dnd/dist/ and delete the contents of the folder, and add your compiled version of react-beautiful-dnd.js.
5) Go to rearrangeable-layout/node_modules/react-beautiful-dnd/package.json, and ctrl-F for "module". You'll see tags for both "main" and "module." Set them both to "dist/react-beautiful-dnd.js".
6) You're done! Run "npm run start" to run rearrangeable-layout with this new development version of react-beautiful-dnd.

If you want to make changes to the development version of react-beautiful-dnd:
1) Go back to the separate react-beautiful-dnd repo (note: not the one in rearrangeable-layout/node_modules) and make your changes.
2) Run "yarn build:dist" from that repo. Again, it won't build all the different files, but that's okay because you only need react-beautiful-dnd.js.
3) Copy react-beautiful-dnd.js from react-beautiful-dnd/dist/ to rearrangeable-layout/node_modules/react-beautiful-dnd/dist/.
4) Run "npm run start" to test your changes. If there are errors, they will be logged in the console of the browser.
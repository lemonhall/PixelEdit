![PixelEdit Screenshot](screenshot.png)

An html5 canvas pixel editor, for html5 canvas. Renders your pixel art as javascript objects. Easier and better than using pngs.

Usage
-----
Pretty straightforward (at the current version, at least!). 
Colored square in the bottom left corner indicates selected color. Top right icon is the "new" button, one after that is "export" to export to a javascript object which will show up in a box below the editor.

Export button puts the js object you created in the box below. You can render it using the `drawSpr(yourExportedObject, x, y, size)` function if you would like to experiment or implement your art early.


const VSHADER_SOURCE = `attribute vec4 a_Position;
uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_Size; 
  }`;

// Fragment shader program
const FSHADER_SOURCE = `precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`;

let canvas, gl, a_Position, u_FragColor, color, size, u_Size, g_shapesList, type, circleSegments;
g_shapesList = [];
color = [1, 0, 0, 1];
size = 10.0;
type = 'point'
circleSegments = 10

const setupWebGL = () => {
    canvas = document.getElementById('webgl');
    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true});
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
};

const connectVariablesToGLSL = () => {
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }

    u_Size = gl.getUniformLocation(gl.program, 'u_Size');
    if (!u_Size) {
        console.log('Failed to get the storage location of u_Size');
        return;
    }
};

const renderAllShapes = () => {
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_shapesList.length;
    for (var i = 0; i < len; i++) {
        g_shapesList[i].render()
     
    }
};

const click = (e) => {
    var x = e.clientX; // x coordinate of a mouse pointer
    var y = e.clientY; // y coordinate of a mouse pointer
    var rect = e.target.getBoundingClientRect();

    x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    console.log(type)
    if (type === 'point')
        g_shapesList.push(new Point([x, y], color, size))
    else if (type === 'triangle') 
        g_shapesList.push(new Triangle([x, y], color, size))
    else 
        g_shapesList.push(new Circle([x, y], color, size))

    renderAllShapes();
};

const handleColorChange = (e) => {
    const colorIndex = { red: 0, green: 1, blue: 2 };
    color[colorIndex[e.target.id]] = e.target.value / 100;
};

const handleStrictColorChange = (e) => {
    const colorIndex = { 'full-green': [0, 1, 0, 1], 'full-red': [1, 0, 0, 1] };
    color = colorIndex[e.target.id];
};

const handleSizeChange = (e) => {
    size = e.target.value;
};

const handleClearShapes = () => {
    g_shapesList = []
    renderAllShapes();
}

const handleMouseDrag = (e) => {
    if (e.buttons === 1)
        click(e)
}

const handleShapeChange = (e) => {
    type = e.target.id
}
const handleSegmentChange = (e) => {
    circleSegments = Math.max(e.target.value, 3)
    renderAllShapes();
}

const makeEventListeners = () => {
    canvas.onmousedown = click;
    canvas.onmousemove = handleMouseDrag;

    document.getElementById('red').onchange = handleColorChange;
    document.getElementById('green').onchange = handleColorChange;
    document.getElementById('blue').onchange = handleColorChange;

    document.getElementById('full-green').onclick = handleStrictColorChange;
    document.getElementById('full-red').onclick = handleStrictColorChange;
    
    document.getElementById('point').onclick = handleShapeChange
    document.getElementById('triangle').onclick = handleShapeChange
    document.getElementById('circle').onclick = handleShapeChange

    document.getElementById('size').onchange = handleSizeChange;
    document.getElementById('circle-segments').onchange = handleSegmentChange;
    document.getElementById('clear').onclick = handleClearShapes
};

function main() {
    setupWebGL();
    connectVariablesToGLSL();
    makeEventListeners();
}

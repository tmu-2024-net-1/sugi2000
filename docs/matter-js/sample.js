// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Common = Matter.Common,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Vertices = Matter.Vertices,
    Svg = Matter.Svg;

// provide concave decomposition support library
Common.setDecomp(decomp);

// create an engine
var engine = Engine.create();
var world = engine.world;

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        background: '#f4f4f8'
    }
});

// add bodies
var select = function(root, selector) {
    return Array.prototype.slice.call(root.querySelectorAll(selector));
};

var loadSvg = function(url) {
    return fetch(url)
        .then(function(response) { return response.text(); })
        .then(function(raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
};

([
    './svg/iconmonstr-check-mark-8-icon.svg', 
    './svg/iconmonstr-paperclip-2-icon.svg',
    './svg/iconmonstr-puzzle-icon.svg',
    './svg/iconmonstr-user-icon.svg'
]).forEach(function(path, i) { 
    loadSvg(path).then(function(root) {
        var color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);

        var vertexSets = select(root, 'path')
            .map(function(path) { return Vertices.scale(Svg.pathToVertices(path, 30), 0.4, 0.4); });

        Composite.add(world, Bodies.fromVertices(100 + i * 150, 200 + i * 50, vertexSets, {
            render: {
                fillStyle: color,
                strokeStyle: color,
                lineWidth: 1
            }
        }, true));
    });
});

loadSvg('./svg/svg.svg').then(function(root) {
    var color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);
    
    var vertexSets = select(root, 'path')
        .map(function(path) { return Svg.pathToVertices(path, 30); });

    Composite.add(world, Bodies.fromVertices(400, 80, vertexSets, {
        render: {
            fillStyle: color,
            strokeStyle: color,
            lineWidth: 1
        }
    }, true));
});

// add walls
Composite.add(world, [
    Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
    Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
    Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
    Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
]);

// create two boxes and a ground
// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(450, 50, 80, 80);
// var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
// Composite.add(engine.world, [boxA, boxB, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
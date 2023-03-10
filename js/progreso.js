var circleBar = new ProgressBar.Circle("#progreso-correcto", {
    color: "white",
    strokeWidth: 8,
    trailWidth: 7,
    trailColor: "transparent",
    easing: "easeInOut",
    from: { color: "#3c665e", width: 8 },
    to: { color: "#25c1a3", width: 8 },
    text: {
        value: '0',
        className: 'progress-text',
        style: {
            color: '#25c1a3',
            position: 'absolute',
            top: '45%',
            left: '42%',
            padding: 0,
            margin: 0,
            transform: null
        }
    },
    step: (state, shape) => {
        shape.path.setAttribute("stroke", state.color);
        shape.path.setAttribute("stroke-width", state.width);
        shape.setText(Math.round(shape.value() * 100) + '%');
    }
});
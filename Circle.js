class Circle {
    constructor(point, color, size) {
        this.type = 'circle';
        this.point = point;
        this.color = color;
        this.size = size;
        this.estimatedVerticies = []
        this.estimatedSegments = 0
    }

    drawCircle = () => {
        const n = this.estimatedVerticies.length / 2; 

        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.estimatedVerticies), gl.STATIC_DRAW);
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
    };

    render() {
        gl.vertexAttrib3f(a_Position, ...this.point, 0.0);
        gl.uniform4f(u_FragColor, ...this.color);
        gl.uniform1f(u_Size, this.size);

        if (!this.estimatedVerticies || this.estimatedSegments !== circleSegments){
            this.estimatedVerticies = []
            this.estimatedSegments = circleSegments
            for (let i = 0; i < circleSegments + 1; i++) {
                const angle = (i / circleSegments) * 2 * Math.PI;
                const x = this.point[0] + (this.size * 0.003) * Math.cos(angle);
                const y = this.point[1] + (this.size * 0.003) * Math.sin(angle);
                this.estimatedVerticies.push(x, y);
            }
        }

        this.drawCircle();
    }
}

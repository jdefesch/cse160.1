class Point{
    constructor(point, color, size){
        this.type = 'point' 
        this.point = point
        this.color = color
        this.size = size
     }


     render() {

        gl.disableVertexAttribArray(a_Position)
        gl.vertexAttrib3f(a_Position, ...this.point, 0.0);
        gl.uniform4f(u_FragColor, ...this.color);
        gl.uniform1f(u_Size, this.size);

        gl.drawArrays(gl.POINTS, 0, 1);
     }
}

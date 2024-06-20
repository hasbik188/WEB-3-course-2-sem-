let svg = d3.select("svg").attr("width", 800).attr("height", 800);

function Primitive_Draw() {
    let primitive = svg
        .append("g")
        .style("stroke", "#ffd80c")
        .style("stroke-width", 2)
        .style("fill", "#ba1fc5");

    primitive
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 20)
        .style("fill", "red");
    primitive
        .append("circle")
        .attr("cx", 0).attr("cy", 0)
        .attr("r", 11.5)
        .style("fill", "#f41371");
    primitive
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 5)
        .style("fill", "blue");
    primitive
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 2)
        .style("fill", "green");
    primitive
        .append("line")
        .style("stroke", "green")
        .style("stroke-width", 2)
        .attr("x1", 10)
        .attr("y1", -10)
        .attr("x2", -10)
        .attr("y2", 10);

    return primitive;
}

let Picture_Draw = (dataForm) => {
    let pict = Primitive_Draw();
    let path = drawHeartPath(50, 30);

    let speed_animation = dataForm.animation_time.value == "" ? 5000 : parseFloat(dataForm.animation_time.value);
    let degree = dataForm.scale_checkbox.checked ? 0 : 1;

    pict
        .transition().duration(speed_animation)
        .ease(d3.easeLinear)
        .attr("transform", `translate(${300},${300}) rotate(90)`)
        .attrTween("transform", translateAlong(path.node(), degree));
};

let clear_ALL = () => {
    svg.selectAll("*").remove();
};



function createHeartPath(x_pos, y_pos) {
    
    let data = [];
    for (let t = -Math.PI; t <= Math.PI; t += 0.01) {
        let x = 10 * (x_pos + 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        let y = 10 * (y_pos + 16 * Math.pow(Math.sin(t), 3));
        data.push({ x: x, y: y });
    }
    return data;
}

let drawHeartPath = (x_pos, y_pos) => {
    const dataPoints = createHeartPath(x_pos, y_pos);
    const line = d3.line().x((d) => d.x).y((d) => d.y);
    const path = svg.append("path").attr("d", line(dataPoints)).attr("stroke", "black").attr("fill", "none");
    return path;
};

function translateAlong(path, degree) {
    const length = path.getTotalLength();
    return function () {
        return function (t) {
            let { x, y } = path.getPointAtLength((1 - t) * length);
            return `translate(${x},${y}) rotate(${0}) scale(${degree != 1 ? 1 - t : degree})`;
        };
    };
}

document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("animation_btn")
        .addEventListener("click", function () {
            Picture_Draw(document.getElementById("setting"));
        });
    document.getElementById("clear_btn").addEventListener("click", function () {
        clear_ALL();
    });
});
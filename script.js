
let points = []
// points.push({x: 0, y: 0})
// for (let i = 0; i < 100; i++) {
//   points.push({
//     x: Math.round(Math.random() * (100 - 1)),
//     y: Math.round(Math.random() * (100 - 1))
//   })
// }
let graphs = []
for (let i = 0; i < points.length; i++) {
  points[i].id = i + 1
  points[i].distance = Math.round(Math.sqrt(Math.pow(0 - points[i].x, 2) + Math.pow(0 - points[i].y, 2)))
}
function bubbleSortConcept(arr) {
  for (let j = arr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (arr[i].distance > arr[i + 1].distance) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
  return arr
}
points = bubbleSortConcept(points)
for (let i = 0; i < points.length; i++) {
  for (let j = 0; j < points.length; j++) {
    const graph = {
      point1: points[i].id,
      point2: points[j].id,
      weight: Math.round(Math.sqrt(Math.pow(points[i].x - points[j].x, 2) + Math.pow(points[i].y - points[j].y, 2)))
    }
    // console.log(graphs.findIndex(item => item.point1 == graph.point2 && item.weight == graph.weight) != undefined)
    if (graph.weight != 0 && graphs.findIndex(item => item.point1 == graph.point2 && item.weight == graph.weight) == -1) {
      graphs.push(graph)
    }
  }
}

function prima(oldgraphs,oldpoints) {
  let startPoint = oldgraphs[0].point1
  let newGraphs = []
  function getPoints(data,point){
    let result = []
    for (let i = 0; i < data.length; i++) {
      if(data[i].point1 == point || data[i].point2 == point){
        result.push(data[i])
      }
    }
    return result
  }
  while(oldgraphs.length > 1){
    // console.log("startPoint",startPoint)
    let peaks = getPoints(oldgraphs,startPoint)
    // console.log("peaks",peaks)
    if(peaks.length > 0){
      oldgraphs = oldgraphs.filter(graph => graph.point1 != startPoint && graph.point2 != startPoint)
      let peak = peaks.reduce((prev,curr)=> prev.weight < curr.weight ? prev : curr)
      // console.log("oldgraphs",oldgraphs)
      newGraphs.push(peak)
      startPoint = startPoint == peak.point1 ? peak.point2 : peak.point1
      // console.log("startPoint",startPoint)
      if(oldgraphs.length == 1){
        newGraphs.push(oldgraphs[0])
      }
    }
  }
  return newGraphs
}

function getPoint(id) {
  let point
  for (let i = 0; i < points.length; i++) {
    if (points[i].id == id) {
      point = points[i]
      break
    }
  }
  return point
}
console.log(points)
console.log(graphs)
graphs = prima(graphs,points)
function setup() {
  createCanvas(1000, 1000);
  for (let i = 0; i < points.length; i++) {
    circle(points[i].x, points[i].y, 2)
  }
  for (let i = 0; i < graphs.length; i++) {
    line(getPoint(graphs[i].point1).x, getPoint(graphs[i].point1).y, getPoint(graphs[i].point2).x, getPoint(graphs[i].point2).y)
  }
}

function draw() {
}

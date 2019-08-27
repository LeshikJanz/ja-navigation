function init() {
  window.jaMap = new window.ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 7
  });
  console.log("jaMap", window.jaMap)
}

export const runMap = () =>
  window.ymaps.ready(init)

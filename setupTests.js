import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

global.ymaps = {
  ready: () => {},
  Placemark: () => {}
};

global.jaMap = {
  geoObjects: {
    add: () => {},
    removeAll: () => {}
  },
  setBounds: () => {}
};

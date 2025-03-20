import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { KML } from "ol/format";

export default function createKmlLayer(kmlUrl) {
  // console.log(kmlUrl); // Debugging
  return new VectorLayer({
    source: new VectorSource({
      format: new KML(),
      url: kmlUrl,
    }),
  });
}

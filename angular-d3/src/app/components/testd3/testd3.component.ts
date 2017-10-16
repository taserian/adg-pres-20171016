import { Component, OnInit, ElementRef } from "@angular/core";
import { D3Service, D3, Selection } from "d3-ng2-service";
import { schemeBlues } from "d3-scale-chromatic"
import { MapDataService } from "../../services/mapdata.service";
import { mesh, feature } from "topojson";
import { Observable } from "rxjs/Rx";

@Component({
  selector: "app-testd3",
  templateUrl: "./testd3.component.html",
  styleUrls: ["./testd3.component.css"]
})
export class TestD3Component implements OnInit {
  private d3: D3;
  private parentNativeElement: any;
  private d3SVG: Selection<SVGSVGElement, any, null, undefined>;
  private d3G: Selection<SVGGElement, any, null, undefined>;
  private mapdata: Observable<any>;
  private topojsonData: any;

  constructor(
    element: ElementRef,
    d3Service: D3Service,
    private mapdataservice: MapDataService
  ) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    const d3 = this.d3;
    let d3ParentElement: Selection<HTMLElement, any, null, undefined>;
    let d3SVG: Selection<SVGSVGElement, any, null, undefined>;
    let d3G: Selection<SVGGElement, any, null, undefined>;
    let path: any;

    if (this.parentNativeElement !== null) {
      // d3 goes here
      d3ParentElement = d3.select(this.parentNativeElement);
      d3SVG = this.d3SVG = d3ParentElement.select<SVGSVGElement>("svg");

      this.mapdataservice.getMapData().subscribe(
        x => {
          this.topojsonData = x;
          this.createMap(x);
        },
        e => console.log(e)
      );
    }
  }

  private createMap(topo) {
    const path = this.d3.geoPath().projection(this.d3.geoAlbersUsa());

    for (const i of topo.objects.counties.geometries) {
      i.properties['fips'] = i.properties['STATEFP'] + i.properties['COUNTYFP'];
    }


    const color = this.d3.scaleOrdinal(this.d3.schemeCategory10);

    //const color = this.d3.scaleThreshold().domain([0, 9]).range(schemeBlues[9]);

    this.d3G = this.d3SVG.append<SVGGElement>("g");
          this.d3G.attr("class", "counties");
          this.d3G
            .selectAll("path")
            .data(
              feature(topo, topo.objects.counties).features
            )
            .enter()
            .append("path")
            // for scaleOrdinal
            .attr("fill",
               ( (d, i) => color((i % 10).toString()) )
            )
            //for scaleThreshold
            // .attr("fill",
            //   ( (ds) => color(d.properties.COUNTYFP % 100) / 10 ))
            // )
            .attr("d", path);

          this.d3SVG.append("path")
            .datum(mesh(topo, topo.objects.states, ( (a: any, b: any) => a !== b ) ))
            .attr("class", "states")
            .attr("d", path);
          }
}

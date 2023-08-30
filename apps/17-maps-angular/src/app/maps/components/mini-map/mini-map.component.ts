import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css'],
})
export class MiniMapComponent implements AfterViewInit {
  @Input()
  public lngLat?: [number, number];

  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) throw Error('Map not found');
    if (!this.lngLat) throw Error("LngLat can't be null");

    const currentLngLat: LngLat = new LngLat(this.lngLat[0], this.lngLat[1]);

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: currentLngLat,
      zoom: 15, // starting zoom
      interactive: false,
    });

    new Marker().setLngLat(currentLngLat).addTo(map);
  }
}

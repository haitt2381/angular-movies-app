import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

    @Input() vote_average: number;
    @Input() id?: number = 0;
    protected readonly Math = Math;
}

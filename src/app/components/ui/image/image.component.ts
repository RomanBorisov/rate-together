import { Component, input } from '@angular/core';

@Component({
    selector: 'app-image',
    imports: [],
    templateUrl: './image.component.html',
    styleUrl: './image.component.scss',
    standalone: true
})
export class ImageComponent {
    public src = input.required<string>();

    public alt = input.required<string>();

}

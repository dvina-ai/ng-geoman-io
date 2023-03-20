/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { NgModule } from '@angular/core';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { LeafletGeomanDirective } from './core/leaflet-geoman.directive';

@NgModule({
	imports: [LeafletModule],
	exports: [LeafletGeomanDirective],
	declarations: [LeafletGeomanDirective],
})
export class LeafletGeomanModule {}

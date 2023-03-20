/**
 * @license
 * Copyright Kant Yazılım A.Ş. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://rilke.ist/license
 */

import { Directive, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';

import { GeomanEvents, PM } from 'leaflet';
import '@geoman-io/leaflet-geoman-free';

import { LeafletDirective, LeafletDirectiveWrapper, LeafletUtil } from '@asymmetrik/ngx-leaflet';

@Directive({
	selector: '[leafletGeoman]',
})
export class LeafletGeomanDirective implements OnInit {
	leafletDirective: LeafletDirectiveWrapper;

	geomanInstance: PM.PMMap;

	@Input('leafletGeomanOptions') controlOptions: PM.ToolbarOptions = null;

	// Using 'any' here to avoid duplicating the DrawLocal interface with a bunch of optional properties
	@Input('leafletGeomanLocal') geomanLocal: PM.Translations = null;

	// Configure callback function for the map
	@Output('leafletGeomanReady') geomanReady = new EventEmitter<PM.PMMap>();

	// Draw Events
	@Output('leafletGlobalDrawModeToggledEvent') onGlobalDrawModeToggled =
		new EventEmitter<GeomanEvents.GlobalDrawModeToggledEvent>();
	@Output('leafletDrawStartEvent') onDrawStart = new EventEmitter<GeomanEvents.DrawStartEvent>();
	@Output('leafletDrawEndEvent') onDrawEnd = new EventEmitter<GeomanEvents.DrawEndEvent>();
	@Output('leafletCreateEvent') onCreate = new EventEmitter<GeomanEvents.CreateEvent>();
	@Output('leafletVertexAddedEvent') onVertexAdded = new EventEmitter<GeomanEvents.VertexAddedEvent>();
	@Output('leafletSnapEvent') onSnap = new EventEmitter<GeomanEvents.SnapEvent>();
	@Output('leafletCenterPlacedEvent') onCenterPlaced = new EventEmitter<GeomanEvents.CenterPlacedEvent>();
	@Output('leafletEditEvent') onEdit = new EventEmitter<GeomanEvents.EditEvent>();
	@Output('leafletUpdateEvent') onUpdate = new EventEmitter<GeomanEvents.UpdateEvent>();
	@Output('leafletEditEnableEvent') onEditEnable = new EventEmitter<GeomanEvents.EditEnableEvent>();
	@Output('leafletEditDisableEvent') onEditDisable = new EventEmitter<GeomanEvents.EditDisableEvent>();
	@Output('leafletVertexRemovedEvent') onVertexRemoved = new EventEmitter<GeomanEvents.VertexRemovedEvent>();
	@Output('leafletVertexClickEvent') onVertexClick = new EventEmitter<GeomanEvents.VertexClickEvent>();
	@Output('leafletMarkerDragStartEvent') onMarkerDragStart = new EventEmitter<GeomanEvents.MarkerDragStartEvent>();
	@Output('leafletMarkerDragEvent') onMarkerDrag = new EventEmitter<GeomanEvents.MarkerDragEvent>();
	@Output('leafletMarkerDragEndEvent') onMarkerDragEnd = new EventEmitter<GeomanEvents.MarkerDragEndEvent>();
	@Output('leafletLayerResetEvent') onLayerReset = new EventEmitter<GeomanEvents.LayerResetEvent>();
	@Output('leafletIntersectEvent') onIntersect = new EventEmitter<GeomanEvents.IntersectEvent>();
	@Output('leafletChangeEvent') onChange = new EventEmitter<GeomanEvents.ChangeEvent>();
	@Output('leafletTextChangeEvent') onTextChange = new EventEmitter<GeomanEvents.TextChangeEvent>();
	@Output('leafletTextFocusEvent') onTextFocus = new EventEmitter<GeomanEvents.TextFocusEvent>();
	@Output('leafletTextBlurEvent') onTextBlur = new EventEmitter<GeomanEvents.TextBlurEvent>();
	@Output('leafletGlobalEditModeToggledEvent') onGlobalEditModeToggled =
		new EventEmitter<GeomanEvents.GlobalEditModeToggledEvent>();
	@Output('leafletGlobalDragModeToggledEvent') onGlobalDragModeToggled =
		new EventEmitter<GeomanEvents.GlobalDragModeToggledEvent>();
	@Output('leafletDragStartEvent') onDragStart = new EventEmitter<GeomanEvents.DragStartEvent>();
	@Output('leafletDragEvent') onDrag = new EventEmitter<GeomanEvents.DragEvent>();
	@Output('leafletDragEndEvent') onDragEnd = new EventEmitter<GeomanEvents.DragEndEvent>();
	@Output('leafletDragEnableEvent') onDragEnable = new EventEmitter<GeomanEvents.DragEnableEvent>();
	@Output('leafletDragDisableEvent') onDragDisable = new EventEmitter<GeomanEvents.DragDisableEvent>();
	@Output('leafletRemoveEvent') onRemove = new EventEmitter<GeomanEvents.RemoveEvent>();
	@Output('leafletGlobalRemovalModeToggledEvent') onGlobalRemovalModeToggled =
		new EventEmitter<GeomanEvents.GlobalRemovalModeToggledEvent>();
	@Output('leafletGlobalCutModeToggledEvent') onGlobalCutModeToggled =
		new EventEmitter<GeomanEvents.GlobalCutModeToggledEvent>();
	@Output('leafletCutEvent') onCut = new EventEmitter<GeomanEvents.CutEvent>();
	@Output('leafletRotateEnableEvent') onRotateEnable = new EventEmitter<GeomanEvents.RotateEnableEvent>();
	@Output('leafletRotateDisableEvent') onRotateDisable = new EventEmitter<GeomanEvents.RotateDisableEvent>();
	@Output('leafletRotateStartEvent') onRotateStart = new EventEmitter<GeomanEvents.RotateStartEvent>();
	@Output('leafletRotateEvent') onRotate = new EventEmitter<GeomanEvents.RotateEvent>();
	@Output('leafletRotateEndEvent') onRotateEnd = new EventEmitter<GeomanEvents.RotateEndEvent>();
	@Output('leafletGlobalRotateModeToggledEvent') onGlobalRotateModeToggled =
		new EventEmitter<GeomanEvents.GlobalRotateModeToggledEvent>();
	@Output('leafletLangChangeEvent') onLangChange = new EventEmitter<GeomanEvents.LangChangeEvent>();
	@Output('leafletButtonClickEvent') onButtonClick = new EventEmitter<GeomanEvents.ButtonClickEvent>();
	@Output('leafletActionClickEvent') onActionClick = new EventEmitter<GeomanEvents.ActionClickEvent>();
	@Output('leafletKeyboardKeyEvent') onKeyboardKey = new EventEmitter<GeomanEvents.KeyboardKeyEvent>();

	constructor(leafletDirective: LeafletDirective, private zone: NgZone) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
	}

	ngOnInit() {
		this.leafletDirective.init();

		// Register the main handler for events coming from the geoman plugin
		const map = this.leafletDirective.getMap();

		this.geomanInstance = map.pm;

		// Add the control to the map
		// map.pm.addControls(this.controlOptions);

		map.on('pm:globaldrawmodetoggled', (e: GeomanEvents.GlobalDrawModeToggledEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onGlobalDrawModeToggled, e)
		);

		map.on('pm:drawstart', (e: GeomanEvents.DrawStartEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onDrawStart, e)
		);
		map.on('pm:drawend', (e: GeomanEvents.DrawEndEvent) => LeafletUtil.handleEvent(this.zone, this.onDrawEnd, e));
		map.on('pm:create', (e: GeomanEvents.CreateEvent) => LeafletUtil.handleEvent(this.zone, this.onCreate, e));

		map.on('pm:snap', (e: GeomanEvents.SnapEvent) => LeafletUtil.handleEvent(this.zone, this.onSnap, e));
		map.on('pm:snapdrag', (e: GeomanEvents.SnapEvent) => LeafletUtil.handleEvent(this.zone, this.onSnap, e));
		map.on('pm:unsnap', (e: GeomanEvents.SnapEvent) => LeafletUtil.handleEvent(this.zone, this.onSnap, e));

		map.on('pm:centerplaced', (e: GeomanEvents.CenterPlacedEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onCenterPlaced, e)
		);

		map.on('pm:edit', (e: GeomanEvents.EditEvent) => LeafletUtil.handleEvent(this.zone, this.onEdit, e));
		map.on('pm:update', (e: GeomanEvents.UpdateEvent) => LeafletUtil.handleEvent(this.zone, this.onUpdate, e));

		map.on('pm:enable', (e: GeomanEvents.EditEnableEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onEditEnable, e)
		);
		map.on('pm:disable', (e: GeomanEvents.EditDisableEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onEditDisable, e)
		);

		map.on('pm:vertexadded', (e: GeomanEvents.VertexAddedEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onVertexAdded, e)
		);
		map.on('pm:vertexremoved', (e: GeomanEvents.VertexRemovedEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onVertexRemoved, e)
		);
		map.on('pm:vertexclick', (e: GeomanEvents.VertexClickEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onVertexClick, e)
		);

		map.on('pm:markerdragstart', (e: GeomanEvents.MarkerDragStartEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onMarkerDragStart, e)
		);
		map.on('pm:markerdrag', (e: GeomanEvents.MarkerDragEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onMarkerDrag, e)
		);
		map.on('pm:markerdragend', (e: GeomanEvents.MarkerDragEndEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onMarkerDragEnd, e)
		);

		map.on('pm:layerreset', (e: GeomanEvents.LayerResetEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onLayerReset, e)
		);
		map.on('pm:intersect', (e: GeomanEvents.IntersectEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onIntersect, e)
		);
		map.on('pm:change', (e: GeomanEvents.ChangeEvent) => LeafletUtil.handleEvent(this.zone, this.onChange, e));

		map.on('pm:textchange', (e: GeomanEvents.TextChangeEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onTextChange, e)
		);
		map.on('pm:textfocus', (e: GeomanEvents.TextFocusEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onTextFocus, e)
		);
		map.on('pm:textblur', (e: GeomanEvents.TextBlurEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onTextBlur, e)
		);

		map.on('pm:globaleditmodetoggled', (e: GeomanEvents.GlobalEditModeToggledEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onGlobalEditModeToggled, e)
		);

		map.on('pm:globaldragmodetoggled', (e: GeomanEvents.GlobalDragModeToggledEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onGlobalDragModeToggled, e)
		);
		map.on('pm:dragstart', (e: GeomanEvents.DragStartEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onDragStart, e)
		);
		map.on('pm:drag', (e: GeomanEvents.DragEvent) => LeafletUtil.handleEvent(this.zone, this.onDrag, e));
		map.on('pm:dragend', (e: GeomanEvents.DragEndEvent) => LeafletUtil.handleEvent(this.zone, this.onDragEnd, e));
		map.on('pm:dragenable', (e: GeomanEvents.DragEnableEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onDragEnable, e)
		);
		map.on('pm:dragdisable', (e: GeomanEvents.DragDisableEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onDragDisable, e)
		);

		map.on('pm:globalremovalmodetoggled', (e: GeomanEvents.GlobalRemovalModeToggledEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onGlobalRemovalModeToggled, e)
		);
		map.on('pm:remove', (e: GeomanEvents.RemoveEvent) => LeafletUtil.handleEvent(this.zone, this.onRemove, e));

		map.on('pm:globalcutmodetoggled', (e: GeomanEvents.GlobalCutModeToggledEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onGlobalCutModeToggled, e)
		);
		map.on('pm:cut', (e: GeomanEvents.CutEvent) => LeafletUtil.handleEvent(this.zone, this.onCut, e));

		map.on('pm:globalrotatemodetoggled', (e: GeomanEvents.GlobalRotateModeToggledEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onGlobalRotateModeToggled, e)
		);

		map.on('pm:rotateenable', (e: GeomanEvents.RotateEnableEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onRotateEnable, e)
		);
		map.on('pm:rotatedisable', (e: GeomanEvents.RotateDisableEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onRotateDisable, e)
		);
		map.on('pm:rotatestart', (e: GeomanEvents.RotateStartEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onRotateStart, e)
		);
		map.on('pm:rotate', (e: GeomanEvents.RotateEvent) => LeafletUtil.handleEvent(this.zone, this.onRotate, e));
		map.on('pm:rotateend', (e: GeomanEvents.RotateEndEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onRotateEnd, e)
		);

		map.on('pm:langchange', (e: GeomanEvents.LangChangeEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onLangChange, e)
		);
		map.on('pm:buttonclick', (e: GeomanEvents.ButtonClickEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onButtonClick, e)
		);
		map.on('pm:actionclick', (e: GeomanEvents.ActionClickEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onActionClick, e)
		);
		map.on('pm:keyevent', (e: GeomanEvents.KeyboardKeyEvent) =>
			LeafletUtil.handleEvent(this.zone, this.onKeyboardKey, e)
		);

		// Notify others that the draw control has been created
		this.geomanReady.emit(this.geomanInstance);
	}

	createControl() {
		this.geomanInstance.addControls(this.controlOptions);
	}

	ngOnDestroy() {
		this.leafletDirective.getMap().pm.removeControls();
	}
}

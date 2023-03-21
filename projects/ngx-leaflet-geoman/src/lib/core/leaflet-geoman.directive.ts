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

	@Input('gmOptions') controlOptions: PM.ToolbarOptions = null;

	// Configure the translation
	@Input('gmTranslation') geomanTranslations: PM.Translations = null;
	@Input('gmLocale') geomanLocal: PM.SupportLocales = 'en';

	// Configure callback function for the map
	@Output('gmReady') geomanReady = new EventEmitter<PM.PMMap>();

	// Draw Events
	@Output('gmGlobalDrawModeToggled') onGlobalDrawModeToggled =
		new EventEmitter<GeomanEvents.GlobalDrawModeToggledEvent>();
	@Output('gmDrawStart') onDrawStart = new EventEmitter<GeomanEvents.DrawStartEvent>();
	@Output('gmDrawEnd') onDrawEnd = new EventEmitter<GeomanEvents.DrawEndEvent>();
	@Output('gmCreate') onCreate = new EventEmitter<GeomanEvents.CreateEvent>();
	@Output('gmVertexAdded') onVertexAdded = new EventEmitter<GeomanEvents.VertexAddedEvent>();
	@Output('gmSnap') onSnap = new EventEmitter<GeomanEvents.SnapEvent>();
	@Output('gmCenterPlaced') onCenterPlaced = new EventEmitter<GeomanEvents.CenterPlacedEvent>();
	@Output('gmEdit') onEdit = new EventEmitter<GeomanEvents.EditEvent>();
	@Output('gmUpdate') onUpdate = new EventEmitter<GeomanEvents.UpdateEvent>();
	@Output('gmEditEnable') onEditEnable = new EventEmitter<GeomanEvents.EditEnableEvent>();
	@Output('gmEditDisable') onEditDisable = new EventEmitter<GeomanEvents.EditDisableEvent>();
	@Output('gmVertexRemoved') onVertexRemoved = new EventEmitter<GeomanEvents.VertexRemovedEvent>();
	@Output('gmVertexClick') onVertexClick = new EventEmitter<GeomanEvents.VertexClickEvent>();
	@Output('gmMarkerDragStart') onMarkerDragStart = new EventEmitter<GeomanEvents.MarkerDragStartEvent>();
	@Output('gmMarkerDrag') onMarkerDrag = new EventEmitter<GeomanEvents.MarkerDragEvent>();
	@Output('gmMarkerDragEnd') onMarkerDragEnd = new EventEmitter<GeomanEvents.MarkerDragEndEvent>();
	@Output('gmLayerReset') onLayerReset = new EventEmitter<GeomanEvents.LayerResetEvent>();
	@Output('gmIntersect') onIntersect = new EventEmitter<GeomanEvents.IntersectEvent>();
	@Output('gmChange') onChange = new EventEmitter<GeomanEvents.ChangeEvent>();
	@Output('gmTextChange') onTextChange = new EventEmitter<GeomanEvents.TextChangeEvent>();
	@Output('gmTextFocus') onTextFocus = new EventEmitter<GeomanEvents.TextFocusEvent>();
	@Output('gmTextBlur') onTextBlur = new EventEmitter<GeomanEvents.TextBlurEvent>();
	@Output('gmGlobalEditModeToggled') onGlobalEditModeToggled =
		new EventEmitter<GeomanEvents.GlobalEditModeToggledEvent>();
	@Output('gmGlobalDragModeToggled') onGlobalDragModeToggled =
		new EventEmitter<GeomanEvents.GlobalDragModeToggledEvent>();
	@Output('gmDragStart') onDragStart = new EventEmitter<GeomanEvents.DragStartEvent>();
	@Output('gmDrag') onDrag = new EventEmitter<GeomanEvents.DragEvent>();
	@Output('gmDragEnd') onDragEnd = new EventEmitter<GeomanEvents.DragEndEvent>();
	@Output('gmDragEnable') onDragEnable = new EventEmitter<GeomanEvents.DragEnableEvent>();
	@Output('gmDragDisable') onDragDisable = new EventEmitter<GeomanEvents.DragDisableEvent>();
	@Output('gmRemove') onRemove = new EventEmitter<GeomanEvents.RemoveEvent>();
	@Output('gmGlobalRemovalModeToggled') onGlobalRemovalModeToggled =
		new EventEmitter<GeomanEvents.GlobalRemovalModeToggledEvent>();
	@Output('gmGlobalCutModeToggled') onGlobalCutModeToggled =
		new EventEmitter<GeomanEvents.GlobalCutModeToggledEvent>();
	@Output('gmCut') onCut = new EventEmitter<GeomanEvents.CutEvent>();
	@Output('gmRotateEnable') onRotateEnable = new EventEmitter<GeomanEvents.RotateEnableEvent>();
	@Output('gmRotateDisable') onRotateDisable = new EventEmitter<GeomanEvents.RotateDisableEvent>();
	@Output('gmRotateStart') onRotateStart = new EventEmitter<GeomanEvents.RotateStartEvent>();
	@Output('gmRotate') onRotate = new EventEmitter<GeomanEvents.RotateEvent>();
	@Output('gmRotateEnd') onRotateEnd = new EventEmitter<GeomanEvents.RotateEndEvent>();
	@Output('gmGlobalRotateModeToggled') onGlobalRotateModeToggled =
		new EventEmitter<GeomanEvents.GlobalRotateModeToggledEvent>();
	@Output('gmLangChange') onLangChange = new EventEmitter<GeomanEvents.LangChangeEvent>();
	@Output('gmButtonClick') onButtonClick = new EventEmitter<GeomanEvents.ButtonClickEvent>();
	@Output('gmActionClick') onActionClick = new EventEmitter<GeomanEvents.ActionClickEvent>();
	@Output('gmKeyboardKey') onKeyboardKey = new EventEmitter<GeomanEvents.KeyboardKeyEvent>();

	constructor(leafletDirective: LeafletDirective, private zone: NgZone) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
	}

	ngOnInit() {
		this.leafletDirective.init();

		// Register the main handler for events coming from the geoman plugin
		const map = this.leafletDirective.getMap();

		this.geomanInstance = map.pm;

		// Set Locale
		this.geomanInstance.setLang(this.geomanLocal, this.geomanTranslations);

		// Add the control to the map
		// this.geomanInstance.addControls(this.controlOptions);

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

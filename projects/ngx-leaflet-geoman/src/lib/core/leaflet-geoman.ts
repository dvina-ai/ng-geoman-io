import * as L from 'leaflet';

declare module 'leaflet' {
	namespace GeomanEvents {
		/** Fired when Drawing Mode is toggled. */
		interface GlobalDrawModeToggledEvent {
			enabled: boolean;
			shape: PM.SUPPORTED_SHAPES;
			map: L.Map;
		}

		/** Called when drawing mode is enabled. Payload includes the shape type and working layer. */
		interface DrawStartEvent {
			shape: PM.SUPPORTED_SHAPES;
			workingLayer: L.Layer;
		}

		/** Called when drawing mode is disabled. Payload includes the shape type. */
		interface DrawEndEvent {
			shape: PM.SUPPORTED_SHAPES;
		}

		/** Called when drawing mode is disabled. Payload includes the shape type. */
		interface CreateEvent {
			shape: PM.SUPPORTED_SHAPES;
			layer: L.Layer;
		}

		/**
		 * DRAW MODE LAYER EVENT HANDLERS
		 */

		/** Called when a new vertex is added. */
		interface VertexAddedEvent {
			layer?: L.Layer;
			workingLayer?: L.Layer;
			indexPath?: number;
			latlng: L.LatLng;
			marker: L.Marker;
			shape: PM.SUPPORTED_SHAPES;
		}

		/** Fired during a marker move/drag. */
		interface SnapEvent {
			shape: PM.SUPPORTED_SHAPES;
			distance: number;
			layer: L.Layer;
			workingLayer: L.Layer;
			marker: L.Marker;
			layerInteractedWith: L.Layer;
			segement: any;
			snapLatLng: L.LatLng;
		}

		/** Called when the center of a circle is placed/moved. */
		interface CenterPlacedEvent {
			shape: PM.SUPPORTED_SHAPES;
			workingLayer: L.Layer;
			latlng: L.LatLng;
		}

		/**
		 * EDIT MODE LAYER EVENT HANDLERS
		 */

		/** Fired when a layer is edited. */
		interface EditEvent {
			shape: PM.SUPPORTED_SHAPES;
			layer: L.Layer;
		}

		/** Fired when edit mode is disabled and a layer is edited and its coordinates have changed. */
		interface UpdateEvent {
			shape: PM.SUPPORTED_SHAPES;
			layer: L.Layer;
		}

		/** Fired when edit mode on a layer is enabled. */
		interface EditEnableEvent {
			shape: PM.SUPPORTED_SHAPES;
			layer: L.Layer;
		}

		/** Fired when edit mode on a layer is disabled. */
		interface EditDisableEvent {
			shape: PM.SUPPORTED_SHAPES;
			layer: L.Layer;
		}

		/** Fired when a vertex is removed. */
		interface VertexRemovedEvent {
			layer: L.Layer;
			indexPath: number;
			marker: L.Marker;
			shape: PM.SUPPORTED_SHAPES;
		}

		/** Fired when a vertex is clicked. */
		interface VertexClickEvent {
			layer: L.Layer;
			indexPath: number;
			markerEvent: any;
			shape: PM.SUPPORTED_SHAPES;
		}

		/** Fired when dragging of a marker which corresponds to a vertex starts. */
		interface MarkerDragStartEvent {
			layer: L.Layer;
			indexPath: number;
			markerEvent: any;
			shape: PM.SUPPORTED_SHAPES;
		}

		/** Fired when dragging a vertex-marker. */
		interface MarkerDragEvent {
			layer: L.Layer;
			indexPath: number;
			markerEvent: any;
			shape: PM.SUPPORTED_SHAPES;
		}

		/** Fired when dragging of a vertex-marker ends. */
		interface MarkerDragEndEvent {
			layer: L.Layer;
			indexPath: number;
			markerEvent: any;
			shape: PM.SUPPORTED_SHAPES;
			intersectionRest: boolean;
		}

		/** Fired when coords of a layer are reset. E.g. by self-intersection.. */
		interface LayerResetEvent {
			layer: L.Layer;
			indexPath: number;
			markerEvent: any;
			shape: PM.SUPPORTED_SHAPES;
		}

		/** When allowSelfIntersection: false, this event is fired as soon as a self-intersection is detected. */
		interface IntersectEvent {
			shape: PM.SUPPORTED_SHAPES;
			layer: L.Layer;
			intersection: L.LatLng;
		}

		/** Fired coordinates of the layer changed. */
		interface ChangeEvent {
			shape: PM.SUPPORTED_SHAPES;
			layer: L.Layer;
			latlngs: L.LatLng | L.LatLng[];
		}

		/** Fired when the text of a layer is changed. */
		interface TextChangeEvent {
			shape: PM.SUPPORTED_SHAPES;
			layer: L.Layer;
			text: string;
		}

		/** Fired when the text layer is focused. */
		interface TextFocusEvent {
			shape: PM.SUPPORTED_SHAPES;
			layer: L.Layer;
		}

		/** Fired when the text layer is blurred.  */
		interface TextBlurEvent {
			shape: PM.SUPPORTED_SHAPES;
			layer: L.Layer;
		}

		/**
		 * EDIT MODE MAP EVENT HANDLERS
		 */
		/** Fired when Edit Mode is toggled. */
		interface GlobalEditModeToggledEvent {
			enabled: boolean;
			map: L.Map;
		}

		/**
		 * DRAG MODE MAP EVENT HANDLERS
		 */
		/** Fired when Drag Mode is toggled. */
		interface GlobalDragModeToggledEvent {
			enabled: boolean;
			map: L.Map;
		}

		/**
		 * DRAG MODE LAYER EVENT HANDLERS
		 */
		/** Fired when a layer starts being dragged. */
		interface DragStartEvent {
			layer: L.Layer;
			shape: PM.SUPPORTED_SHAPES;
		}

		/** Fired when a layer is dragged. */
		interface DragEvent {
			layer: L.Layer;
			containerPoint: any;
			latlng: L.LatLng;
			layerPoint: L.Point;
			originalEvent: any;
			shape: PM.SUPPORTED_SHAPES;
		}

		/** Fired when a layer stops being dragged. */
		interface DragEndEvent {
			layer: L.Layer;
			shape: PM.SUPPORTED_SHAPES;
		}

		/** Fired when drag mode on a layer is enabled. */
		interface DragEnableEvent {
			layer: L.Layer;
			shape: PM.SUPPORTED_SHAPES;
		}

		/** Fired when drag mode on a layer is disabled. */
		interface DragDisableEvent {
			layer: L.Layer;
			shape: PM.SUPPORTED_SHAPES;
		}

		/**
		 * REMOVE MODE LAYER EVENT HANDLERS
		 */
		/** Fired when a layer is removed via Removal Mode. */
		interface RemoveEvent {
			layer: L.Layer;
			shape: PM.SUPPORTED_SHAPES;
		}

		/**
		 * REMOVE MODE MAP EVENT HANDLERS
		 */
		/** Fired when Removal Mode is toggled. */
		interface GlobalRemovalModeToggledEvent {
			enabled: boolean;
			map: L.Map;
		}

		/**
		 * CUT MODE MAP EVENT HANDLERS
		 */
		/** Fired when a layer is removed via Removal Mode. */
		interface GlobalCutModeToggledEvent {
			enabled: boolean;
			map: L.Map;
		}
		/** Fired when the layer being cut. Draw+Edit Mode*/
		interface CutEvent {
			layer: L.Layer;
			originalLayer: L.Layer;
			shape: PM.SUPPORTED_SHAPES;
		}

		/**
		 * ROTATE MODE LAYER EVENT HANDLERS
		 */

		/** Fired when rotation is enabled for a layer. */
		interface RotateEnableEvent {
			layer: L.Layer;
			helpLayer: L.Layer;
			shape: PM.SUPPORTED_SHAPES;
		}

		/** Fired when rotation is disabled for a layer. */
		interface RotateDisableEvent {
			layer: L.Layer;
			shape: PM.SUPPORTED_SHAPES;
		}

		/** Fired when rotation starts on a layer. */
		interface RotateStartEvent {
			layer: L.Layer;
			helpLayer: L.Layer;
			startAngle: number;
			originLatLngs: L.LatLng[];
		}

		/** Fired when a layer is rotated. */
		interface RotateEvent {
			layer: L.Layer;
			helpLayer: L.Layer;
			startAngle: number;
			angle: number;
			angleDiff: number;
			oldLatLngs: L.LatLng[];
			newLatLngs: L.LatLng[];
		}

		/** Fired when rotation ends on a layer. */
		interface RotateEndEvent {
			layer: L.Layer;
			helpLayer: L.Layer;
			startAngle: number;
			angle: number;
			originLatLngs: L.LatLng[];
			newLatLngs: L.LatLng[];
		}

		/**
		 * ROTATE MODE MAP EVENT HANDLERS
		 */
		/** Fired when Rotate Mode is toggled. */
		interface GlobalRotateModeToggledEvent {
			enabled: boolean;
			map: L.Map;
		}

		/**
		 * TRANSLATION EVENT HANDLERS
		 */
		/** Standard Leaflet event. Fired when any layer is removed. */
		interface LangChangeEvent {
			activeLang: string;
			oldLang: string;
			fallback: string;
			translations: PM.Translations;
		}

		/**
		 * CONTROL MAP EVENT HANDLERS
		 */
		/** Fired when a Toolbar button is clicked. */
		interface ButtonClickEvent {
			btnName: string;
			button: PM.Button;
		}
		/** Fired when a Toolbar action is clicked. */
		interface ActionClickEvent {
			text: string;
			action: string;
			btnName: string;
			button: PM.Button;
		}

		/**
		 * KEYBOARD EVENT HANDLERS
		 */
		/** Fired when `keydown` or `keyup` on the document is fired. */
		interface KeyboardKeyEvent {
			focusOn: 'document' | 'map';
			eventType: 'keydown' | 'keyup';
			event: any;
		}
	}
}

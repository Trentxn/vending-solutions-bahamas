/* The hero photo is served from public/ rather than imported, so index.html can
   preload it and the browser paints it before the JS bundle arrives. BASE_URL
   keeps it correct under the GitHub Pages subpath. */
export const LOCATION_PHOTO = `${import.meta.env.BASE_URL}media/machines-on-location.jpg`

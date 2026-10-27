/**
 * Runs before first paint. The system preference is handled in CSS; this only
 * applies a stored explicit choice so the page never flashes the wrong theme.
 * It also points the browser's theme-color at an explicit choice, and exposes
 * that sync for the toggle.
 */
const script = `(function(){
var C={light:"#f4ecdd",dark:"#141b17"},d=document.documentElement;
function sync(){var t=d.dataset.theme;document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){
if(m.dataset.media===undefined){m.dataset.media=m.getAttribute("media")||"";m.dataset.color=m.content}
if(t){m.removeAttribute("media");m.content=C[t]}else{if(m.dataset.media)m.setAttribute("media",m.dataset.media);m.content=m.dataset.color}})}
window.__syncThemeColor=sync;
try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}
sync();document.addEventListener("DOMContentLoaded",sync);
})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

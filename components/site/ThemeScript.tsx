/**
 * Runs before first paint. The system preference is handled in CSS; this only applies a stored
 * explicit choice so the page never flashes the wrong theme. It also points the browser's
 * theme-color and the night screenshots (<source data-night>, see NightSource) at an explicit
 * choice, and exposes that sync for the toggle. React re-inserts the theme-color metas and
 * client navigations insert new screenshots, so a MutationObserver re-syncs after every
 * insertion; sync only writes attributes, so it never triggers itself.
 */
const script = `(function(){
var C={light:"#f9ebd7",dark:"#031211"},d=document.documentElement;
function sync(){var t=d.dataset.theme;
document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){
if(m.dataset.media===undefined){m.dataset.media=m.getAttribute("media")||"";m.dataset.color=m.content}
if(t){m.removeAttribute("media");if(m.content!==C[t])m.content=C[t]}else{if(m.dataset.media)m.setAttribute("media",m.dataset.media);if(m.content!==m.dataset.color)m.content=m.dataset.color}});
document.querySelectorAll("source[data-night]").forEach(function(s){
if(s.dataset.media===undefined)s.dataset.media=s.media;var q=t?(t==="dark"?"all":"not all"):s.dataset.media;if(s.media!==q)s.media=q})}
window.__syncTheme=sync;
try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}
sync();document.addEventListener("DOMContentLoaded",sync);
new MutationObserver(sync).observe(d,{childList:true,subtree:true});
})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

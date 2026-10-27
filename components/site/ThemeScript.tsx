/**
 * Runs before first paint. The system preference is handled in CSS; this only
 * applies a stored explicit choice so the page never flashes the wrong theme.
 */
const script = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

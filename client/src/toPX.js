export default function toPX(value) {
  return (
    (parseFloat(value) / 100)
      * (/vh/gi.test(value) ? window.innerHeight : window.innerWidth)
  );
}

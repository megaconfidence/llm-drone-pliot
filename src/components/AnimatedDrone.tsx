/**
 * Photo-real top-down drone built from the real Tello photo (public/drone/).
 * The static body (cut out, open-frame trusses) is one layer; each rotor
 * (blades + hub ring) is a separate sprite that spins as a whole unit.
 * Geometry values come from the asset pipeline's meta.json.
 */

const ASPECT = 1840 / 1920; // body image height / width
const SIZE_FRAC = 0.5917; // rotor sprite width as a fraction of body width

// hub centers (fraction of body w/h) + spin direction (diagonal pairs match)
const ROTORS = [
  { file: "prop1.png", cx: 0.1917, cy: 0.2043, dir: "cw" },
  { file: "prop2.png", cx: 0.8078, cy: 0.2043, dir: "ccw" },
  { file: "prop3.png", cx: 0.1932, cy: 0.7929, dir: "ccw" },
  { file: "prop4.png", cx: 0.8068, cy: 0.7929, dir: "cw" },
] as const;

export function AnimatedDrone({
  width = 280,
  spinning = true,
  base = "/drone",
}: {
  width?: number;
  spinning?: boolean;
  base?: string;
}) {
  const height = width * ASPECT;
  const sprite = width * SIZE_FRAC;

  return (
    <div style={{ width, height, position: "relative" }}>
      <img
        src={`${base}/body.png`}
        alt="drone"
        draggable={false}
        style={{ width, height, display: "block", userSelect: "none" }}
      />
      {ROTORS.map((r, i) => (
        <img
          key={i}
          src={`${base}/${r.file}`}
          alt=""
          aria-hidden
          draggable={false}
          className={
            spinning ? (r.dir === "cw" ? "animate-rotor-cw" : "animate-rotor-ccw") : ""
          }
          style={{
            position: "absolute",
            width: sprite,
            height: sprite,
            left: r.cx * width,
            top: r.cy * height,
            transform: "translate(-50%, -50%)",
            transformOrigin: "center",
            willChange: spinning ? "transform" : undefined,
            filter: spinning ? "blur(0.4px)" : undefined,
            userSelect: "none",
          }}
        />
      ))}
    </div>
  );
}

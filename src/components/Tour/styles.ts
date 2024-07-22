export const styles = {
  maskWrapper: (base: any) => ({
    ...base,
    position: "fixed",

  }),
  highlightedArea: (base: any, { x, y }: any) => ({
    ...base,
    x: x + 10,
    y: y + 10,
    innerWidth: '200px',
    outerWidth: '100px',
    width: "100px"

  }),

  badge: (base: any) => ({ ...base, color: 'white', backgroundColor: '#58E79A' }),

  close: (base: any) => ({
    ...base,
    right: "8px",
    top: "8px"
  }),
}
export const mobiStyles = {
  maskWrapper: (base: any) => ({
    ...base,
    position: "fixed",

  }),
  popover: (base: any) => ({
    ...base,
    maxWidth: '230px',
    left: '20px'
  }),
  badge: (base: any) => ({ ...base, color: 'white', backgroundColor: '#58E79A' }),

  close: (base: any) => ({
    ...base,
    right: "8px",
    top: "8px"
  }),
}
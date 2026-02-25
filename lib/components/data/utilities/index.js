const PRECISION_BY_UNIT = Object.freeze({
  m: 3,
  ft: 2,
  in: 2,
  cms: 2,
  irrad: 1,
  "%": 1,
  "langley/min": 1,
  mph: 1,
  kph: 1,
  f: 1,
  c: 1,
  deg: 1,
  volt: 1,
  cfs: 0,
  "ac-ft": 0,
  m3: 0,
});

const DEFAULT_PRECISION = 2;

function getPrecision(units) {
  const unit = units?.toLowerCase();
  if (!unit) return DEFAULT_PRECISION;
  return Object.prototype.hasOwnProperty.call(PRECISION_BY_UNIT, unit)
    ? PRECISION_BY_UNIT[unit]
    : DEFAULT_PRECISION;
}

export { getPrecision, PRECISION_BY_UNIT, DEFAULT_PRECISION };

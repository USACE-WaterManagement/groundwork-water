/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DatumsHorizontal {
  value?: GaugeDatumsValue[];
}

export interface DatumsNotes {
  value?: string[];
}

export interface DatumsVertical {
  value?: GaugeDatumsValue[];
}

export interface FloodCategories {
  major?: FloodCategoriesDatum;
  moderate?: FloodCategoriesDatum;
  minor?: FloodCategoriesDatum;
  action?: FloodCategoriesDatum;
}

export interface FloodCategoriesDatum {
  /** @format double */
  stage?: number;
  /** @format double */
  flow?: number;
}

export interface FloodCrests {
  historic?: FloodCrestsDatum[];
  recent?: FloodCrestsDatum[];
}

export interface FloodCrestsDatum {
  /** @format date-time */
  occurredTime?: string;
  /** @format double */
  stage?: number;
  /** @format double */
  flow?: number;
  preliminary?: string;
  olddatum?: boolean;
}

export interface FloodImpact {
  /** @format double */
  stage?: number;
  statement?: string;
}

export interface FloodLowWaters {
  historic?: FloodLowWatersDatum[];
}

export interface FloodLowWatersDatum {
  /** @format date-time */
  occurredTime?: string;
  /** @format double */
  stage?: number;
  /** @format double */
  flow?: number;
  statement?: string;
}

export interface GaugeInService {
  enabled?: boolean;
  message?: string;
}

export interface GaugeLowThreshold {
  units?: string;
  /** @format double */
  value?: number;
}

/** The River Forecast Center identifier. */
export interface GaugeRFC {
  abbreviation?: string;
  name?: string;
}

/** The U.S. state or territory. */
export interface GaugeSTATE {
  abbreviation?: string;
  name?: string;
}

export interface GaugeStatusForecast {
  /** @format double */
  primary?: number;
  primaryUnit?: string;
  /** @format double */
  secondary?: number;
  secondaryUnit?: string;
  floodCategory?: string;
  /** @format date-time */
  validTime?: string;
}

export interface GaugeStatusObserved {
  /** @format double */
  primary?: number;
  primaryUnit?: string;
  /** @format double */
  secondary?: number;
  secondaryUnit?: string;
  floodCategory?: string;
  /** @format date-time */
  validTime?: string;
}

/** The Weather Forecast Office identifier. */
export interface GaugeWFO {
  abbreviation?: string;
  name?: string;
}

export interface ImagesHydrograph {
  default?: string;
  floodcat?: string;
}

export interface ImagesProbability {
  weekint?: ProbabilityWeekint;
  entperiod?: ProbabilityEntperiod;
  shortrange?: string;
}

export interface ListGaugesRequestBoundingBox {
  /**
   * Bottom-left X coordinate of a bounding box geometry.
   * @format double
   */
  xmin?: number;
  /**
   * Bottom-left Y coordinate of a bounding box geometry.
   * @format double
   */
  ymin?: number;
  /**
   * Top-right X coordinate of a bounding box geometry.
   * @format double
   */
  xmax?: number;
  /**
   * Top-right Y coordinate of a bounding box geometry.
   * @format double
   */
  ymax?: number;
}

/**
 * - SRID_UNSPECIFIED: Not specified.
 *  - EPSG_3857: Web Mercator - Google Maps, Esri (102100), Mapbox, etc.
 *  - EPSG_4326: WGS84 - World Geodetic System 1984, used in GPS
 * @default "SRID_UNSPECIFIED"
 */
export enum ListGaugesRequestSRID {
  SRID_UNSPECIFIED = "SRID_UNSPECIFIED",
  EPSG3857 = "EPSG_3857",
  EPSG4326 = "EPSG_4326",
}

export interface ProbabilityEntperiod {
  stage?: string;
  flow?: string;
  volume?: string;
}

export interface ProbabilityWeekint {
  stage?: string;
  flow?: string;
  volume?: string;
}

export interface RatingsRating {
  /** @format double */
  stage?: number;
  /** @format double */
  flow?: number;
}

export interface ReachRouteReachSegment {
  reachId?: string;
  /** @format int64 */
  streamOrder?: string;
}

export interface GaugeDataAttribution {
  abbrev?: string;
  text?: string;
  title?: string;
  url?: string;
}

/** Specifies the contents of a single reported data point. */
export interface GaugeDatum {
  /**
   * The date/time when the observation was made or when the forecast will be
   * valid.
   * @format date-time
   */
  validTime?: string;
  /**
   * The date/time when the product was generated.
   * @format date-time
   */
  generatedTime?: string;
  /**
   * The primary value reported at the gauge.
   * @format double
   */
  primary?: number;
  /**
   * The secondary value reported at the gauge.
   * @format double
   */
  secondary?: number;
}

export interface GaugeDatums {
  vertical?: DatumsVertical;
  horizontal?: DatumsHorizontal;
  notes?: DatumsNotes;
}

export interface GaugeDatumsValue {
  label?: string;
  abbrev?: string;
  description?: string;
  /** @format double */
  value?: number;
}

export interface GaugeDownloads {
  depthGrids?: string;
  images?: string;
  kmz?: string;
}

export interface GaugeFlood {
  stageUnits?: string;
  flowUnits?: string;
  categories?: FloodCategories;
  lro?: GaugeLRO;
  crests?: FloodCrests;
  lowWaters?: FloodLowWaters;
  impacts?: FloodImpact[];
}

/** Represents a single gauge's metadata. */
export interface GaugeGauge {
  /** The gauges's unique identifier. Example: ANAW1. */
  lid?: string;
  /** The gauges's USGS ID. Example: 13334300. */
  usgsId?: string;
  /** The NWM Reach ID. */
  reachId?: string;
  /** The name of the gauge. Example: Anatone. */
  name?: string;
  /** The gauge description. Example: Snake River near Anatone. */
  description?: string;
  /** The River Forecast Center identifier. */
  rfc?: GaugeRFC;
  /** The Weather Forecast Office identifier. */
  wfo?: GaugeWFO;
  /** The U.S. state or territory. */
  state?: GaugeSTATE;
  /** The county. */
  county?: string;
  /** The local time zone. */
  timeZone?: string;
  /** @format double */
  latitude?: number;
  /** @format double */
  longitude?: number;
  datum?: GaugeGaugeDatum;
  pedts?: GaugeGaugePEDTS;
  status?: GaugeGaugeStatus;
  flood?: GaugeFlood;
  images?: GaugeImages;
  dataAttribution?: GaugeDataAttribution[];
  impactsLowWaters?: GaugeImpactsLowWaters[];
  normalThreshold?: GaugeNormalThreshold;
  hydronotes?: GaugeHydronotes[];
  datums?: GaugeDatums;
  inundation?: GaugeInundation;
  /** The upstream lid */
  upstreamLid?: string;
  /** The downstream lid */
  downstreamLid?: string;
  inService?: GaugeInService;
  lowThreshold?: GaugeLowThreshold;
  forecastReliability?: string;
  /** @format int64 */
  TruncateObs?: string;
  /** @format int64 */
  TruncateFcst?: string;
}

export interface GaugeGaugeDatum {
  /** @format double */
  elevation?: number;
}

export interface GaugeGaugePEDTS {
  observed?: string;
  forecast?: string;
}

export interface GaugeGaugePhotoOut {
  id?: string;
  type?: string;
  geometry?: GaugeGaugePhotoOutGeometry;
  properties?: GaugeGaugePhotoOutProperties;
}

export interface GaugeGaugePhotoOutGeometry {
  type?: string;
  coordinates?: number[];
}

export interface GaugeGaugePhotoOutProperties {
  image?: string;
  caption?: string;
}

export interface GaugeGaugeStatus {
  observed?: GaugeStatusObserved;
  forecast?: GaugeStatusForecast;
}

export interface GaugeGetStageFlowAllResponse {
  observed?: GaugeStageFlow;
  forecast?: GaugeStageFlow;
}

export interface GaugeHydronotes {
  statement?: string;
  effective?: string;
  expiration?: string;
}

export interface GaugeImages {
  probability?: ImagesProbability;
  hydrograph?: ImagesHydrograph;
  photos?: GaugeGaugePhotoOut[];
}

export interface GaugeImpactsLowWaters {
  value?: string;
  impact?: string;
}

export interface GaugeInundation {
  enabled?: boolean;
  url?: string;
  zeroDatum?: GaugeZeroDatum;
  downloads?: GaugeDownloads;
  siteSpecificInfo?: string;
  dataAttribution?: GaugeInundationDataAttribution[];
}

export interface GaugeInundationDataAttribution {
  text?: string;
  title?: string;
  url?: string;
  image?: string;
}

export interface GaugeLRO {
  minorCS?: string;
  moderateCS?: string;
  majorCS?: string;
  /** @format date-time */
  producedTime?: string;
  interval?: string;
}

export interface GaugeListGaugesResponse {
  gauges?: GaugeListGaugesResponseGauge[];
}

export interface GaugeListGaugesResponseGauge {
  /** The gauges's unique identifier */
  lid?: string;
  /** @format double */
  latitude?: number;
  /** @format double */
  longitude?: number;
  status?: GaugeGaugeStatus;
  pedts?: GaugePEDTS;
}

export interface GaugeNormalThreshold {
  /** @format double */
  value?: number;
  units?: string;
}

export interface GaugePEDTS {
  observed?: string;
  forecast?: string;
}

export interface GaugeRatings {
  stageUnits?: string;
  flowUnits?: string;
  data?: RatingsRating[];
}

export interface GaugeStageFlow {
  /** The Standard Hydrometeorological Exchange Format parameter codes for the product. */
  pedts?: string;
  /**
   * The date/time the product is issued. Does not to apply to observed data.
   * @format date-time
   */
  issuedTime?: string;
  /** The Weather Forecast Office identifier. */
  wfo?: string;
  /** The local time zone. */
  timeZone?: string;
  primaryName?: string;
  primaryUnits?: string;
  secondaryName?: string;
  secondaryUnits?: string;
  data?: GaugeDatum[];
}

/** @default "observed" */
export enum GaugeStageFlowType {
  Observed = "observed",
  Forecast = "forecast",
}

export interface GaugeZeroDatum {
  /** @format double */
  value?: number;
  datum?: string;
}

/** @default "analysis_assimilation" */
export enum ReachForecastSeries {
  AnalysisAssimilation = "analysis_assimilation",
  ShortRange = "short_range",
  MediumRange = "medium_range",
  LongRange = "long_range",
  MediumRangeBlend = "medium_range_blend",
}

export interface ReachGetStreamflowResponse {
  /** Represents a single reach's metadata. */
  reach?: ReachReach;
  analysisAssimilation?: Record<string, ReachStreamflow>;
  shortRange?: Record<string, ReachStreamflow>;
  mediumRange?: Record<string, ReachStreamflow>;
  longRange?: Record<string, ReachStreamflow>;
  mediumRangeBlend?: Record<string, ReachStreamflow>;
}

/** Represents a single reach's metadata. */
export interface ReachReach {
  /** The reach's unique Reach ID. */
  reachId?: string;
  /** The name of the reach. */
  name?: string;
  /** @format double */
  latitude?: number;
  /** @format double */
  longitude?: number;
  streamflow?: ReachForecastSeries[];
  route?: ReachReachRoute;
}

export interface ReachReachRoute {
  upstream?: ReachRouteReachSegment[];
  downstream?: ReachRouteReachSegment[];
}

export interface ReachStreamflow {
  /** @format date-time */
  referenceTime?: string;
  units?: string;
  data?: ReachStreamflowDatum[];
}

export interface ReachStreamflowDatum {
  /** @format date-time */
  validTime?: string;
  /** @format double */
  flow?: number;
}

export interface Country {
  name:         Name;
  tld:          string[];
  cca2:         string;
  ccn3:         string;
  cca3:         string;
  cioc:         string;
  independent:  boolean;
  status:       string;
  unMember:     boolean;
  currencies:   Currencies;
  idd:          Idd;
  capital:      string[];
  altSpellings: string[];
  region:       string;
  subregion:    string;
  languages:    Languages;
  translations: { [key: string]: Translation };
  latlng:       number[];
  landlocked:   boolean;
  borders:      string[];
  area:         number;
  demonyms:     Demonyms;
  flag:         string;
  maps:         Maps;
  population:   number;
  gini:         Gini;
  fifa:         string;
  car:          Car;
  timezones:    string[];
  continents:   string[];
  flags:        CoatOfArms;
  coatOfArms:   CoatOfArms;
  startOfWeek:  string;
  capitalInfo:  CapitalInfo;
  postalCode:   PostalCode;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Car {
  signs: string[];
  side:  string;
}

export interface CoatOfArms {
  png: string;
  svg: string;
}

export interface Currencies {
  PEN: Pen;
}

export interface Pen {
  name:   string;
  symbol: string;
}

export interface Demonyms {
  eng: Eng;
  fra: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Gini {
  "2019": number;
}

export interface Idd {
  root:     string;
  suffixes: string[];
}

export interface Languages {
  aym: string;
  que: string;
  spa: string;
}

export interface Maps {
  googleMaps:     string;
  openStreetMaps: string;
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: NativeName;
}

export interface NativeName {
  aym: Translation;
  que: Translation;
  spa: Translation;
}

export interface Translation {
  official: string;
  common:   string;
}

export interface PostalCode {
  format: string;
  regex:  string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toWelcome(json: string): Country[] {
    return cast(JSON.parse(json), a(r("Welcome")));
  }

  public static welcomeToJson(value: Country[]): string {
    return JSON.stringify(uncast(value, a(r("Welcome"))), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
  }
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue("array", val);
    return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue("Date", val);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue("object", val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach(key => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === "object" && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  "Welcome": o([
    { json: "name", js: "name", typ: r("Name") },
    { json: "tld", js: "tld", typ: a("") },
    { json: "cca2", js: "cca2", typ: "" },
    { json: "ccn3", js: "ccn3", typ: "" },
    { json: "cca3", js: "cca3", typ: "" },
    { json: "cioc", js: "cioc", typ: "" },
    { json: "independent", js: "independent", typ: true },
    { json: "status", js: "status", typ: "" },
    { json: "unMember", js: "unMember", typ: true },
    { json: "currencies", js: "currencies", typ: r("Currencies") },
    { json: "idd", js: "idd", typ: r("Idd") },
    { json: "capital", js: "capital", typ: a("") },
    { json: "altSpellings", js: "altSpellings", typ: a("") },
    { json: "region", js: "region", typ: "" },
    { json: "subregion", js: "subregion", typ: "" },
    { json: "languages", js: "languages", typ: r("Languages") },
    { json: "translations", js: "translations", typ: m(r("Translation")) },
    { json: "latlng", js: "latlng", typ: a(0) },
    { json: "landlocked", js: "landlocked", typ: true },
    { json: "borders", js: "borders", typ: a("") },
    { json: "area", js: "area", typ: 0 },
    { json: "demonyms", js: "demonyms", typ: r("Demonyms") },
    { json: "flag", js: "flag", typ: "" },
    { json: "maps", js: "maps", typ: r("Maps") },
    { json: "population", js: "population", typ: 0 },
    { json: "gini", js: "gini", typ: r("Gini") },
    { json: "fifa", js: "fifa", typ: "" },
    { json: "car", js: "car", typ: r("Car") },
    { json: "timezones", js: "timezones", typ: a("") },
    { json: "continents", js: "continents", typ: a("") },
    { json: "flags", js: "flags", typ: r("CoatOfArms") },
    { json: "coatOfArms", js: "coatOfArms", typ: r("CoatOfArms") },
    { json: "startOfWeek", js: "startOfWeek", typ: "" },
    { json: "capitalInfo", js: "capitalInfo", typ: r("CapitalInfo") },
    { json: "postalCode", js: "postalCode", typ: r("PostalCode") },
  ], false),
  "CapitalInfo": o([
    { json: "latlng", js: "latlng", typ: a(3.14) },
  ], false),
  "Car": o([
    { json: "signs", js: "signs", typ: a("") },
    { json: "side", js: "side", typ: "" },
  ], false),
  "CoatOfArms": o([
    { json: "png", js: "png", typ: "" },
    { json: "svg", js: "svg", typ: "" },
  ], false),
  "Currencies": o([
    { json: "PEN", js: "PEN", typ: r("Pen") },
  ], false),
  "Pen": o([
    { json: "name", js: "name", typ: "" },
    { json: "symbol", js: "symbol", typ: "" },
  ], false),
  "Demonyms": o([
    { json: "eng", js: "eng", typ: r("Eng") },
    { json: "fra", js: "fra", typ: r("Eng") },
  ], false),
  "Eng": o([
    { json: "f", js: "f", typ: "" },
    { json: "m", js: "m", typ: "" },
  ], false),
  "Gini": o([
    { json: "2019", js: "2019", typ: 3.14 },
  ], false),
  "Idd": o([
    { json: "root", js: "root", typ: "" },
    { json: "suffixes", js: "suffixes", typ: a("") },
  ], false),
  "Languages": o([
    { json: "aym", js: "aym", typ: "" },
    { json: "que", js: "que", typ: "" },
    { json: "spa", js: "spa", typ: "" },
  ], false),
  "Maps": o([
    { json: "googleMaps", js: "googleMaps", typ: "" },
    { json: "openStreetMaps", js: "openStreetMaps", typ: "" },
  ], false),
  "Name": o([
    { json: "common", js: "common", typ: "" },
    { json: "official", js: "official", typ: "" },
    { json: "nativeName", js: "nativeName", typ: r("NativeName") },
  ], false),
  "NativeName": o([
    { json: "aym", js: "aym", typ: r("Translation") },
    { json: "que", js: "que", typ: r("Translation") },
    { json: "spa", js: "spa", typ: r("Translation") },
  ], false),
  "Translation": o([
    { json: "official", js: "official", typ: "" },
    { json: "common", js: "common", typ: "" },
  ], false),
  "PostalCode": o([
    { json: "format", js: "format", typ: "" },
    { json: "regex", js: "regex", typ: "" },
  ], false),
};

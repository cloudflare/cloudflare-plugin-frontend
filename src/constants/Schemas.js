import { normalize, Schema, arrayOf } from 'normalizr';

const zoneSchema = new Schema('zones', { idAttribute: 'name' });
const zoneEntitlementsSchema = new Schema('entitlements', {
  idAttribute: 'id'
});

export function normalizeZoneByIdGetAll(zoneId, result) {
  var zoneSchemaById = new Schema(zoneId, { idAttribute: 'id' });
  return normalize(result, arrayOf(zoneSchemaById));
}

export function normalizeZoneGetAll(result) {
  return normalize(result, arrayOf(zoneSchema));
}

export function normalizeZoneEntitlements(result) {
  return normalize(result, arrayOf(zoneEntitlementsSchema));
}

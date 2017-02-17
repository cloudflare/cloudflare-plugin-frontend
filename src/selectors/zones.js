export function getZonePlanLegacyId(zoneName, zones) {
    return zones.entities.zones[zoneName].plan.legacy_id;
}
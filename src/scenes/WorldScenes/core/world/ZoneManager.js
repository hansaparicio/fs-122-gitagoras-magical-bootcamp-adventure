export default class ZoneManager {
  constructor(zones = []) {
    this.zones = zones;
    this.activeZone = null;
  }

  update(playerFeetX, playerFeetY) {
    const foundZone =
      this.zones.find(zone =>
        zone.containsPoint(playerFeetX, playerFeetY)
      ) || null;

    if (foundZone === this.activeZone) {
      return null;
    }

    const transition = {
      entered: foundZone,
      exited: this.activeZone
    };

    this.activeZone = foundZone;
    return transition;
  }
}

function locationObject (location, lat, long, videoTags, stateName) {
    this.id = location;
    this.location_name = location;
    this.geo_location = lat + ',' + long;
    this.video_id = videoTags;
    this.state_name = stateName;
}

module.exports = locationObject;

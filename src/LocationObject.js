
function locationObject (location, lat, long, videoTags) {
    this.id = location;
    this.location_name = location;
    this.geo_location = lat + ',' + long;
    this.video_id = videoTags;
}

module.exports = locationObject;

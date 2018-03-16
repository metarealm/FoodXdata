
function locationObject (location, lat, long, videoTags) {
    this.location_name = location;
    this.geo_location = lat + ',' + long;
    this.video_id = videoTags;
}

module.exports = locationObject;

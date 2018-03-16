
function SolrObject (eTag, Id, cID, crTitle, desc, likes, title, vTag, views, ytID) {
    this.Food_Type_Speciality = 'regular';
    this.etag = eTag;
    this.id = Id;
    this.channelID = cID;
    this.channeltitle = crTitle;
    this.description = desc;
    this.likes = likes;
    this.recipeTitle = title;
    this.vedioTag = vTag;
    this.views = views;
    this.youtubevideoID = ytID;
    this.video_country = title + desc + vTag;
    this.video_state = title + desc + vTag;
    this.video_location = title + desc + vTag;
}

module.exports = SolrObject;

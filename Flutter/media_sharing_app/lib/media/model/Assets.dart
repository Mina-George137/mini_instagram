class Assets {
  Assets({
      this.id, 
      this.userId, 
      this.cloudID, 
      this.type, 
      this.format, 
      this.originalName, 
      this.filePath, 
      this.likes, 
      this.createdAt, 
      this.updatedAt, 
      this.v,});

  Assets.fromJson(dynamic json) {
    id = json['_id'];
    userId = json['userId'];
    cloudID = json['cloudID'];
    type = json['type'];
    format = json['format'];
    originalName = json['originalName'];
    filePath = json['filePath'];
    likes = json['likes'] != null ? json['likes'].cast<String>() : [];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    v = json['__v'];
  }
  String? id;
  String? userId;
  String? cloudID;
  String? type;
  String? format;
  String? originalName;
  String? filePath;
  List<String>? likes;
  String? createdAt;
  String? updatedAt;
  int? v;

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{};
    map['_id'] = id;
    map['userId'] = userId;
    map['cloudID'] = cloudID;
    map['type'] = type;
    map['format'] = format;
    map['originalName'] = originalName;
    map['filePath'] = filePath;
    map['likes'] = likes;
    map['createdAt'] = createdAt;
    map['updatedAt'] = updatedAt;
    map['__v'] = v;
    return map;
  }

}
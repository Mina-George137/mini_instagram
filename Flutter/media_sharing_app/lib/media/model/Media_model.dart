import 'Data.dart';

class MediaModel {
  MediaModel({
    this.message,
    this.data,});

  MediaModel.fromJson(dynamic json) {
    message = json['message'];
    if(message == 'success'){
      data = (json['data'] != null ? Data.fromJson(json['data']) : null)!;
    }else{
      data = null;
    }
  }
  String? message;
  Data? data;

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{};
    map['message'] = message;
    if (data != null) {
      map['data'] = data?.toJson();
    }
    return map;
  }

}
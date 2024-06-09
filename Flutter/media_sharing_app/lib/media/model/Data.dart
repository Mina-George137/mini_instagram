import 'Assets.dart';

class Data {
  Data({
      this.assets,});

  Data.fromJson(dynamic json) {
    if (json['assets'] != null) {
      assets = [];
      json['assets'].forEach((v) {
        assets?.add(Assets.fromJson(v));
      });
    }
  }
  List<Assets>? assets;

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{};
    final assets = this.assets;
    if (assets != null) {
      map['assets'] = assets.map((v) => v.toJson()).toList();
    }
    return map;
  }

}
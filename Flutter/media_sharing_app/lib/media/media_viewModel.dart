import 'package:flutter/material.dart';
import 'package:media_sharing_app/api_manager.dart';
import 'model/Assets.dart';
import 'package:media_sharing_app/notify by toast/notification.dart';

class MediaViewModel extends ChangeNotifier {
  List<Assets> mediaList = [];
  void getMedia() async {
    try {
      var response = await ApiManager.getMedia();
      if (response.message == "fail") {
        mediaList = [];
      } else {
        mediaList = response.data!.assets!;
      }
    } catch (e) {
      rethrow;
    }
    notifyListeners();
  }

  void deleteMedia(id) async {
    try {
      var response = await ApiManager.deleteMedia(id);
      if (response.message == "success") {
        mediaList.removeWhere((asset) => asset.id == id);
      }
    } catch (e) {
      rethrow;
    }
    notifyListeners();
  }

  void uploadMedia(file) async {
    try {
      var response = await ApiManager.uploadMedia(file);
      mediaList.add(response.data!.assets![0]);
      Notify.notifyUser("Uploaded Successfully");
    } catch (err) {
      rethrow;
    }
    notifyListeners();
  }
}

import 'dart:convert';
import 'package:http/http.dart' as http;
import 'media/model/Media_model.dart';
import 'package:dio/dio.dart';

// Basic CRUD Operation
// like and unlike not implemented but simulated in the UI :)
class ApiManager {
  static const String baseURL = "media-sharing-platform.vercel.app";
  static const String token =
      'Bearer 1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmUyODA5OTUyOWU2N2RkMjBkMWRiNCIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTcxMTE1NTIyMiwiZXhwIjoxNzE4OTMxMjIyfQ.7U1KZhmiI9AUyd6DqyKxt75L9BFTnoycC6ymohaX21o';
  static Future<MediaModel> getMedia() async {
    var url = Uri.https(baseURL, "/api/media");
    try {
      var response = await http.get(url);
      var bodyString = response.body; // string must be json
      var json = jsonDecode(bodyString);
      var mediaResponse = MediaModel.fromJson(json);
      return mediaResponse;
    } catch (err) {
      rethrow;
    }
  }

  static Future<MediaModel> deleteMedia(id) async {
    var url = Uri.https(baseURL, "api/media/${id}");
    try {
      var response = await http.delete(url, headers: {
        // we should take the token from cookies but no login now to get token
        'authorization': token
      });
      var bodyString = response.body;
      var json = jsonDecode(bodyString);
      var mediaResponse = MediaModel.fromJson(json);
      return mediaResponse;
    } catch (err) {
      rethrow;
    }
  }

  static Future<MediaModel> uploadMedia(mediaFile) async {
    Dio dio = Dio();
    // Create FormData object
    FormData formData = FormData.fromMap({
      'mediaFile': await MultipartFile.fromFile(
        mediaFile.path,
      ),
    });
    try {
      var url = Uri.https(baseURL, "/api/media/upload");
      Map<String, dynamic> headers = {
        'Authorization': token,
        'Content-Type': 'multipart/form-data',
      };
      var response = (await dio.post('$url',
          data: formData, options: Options(headers: headers)));
      MediaModel mediaModel = MediaModel.fromJson(response.data);
      // Return the MediaModel object
      print(mediaModel.data!.assets?[0]);
      print(mediaModel.message);
      return mediaModel;
    } catch (error) {
      // Handle any errors
      rethrow;
    }
  }
}

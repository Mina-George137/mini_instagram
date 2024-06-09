import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class Notify{

  static void notifyUser(String msg){
    Fluttertoast.showToast(
        msg: msg,
        toastLength: Toast.LENGTH_LONG,
        gravity: ToastGravity.CENTER,
        timeInSecForIosWeb: 1,
        textColor: Colors.white,
        fontSize: 16.0
    );
  }

}
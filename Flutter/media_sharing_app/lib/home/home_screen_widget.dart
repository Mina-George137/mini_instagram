import 'package:flutter/material.dart';
import 'package:media_sharing_app/media/media_player_widget.dart';

class HomeScreenWidget extends StatelessWidget {
  const HomeScreenWidget({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Center(child: MediaPlayerWidget()),
    );
  }
}

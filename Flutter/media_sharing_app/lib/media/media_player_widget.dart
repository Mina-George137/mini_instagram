import 'package:flutter/material.dart';
import 'package:media_sharing_app/media/media_card_widget.dart';
import 'package:media_sharing_app/media/media_viewModel.dart';
import 'package:provider/provider.dart';

class MediaPlayerWidget extends StatefulWidget {
  const MediaPlayerWidget({Key? key}) : super(key: key);

  @override
  State<MediaPlayerWidget> createState() => _MediaPlayerWidgetState();
}

class _MediaPlayerWidgetState extends State<MediaPlayerWidget> {
  MediaViewModel viewModel = MediaViewModel();
  @override
  void initState() {
    super.initState();
    viewModel.getMedia();
  }

  void deleteAsset(String id) {
    viewModel.deleteMedia(id);
  }

  Future refresh() async {
    setState(() {
      viewModel.getMedia();
    });
  }

  @override
  Widget build(BuildContext context) {
    MediaViewModel mediaProvider = Provider.of<MediaViewModel>(context);
    return RefreshIndicator(
      onRefresh: () async {
        setState(() {
          mediaProvider.getMedia();
        });
      },
      child: ChangeNotifierProvider(
        create: (context) => MediaViewModel(),
        child: Consumer<MediaViewModel>(
          // Build a widget tree based on the value from a Provider
          builder: (context, viewModel, _) {
            // ignore: unnecessary_null_comparison
            if (mediaProvider.mediaList == null) {
              return const Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Center(
                    child: CircularProgressIndicator(
                      color: Colors.blue,
                    ),
                  ),
                ],
              );
            } else if (mediaProvider.mediaList.isEmpty) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                      "Error 404: Media not found\n please try again later"),
                  ElevatedButton(
                      onPressed: () {
                        setState(() {
                          mediaProvider.getMedia();
                        });
                      },
                      child: const Text("Try again")),
                ],
              );
            } else {
              return ListView.builder(
                itemBuilder: (context, index) {
                  return MediaCardWidget(
                    asset: mediaProvider.mediaList[index],
                    callback: (id) => mediaProvider
                        .deleteMedia(mediaProvider.mediaList[index].id!),
                  );
                },
                itemCount: mediaProvider.mediaList.length,
              );
            }
          },
        ),
      ),
    );
  }
}

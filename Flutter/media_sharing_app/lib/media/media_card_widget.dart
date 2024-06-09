import 'package:flutter/material.dart';
import 'model/Assets.dart';

class MediaCardWidget extends StatefulWidget {
  Assets asset;
  final void Function(String) callback;  // we need callback function to notify the parent (player) when asset is deleted
  MediaCardWidget({Key? key, required this.asset , required this.callback}) : super(key: key);

  @override
  State<MediaCardWidget> createState() => _MediaCardWidgetState();
}

class _MediaCardWidgetState extends State<MediaCardWidget> {
  bool like = false;
  int likesCount = 0;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    like = false;
    likesCount = widget.asset.likes!.length;
  }

  @override
  Widget build(BuildContext context) {
    // we should search in likes[] to know if the userId exists and initiate like according to it
    // lets for simplicity assume it is false
    // "!"  null assertion operator, converts a nullable type to a non-nullable type.
    //              If the variable is null, it throws a runtime error.
    return Container(
      padding: const EdgeInsets.all(8),
      margin: const EdgeInsets.all(8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Image.network("${widget.asset.filePath}", fit: BoxFit.cover, width: MediaQuery.of(context).size.width),
          Text('$likesCount', style: const TextStyle(fontSize: 20)),
          Row(
            children: [
              IconButton(
                  onPressed: () {
                    setState(() {
                      like = !like;
                      likesCount += like ? 1 : -1;
                    });
                  },
                  icon: Icon(Icons.favorite,
                      color: like ? Colors.red : Colors.grey)),
              IconButton(
                  onPressed: () {
                    widget.callback(widget.asset.id!);
                  },
                  icon: const Icon(Icons.delete))
            ],
          )
        ],
      ),
    );
  }
}

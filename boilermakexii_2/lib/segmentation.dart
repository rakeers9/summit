// import 'dart:nativewrappers/_internal/vm/lib/typed_data_patch.dart';
import 'dart:typed_data';

import 'package:bounding_box_annotation/bounding_box_annotation.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'const.dart';

class SegmentationPage extends StatefulWidget {
  const SegmentationPage({super.key});

  @override
  State<SegmentationPage> createState() => _SegmentationPageState();
}

class _SegmentationPageState extends State<SegmentationPage> {
  String prompt = "Describe the following image";
  final PageController _pageController = PageController();
  final List<String> imageUrls = List.generate(
    10,
        (index) => "https://picsum.photos/600/800?random=$index",
  );
  final List<TextEditingController> _textControllers =
  List.generate(10, (_) => TextEditingController());
  int currentPage = 0;
  final List<String> suggestions = ["Dog", "Cat", "Car", "Tree", "Building"];


  @override
  Widget build(BuildContext context) {

    TextEditingController controller = TextEditingController();
    List<AnnotationController> annotationControllers = List.generate(imageUrls.length, (_) => AnnotationController());;

    @override
    void initState() {
      super.initState();
    }

    /// Loads a network image and returns its bytes.
    Future<Uint8List> loadNetworkImageBytes(String imageUrl) async {
      final response = await http.get(Uri.parse(imageUrl));
      if (response.statusCode == 200) {
        return response.bodyBytes;
      } else {
        throw Exception("Failed to load image");
      }
    }

    // Future<void> saveAnnotations(int pageIndex) async {
    //   final controller = annotationControllers[pageIndex];
    //   // Retrieve the list of annotations from the controller.
    //   List<AnnotationDetails> annotationList = await controller.getData();
    //   // Here, you would implement your database saving logic.
    //   // For demonstration, we print out each annotation’s coordinates and label.
    //   for (var annotation in annotationList) {
    //     print("Saving annotation for image $pageIndex: "
    //         "x=${annotation.x}, y=${annotation.y}, "
    //         "width=${annotation.width}, height=${annotation.height}, "
    //         "label=${annotation.label}");
    //     // Example: await DatabaseService.saveAnnotation(
    //     //           imageIndex: pageIndex,
    //     //           x: annotation.x,
    //     //           y: annotation.y,
    //     //           width: annotation.width,
    //     //           height: annotation.height,
    //     //           label: annotation.label,
    //     //         );
    //   }
    // }

    Size size = MediaQuery.of(context).size;

    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/background.jpg"),
            fit: BoxFit.fitHeight,
            alignment: Alignment(0, 0.2),
          ),
        ),
        child: SafeArea(
          child: Stack(
            children: [
              Column(
                children: [
                  Padding(
                    padding: EdgeInsets.all(16.0),
                    child: Text(
                      prompt,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: size.height * 0.02,
                        fontWeight: FontWeight.w300,
                      ),
                    ),
                  ),
        Expanded(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: PageView.builder(
              controller: _pageController,
              itemCount: imageUrls.length,
              physics: NeverScrollableScrollPhysics(),
              scrollDirection: Axis.vertical,
              onPageChanged: (index) {
                setState(() {
                  currentPage = index;
                });
              },
              itemBuilder: (context, index) {
                return FutureBuilder<Uint8List>(
                  future: loadNetworkImageBytes(imageUrls[index]),
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return Center(child: CircularProgressIndicator(
                        color: darkBlue,
                      ));
                    } else if (snapshot.hasError || !snapshot.hasData) {
                      return const Center(
                          child: Icon(Icons.error, color: Colors.red));
                    } else {
                      return Stack(
                        children: [
                          Center(
                            child: AnimatedContainer(
                              duration: const Duration(milliseconds: 300),
                              margin: EdgeInsets.symmetric(
                                vertical: currentPage == index ? 5 : 20,
                              ),
                              height: size.height * 0.75,
                              decoration: BoxDecoration(
                                border: Border.all(color: Colors.white, width: 3),
                                borderRadius: BorderRadius.circular(22),
                              ),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(20),
                                child: BoundingBoxAnnotation(
                                  controller: annotationControllers[index],
                                  imageBytes: snapshot.data!,
                                  imageWidth: size.width,
                                  imageHeight: size.height * 0.715,
                                ),
                              ),
                            ),
                          ),
                          Positioned(
                            bottom: 30,
                            left: 20,
                            right: 20,
                            child: Container(
                              decoration: BoxDecoration(
                                color: Colors.cyan.withOpacity(0.5),
                                borderRadius: BorderRadius.circular(22),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black26,
                                    blurRadius: 10,
                                    spreadRadius: 2,
                                  ),
                                ],
                              ),
                              width: size.width,
                              height: size.height * 0.05,
                              child: GestureDetector(
                                child: Center(child: Text("Save", style: TextStyle(fontSize: 20),)),
                                onTap: (){
                                  _pageController.nextPage(
                                    duration: Duration(
                                      milliseconds: 800,
                                    ),
                                    curve: Curves.easeInCubic,
                                  );
                                },
                              ),
                            ),
                          ),
                        ],
                      );
                    }
                  },
                );
              },
            ),
          ),
        ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
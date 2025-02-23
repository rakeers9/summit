import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';

class StartPage extends StatefulWidget {
  const StartPage({super.key});

  @override
  State<StartPage> createState() => _StartPageState();
}

class _StartPageState extends State<StartPage> {
  String prompt = "Please classify the following image";
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
                    padding: const EdgeInsets.all(16.0),
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
                        physics: PageScrollPhysics(),
                        scrollDirection: Axis.vertical,
                        itemBuilder: (context, index) {
                          return Stack(
                            children: [
                              Center(
                                child: AnimatedContainer(
                                  duration: Duration(milliseconds: 300),
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
                                    child: CachedNetworkImage(
                                      imageUrl: imageUrls[index],
                                      fit: BoxFit.cover,
                                      width: double.infinity,
                                      placeholder: (context, url) => Center(
                                        child: CircularProgressIndicator(),
                                      ),
                                      errorWidget: (context, url, error) => Icon(
                                        Icons.error,
                                        color: Colors.red,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              Positioned(
                                bottom: 30,
                                left: 20,
                                right: 20,
                                child: Padding(
                                  padding: EdgeInsets.symmetric(horizontal: 10),
                                  child: Container(
                                    padding: EdgeInsets.symmetric(horizontal: 15, vertical: 10),
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
                                    child: Autocomplete<String>(
                                      optionsBuilder: (TextEditingValue textEditingValue) {
                                        if (textEditingValue.text == '') {
                                          return const Iterable<String>.empty();
                                        }
                                        return suggestions.where((String option) {
                                          return option.contains(textEditingValue.text.toLowerCase());
                                        });
                                      },
                                      onSelected: (String selection) {
                                        _textControllers[index].text = selection;
                                      },
                                      fieldViewBuilder: (context, controller, focusNode, onFieldSubmitted) {
                                        _textControllers[index].text = controller.text;
                                        return TextField(
                                          controller: _textControllers[index],
                                          focusNode: focusNode,
                                          textAlign: TextAlign.center,
                                          cursorColor: Colors.white,
                                          decoration: InputDecoration(
                                            hintStyle: TextStyle(
                                              color: Colors.white,
                                              fontWeight: FontWeight.w300,
                                            ),
                                            hintText: "Classify the Image",
                                            border: InputBorder.none,
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                ),
                              ),
                            ],
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

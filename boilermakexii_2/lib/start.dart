import 'package:boilermakexii_2/const.dart';
import 'package:flutter/material.dart';

class StartPage extends StatefulWidget {
  const StartPage({super.key});

  @override
  State<StartPage> createState() => _StartPageState();
}

class _StartPageState extends State<StartPage> {
  String prompt = "Please classify the following image";

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: kBackgroundColor,
      resizeToAvoidBottomInset: false,
      body: SafeArea(
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
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(20), // Rounded corners
                    child: Image.network(
                      "https://picsum.photos/600/800",
                      fit: BoxFit.cover,
                      width: double.infinity,
                    ),
                  ),
                ),
              ],
            ),
            Positioned(
              bottom: 20,
              left: 20,
              right: 20,
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: kAccentBlue.withOpacity(0.5),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black26,
                      blurRadius: 10,
                      spreadRadius: 2,
                    ),
                  ],
                ),
                child: TextField(
                  textAlign: TextAlign.center,
                  cursorColor: Colors.white,
                  decoration: InputDecoration(
                    hintStyle: TextStyle(color: Colors.white, fontWeight: FontWeight.w300),
                    hintText: "Classify the Image",
                    border: InputBorder.none,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );

  }
}

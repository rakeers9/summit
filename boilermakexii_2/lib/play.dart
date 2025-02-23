import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:boilermakexii_2/const.dart';

class FrostedCardsFullScreenPage extends StatelessWidget {
  const FrostedCardsFullScreenPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // The whole screen is used.
      body: Stack(
        children: [
          // Background image covers the entire screen.
          Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/background.jpg'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          // SafeArea ensures content is not overlapped by system UI.
          SafeArea(
            child: Column(
              children: [
                // Top row of cards
                Expanded(
                  child: Row(
                    children: [
                      Expanded(child: FrostedCard(title: 'Dummy Title 1')),
                      Expanded(child: FrostedCard(title: 'Dummy Title 2')),
                    ],
                  ),
                ),
                // Bottom row of cards
                Expanded(
                  child: Row(
                    children: [
                      Expanded(child: FrostedCard(title: 'Dummy Title 3')),
                      Expanded(child: FrostedCard(title: 'Dummy Title 4')),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class FrostedCard extends StatelessWidget {
  final String title;
  const FrostedCard({Key? key, required this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      // Optional padding between cards
      padding: const EdgeInsets.all(8.0),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: Stack(
          children: [
            // Frosted glass effect using BackdropFilter.
            BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
              child: Container(
                decoration: BoxDecoration(
                  color: darkBlue.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: Colors.white.withOpacity(0.2),
                    width: 1.5,
                  ),
                ),
              ),
            ),
            // Centered large title text.
            Center(
              child: Text(
                title,
                style: const TextStyle(
                  fontSize: 24,
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

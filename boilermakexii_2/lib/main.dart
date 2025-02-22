import 'package:boilermakexii_2/const.dart';
import 'package:boilermakexii_2/profile.dart';
import 'package:boilermakexii_2/settings.dart';
import 'package:boilermakexii_2/start.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'home.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.black,
          primary: Colors.amber,
        ),
        scaffoldBackgroundColor: Colors.black,
        textTheme: GoogleFonts.mandaliTextTheme().copyWith(
          bodyLarge: GoogleFonts.mandali(color: Colors.white),
          bodyMedium: GoogleFonts.mandali(color: Colors.white),
          bodySmall: GoogleFonts.mandali(color: Colors.white),
        ),
      ),
      debugShowCheckedModeBanner: false,
      home: MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;
  static final List<Widget> _pages = <Widget>[
    HomePage(),
    StartPage(),
    UserProfile(
      userName: "Prickle Peanuts",
      profileImageUrl: "https://picsum.photos/200",
    ),
    SettingsPage(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Positioned.fill(
            child: Image.asset(
              "assets/background.jpg", // Make sure this path is correct
              fit: BoxFit.fill, // Adjust fit as needed
            ),
          ),
          _pages[_selectedIndex],
        ],
      ),
      bottomNavigationBar: Container(
        color: Colors.black,
        child: Theme(
          data: Theme.of(context).copyWith(
            canvasColor: kBackgroundColor,
            splashColor: Colors.transparent,
            highlightColor: Colors.transparent,
          ),
          child: BottomNavigationBar(
            items: const <BottomNavigationBarItem>[
              BottomNavigationBarItem(
                icon: Icon(Icons.home_outlined),
                label: "",
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.circle_outlined),
                label: "",
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.person_outlined),
                label: "",
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.settings_outlined),
                label: "",
              ),
            ],
            currentIndex: _selectedIndex,
            selectedItemColor: kLightBlue,
            selectedFontSize: 0,
            unselectedFontSize: 0,
            enableFeedback: true,
            showSelectedLabels: false,
            showUnselectedLabels: false,
            unselectedItemColor: kAccentBlue,
            backgroundColor: kBackgroundColor,
            iconSize: 30,
            onTap: _onItemTapped,
          ),
        ),
      ),
    );
  }
}

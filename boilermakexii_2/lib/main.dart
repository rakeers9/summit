import 'package:boilermakexii_2/profile.dart';
import 'package:boilermakexii_2/start.dart';
import 'package:flutter/material.dart';

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
        textTheme: const TextTheme(
          bodyLarge: TextStyle(color: Colors.white),
          bodyMedium: TextStyle(color: Colors.white),
          bodySmall: TextStyle(color: Colors.white),
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
      backgroundColor: Colors.black,
      body: _pages[_selectedIndex],
      bottomNavigationBar: Container(
        color: Colors.black,
        child: Theme(
          data: Theme.of(context).copyWith(canvasColor: Colors.black, splashColor: Colors.transparent, highlightColor: Colors.transparent,),
          child: BottomNavigationBar(
            items: const <BottomNavigationBarItem>[
              BottomNavigationBarItem(icon: Icon(Icons.home_outlined), label: ""),
              BottomNavigationBarItem(icon: Icon(Icons.circle_outlined), label: ""),
              BottomNavigationBarItem(icon: Icon(Icons.person_outlined), label: ""),
              BottomNavigationBarItem(icon: Icon(Icons.settings_outlined), label: ""),
            ],
            currentIndex: _selectedIndex,
            selectedItemColor: Colors.amberAccent,
            selectedFontSize: 0,
            unselectedFontSize: 0,
            enableFeedback: true,
            showSelectedLabels: false,
            showUnselectedLabels: false,
            unselectedItemColor: Colors.grey,
            backgroundColor: Colors.black,
            iconSize: 30,
            onTap: _onItemTapped,
          ),
        ),
      ),
    );
  }
}

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('Settings Page', style: TextStyle(color: Colors.white)),
      ),
    );
  }
}
